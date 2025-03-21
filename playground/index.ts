import { createReadStream } from "node:fs";

import { createUBXParser } from "../src";
import { UBX_ESF_MEAS } from "../src/parser";

const parser = createUBXParser();

parser.hooks.hook("error", (error, buffer) => {
  console.error(error, buffer);
});

parser.attach(UBX_ESF_MEAS).hook((data) => console.log(data.measurements));

const stream = createReadStream("./playground/sample2.ubx");
stream.on("data", (data) => {
  if (typeof data === "string") parser.parse(Buffer.from(data));
  else parser.parse(data);
});

console.log("run...");
