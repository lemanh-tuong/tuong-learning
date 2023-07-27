import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

module.exports = {
  input: "src/index.ts",
  plugins: [
    typescript({
      noEmitOnError: false,
      tsconfig: 'tsconfig.json'
    }),
    dts({})
  ],
  output: [{ file: "dist/my-library.d.ts" }]
};
