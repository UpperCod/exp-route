import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import pkg from "./package.json";

export default {
    input: ["./src/exp-route.js"],
    output: [
        {
            dir: "cjs",
            format: "cjs",
            sourcemap: true,
        },
        {
            dir: "./",
            format: "esm",
            sourcemap: true,
        },
    ],
    external: [...builtins, ...Object.keys(pkg.dependencies)],
    plugins: [resolve()],
};
