import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    "./src/index",
    "./src/utils/index",
    {
      builder: "mkdist",
      input: "./src/parser",
      outDir: "./dist/parser",
    },
  ],
});
