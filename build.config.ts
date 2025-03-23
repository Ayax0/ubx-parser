import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    "./src/index",
    "./src/utils/index",
    {
      builder: "mkdist",
      input: "./src/message",
      outDir: "./dist/message",
    },
  ],
});
