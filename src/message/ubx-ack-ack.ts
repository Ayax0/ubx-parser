import { definePacketParser } from "..";

export default definePacketParser(0x05, 0x01, (payload: Buffer) => {
  return {
    clsID: payload.readUInt8(0),
    msgID: payload.readUInt8(1),
  };
});
