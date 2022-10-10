import "./item.less";

export default {
	name: "MenuItem",
	props: {
		icon: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		}
	},
	setup(props: any) {
		return () => {
			const vnodes = [];

			if (props.icon) {
				if (props.icon.includes("el-icon")) {
					vnodes.push(<i class={[props.icon, "sub-el-icon"]} />);
				} else {
					vnodes.push(<svg-icon icon-class={props.icon} />);
				}
			}

			if (props.title) {
				vnodes.push(<span>{props.title}</span>);
			}
			return vnodes;
		};
	}
};
