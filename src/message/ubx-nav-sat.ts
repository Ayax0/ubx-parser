import { definePacketParser } from "..";
import { readBitFromUInt32 } from "../utils";

export default definePacketParser(0x01, 0x35, (payload: Buffer) => {
  return {
    iTOW: payload.readUInt32LE(0),
    version: payload.readUInt8(4),
    numSvs: payload.readUInt8(5),
    svs: Array.from({ length: payload.readUInt8(5) }, (_, index) => {
      const offset = 8 + index * 12;
      const flags = payload.readUInt32LE(offset + 8);

      return {
        gnssId: payload.readUInt8(offset),
        svId: payload.readUInt8(offset + 1),
        cno: payload.readUInt8(offset + 2),
        elev: payload.readInt8(offset + 3),
        azim: payload.readInt16LE(offset + 4),
        prRes: payload.readInt16LE(offset + 6),
        flags: {
          qualityInd: readBitFromUInt32(flags, 0, 3),
          svUsed: readBitFromUInt32(flags, 3) === 1,
          health: readBitFromUInt32(flags, 4, 2),
          diffCorr: readBitFromUInt32(flags, 6) === 1,
          smoothed: readBitFromUInt32(flags, 7) === 1,
          orbitSource: readBitFromUInt32(flags, 8, 3),
          ephAvail: readBitFromUInt32(flags, 11) === 1,
          almAvail: readBitFromUInt32(flags, 12) === 1,
          anoAvail: readBitFromUInt32(flags, 13) === 1,
          aopAvail: readBitFromUInt32(flags, 14) === 1,
          sbasCorrUsed: readBitFromUInt32(flags, 16) === 1,
          rtcmCorrUsed: readBitFromUInt32(flags, 17) === 1,
          slasCorrUsed: readBitFromUInt32(flags, 18) === 1,
          spartnCorrUsed: readBitFromUInt32(flags, 19) === 1,
          prCorrUsed: readBitFromUInt32(flags, 20) === 1,
          crCorrUsed: readBitFromUInt32(flags, 21) === 1,
          doCorrUsed: readBitFromUInt32(flags, 22) === 1,
          clasCorrUsed: readBitFromUInt32(flags, 23) === 1,
        },
      };
    }),
  };
});
