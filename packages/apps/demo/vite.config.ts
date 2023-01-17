import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend-plus";

const resolve = (dir: string) => path.join(__dirname, dir);
let idPrefix = "";
const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

const hasViewBox = /(viewBox="[^>+].*?")/g;

const clearReturn = /(\r)|(\n)/g;

function findSvgFile(dir: string): Array<string> {
	const svgRes: string[] = [];
	const directs = readdirSync(dir, {
		withFileTypes: true
	});
	for (const dirent of directs) {
		if (dirent.isDirectory()) {
			svgRes.push(...findSvgFile(dir + dirent.name + "/"));
		} else {
			const svg = readFileSync(dir + dirent.name)
				.toString()
				.replace(clearReturn, "")
				.replace(svgTitle, ($1, $2) => {
					let width = 0;
					let height = 0;
					let content = $2.replace(clearHeightWidth, (s1: any, s2: string, s3: number) => {
						if (s2 === "width") {
							width = s3;
						} else if (s2 === "height") {
							height = s3;
						}
						return "";
					});
					if (!hasViewBox.test($2)) {
						content += `viewBox="0 0 ${width} ${height}"`;
					}
					return `<symbol id="${idPrefix}-${dirent.name.replace(".svg", "")}" ${content}>`;
				})
				.replace("</svg>", "</symbol>");
			svgRes.push(svg);
		}
	}
	return svgRes;
}
function svgBuilder(path: string, prefix = "icon") {
	if (path === "") return;
	idPrefix = prefix;
	const res = findSvgFile(path);
	return {
		name: "svg-transform",
		transformIndexHtml(html: string) {
			return html.replace(
				"<body>",
				`
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join("")}
            </svg>
        `
			);
		}
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__VUE_OPTIONS_API__: false // 关闭 Vue2 中的 options选项API 减小包体积
	},
	plugins: [
		vue(),
		vueJsx(),
		vueSetupExtend["default"](),
		[svgBuilder("./src/assets/icons/")],
		AutoImport({
			imports: ["vue"],
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	resolve: {
		alias: {
			"@": resolve("src")
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import "${resolve("./src/styles/base.less")}";`,
				modifyVars: {
					hack: `true; @import (reference) "${resolve("./src/styles/variables.less")}"`
				},
				javascriptEnabled: true
			}
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
					if (id.includes(resolve("./src/store/index.ts"))) {
						return "vendor";
					}
				}
			}
		}
	}
});
