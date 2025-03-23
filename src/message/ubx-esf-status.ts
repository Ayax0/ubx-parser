import { readBitFromUInt8 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x10, 0x10, (payload: Buffer) => {
  const initStatus1 = payload.readUInt8(5);
  const initStatus2 = payload.readUInt8(6);

  return {
    iTOW: payload.readUInt32LE(0),
    version: payload.readUInt8(4),
    initStatus1: {
      wtInitStatus: readBitFromUInt8(initStatus1, 0, 2),
      mntAlgStatus: readBitFromUInt8(initStatus1, 2, 3),
      insInitStatus: readBitFromUInt8(initStatus1, 5, 2),
    },
    initStatus2: {
      imuInitStatus: readBitFromUInt8(initStatus2, 0, 2),
    },
    fusionMode: payload.readUInt8(12),
    numSens: payload.readUInt8(15),
    sensors: Array.from({ length: payload.readUInt8(15) }).map((_, index) => {
      const offset = 16 + index * 4;
      const sensStatus1 = payload.readUInt8(offset);
      const sensStatus2 = payload.readUInt8(offset + 1);
      const faults = payload.readUInt16LE(offset + 3);

      return {
        sensStatus1: {
          type: readBitFromUInt8(sensStatus1, 0, 6),
          used: readBitFromUInt8(sensStatus1, 6) == 1,
          ready: readBitFromUInt8(sensStatus1, 7) == 1,
        },
        sensStatus2: {
          calibStatus: readBitFromUInt8(sensStatus2, 0, 2),
          timeStatus: readBitFromUInt8(sensStatus2, 2, 2),
        },
        freq: payload.readUInt8(offset + 2),
        faults: {
          badMeas: readBitFromUInt8(faults, 0),
          badTTag: readBitFromUInt8(faults, 1),
          missingMeas: readBitFromUInt8(faults, 2),
          noisyMeas: readBitFromUInt8(faults, 3),
        },
      };
    }),
  };
});
