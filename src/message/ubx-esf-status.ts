import { readBitFromUInt8 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x10, 0x10, (payload: Buffer) => {
  return {
    iTOW: payload.readUInt32LE(0),
    version: payload.readUInt8(4),
    wtInitStatus: readBitFromUInt8(payload.readUInt8(5), 0, 2),
    mntAlgStatus: readBitFromUInt8(payload.readUInt8(5), 2, 3),
    insInitStatus: readBitFromUInt8(payload.readUInt8(5), 5, 2),
    imuInitStatus: readBitFromUInt8(payload.readUInt8(6), 0, 2),
    fusionMode: payload.readUInt8(12),
    numSens: payload.readUInt8(15),
    sensors: Array.from({ length: payload.readUInt8(15) }).map((_, index) => {
      const offset = 16 + index * 4;

      return {
        type: readBitFromUInt8(payload.readUInt8(offset), 0, 6),
        used: readBitFromUInt8(payload.readUInt8(offset), 6) == 1,
        ready: readBitFromUInt8(payload.readUInt8(offset), 7) == 1,
        calibStatus: readBitFromUInt8(payload.readUInt8(offset + 1), 0, 2),
        timeStatus: readBitFromUInt8(payload.readUInt8(offset + 1), 2, 2),
        freq: payload.readUInt8(offset + 2),
        badMeas: readBitFromUInt8(payload.readUInt8(offset + 3), 0),
        badTTag: readBitFromUInt8(payload.readUInt8(offset + 3), 1),
        missingMeas: readBitFromUInt8(payload.readUInt8(offset + 3), 2),
        noisyMeas: readBitFromUInt8(payload.readUInt8(offset + 3), 3),
      };
    }),
  };
});
