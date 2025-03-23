import { readBitFromUInt8 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x01, 0x20, (payload: Buffer) => {
  return {
    iTOW: payload.readUInt32LE(0),
    fTOW: payload.readInt32LE(4),
    week: payload.readInt16LE(8),
    leapS: payload.readInt8(10),
    valid: {
      towValid: readBitFromUInt8(payload.readUInt8(11), 0) == 1,
      weekValid: readBitFromUInt8(payload.readUInt8(11), 1) == 1,
      leapSValid: readBitFromUInt8(payload.readUInt8(11), 2) == 1,
    },
    tAcc: payload.readUInt32LE(12),
  };
});
