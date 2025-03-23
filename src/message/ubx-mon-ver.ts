import { definePacketParser } from "..";

export default definePacketParser(0x0a, 0x04, (payload: Buffer) => {
  const swVersion = payload.subarray(0, 30);
  const hwVersion = payload.subarray(30, 40);

  return {
    swVersion: swVersion.subarray(0, swVersion.indexOf(0x00)).toString("utf8"),
    hwVersion: hwVersion.subarray(0, hwVersion.indexOf(0x00)).toString("utf8"),
    extension: Array.from({ length: (payload.length - 40) / 30 }).map(
      (_, index) => {
        const extension = payload.subarray(40 + index * 30, 70 + index * 30);
        return extension.subarray(0, extension.indexOf(0x00)).toString("utf8");
      },
    ),
  };
});
