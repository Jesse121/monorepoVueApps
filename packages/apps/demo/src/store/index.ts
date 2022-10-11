import useAppStore from "./modules/app";
import useUserStore from "./modules/user";

// const modules = import.meta.glob("./modules/*.ts", {
//   import: "default",
//   eager: true,
// });
// console.log(modules);
const appStore: any = {};

export const registerStore = () => {
  // for (const [key, value] of Object.entries(modules)) {
  //   const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
  //   console.log(name);
  //   appStore[name] = value;
  // }
  appStore.useAppStore = useAppStore();
  appStore.useUserStore = useUserStore();
};

export default appStore;
