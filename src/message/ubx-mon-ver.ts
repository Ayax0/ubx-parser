import { definePacketParser } from "..";

export default definePacketParser(0x0a, 0x04, (payload: Buffer) => {
  return {
    swVersion: payload.toString("utf8", 0, 30),
    hwVersion: payload.toString("utf8", 30, 40),
    extension: Array.from({ length: (payload.length - 40) / 30 }).map(
      (_, index) => payload.toString("utf8", 40 + index * 30, 80 + index * 30),
    ),
  };
});
