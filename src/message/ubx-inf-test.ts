import { definePacketParser } from "..";

export default definePacketParser(0x04, 0x03, (payload: Buffer) => {
  return {
    str: payload.toString("utf8", 0, payload.length),
  };
});
