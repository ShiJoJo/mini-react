# 扩展

vite 默认使用 esbuild 解析 jsx，所以会自动调用 React.createElement

## 通过头部注释 来修改

```js
/**@jsx ReactText.createElement2 */
import ReactText from "./core/React.js";
const AppOne = () => {
  return <div>234</div>;
};
// () => {
//  return /* @__PURE__ */ ReactText.createElement2("div", null, "234 ");
// }
```

## 通过修改 vite.config.js 的 jsxFactory 配置

```js
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "createElement2",
  },
});
```
