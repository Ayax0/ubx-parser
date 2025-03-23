import { readBitFromUInt16, readBitFromUInt8 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x01, 0x07, (payload: Buffer) => {
  const valid = payload.readUInt8(11);
  const flags = payload.readUInt8(21);
  const flags2 = payload.readUInt8(22);
  const flags3 = payload.readUInt16LE(78);

  return {
    iTOW: payload.readUInt32LE(0),
    year: payload.readUInt16LE(4),
    month: payload.readUInt8(6),
    day: payload.readUInt8(7),
    hour: payload.readUInt8(8),
    min: payload.readUInt8(9),
    sec: payload.readUInt8(10),
    valid: {
      validDate: readBitFromUInt8(valid, 0) == 1,
      validTime: readBitFromUInt8(valid, 1) == 1,
      fullyResolved: readBitFromUInt8(valid, 2) == 1,
      validMag: readBitFromUInt8(valid, 3) == 1,
    },
    tAcc: payload.readUInt32LE(12),
    nano: payload.readInt32LE(16),
    fixType: payload.readUInt8(20),
    flags: {
      gnssFixOK: readBitFromUInt8(flags, 0) == 1,
      diffSoln: readBitFromUInt8(flags, 1) == 1,
      psmState: readBitFromUInt8(flags, 2, 3),
      headVehValid: readBitFromUInt8(flags, 5) == 1,
      carrSoln: readBitFromUInt8(flags, 6, 2),
    },
    flags2: {
      confirmedAvai: readBitFromUInt8(flags2, 5) == 1,
      confirmedDate: readBitFromUInt8(flags2, 6) == 1,
      confirmedTime: readBitFromUInt8(flags2, 7) == 1,
    },
    numSV: payload.readUInt8(23),
    lon: payload.readInt32LE(24) * 1e-7,
    lat: payload.readInt32LE(28) * 1e-7,
    height: payload.readInt32LE(32),
    hMSL: payload.readInt32LE(36),
    hAcc: payload.readUInt32LE(40),
    vAcc: payload.readUInt32LE(44),
    velN: payload.readInt32LE(48),
    velE: payload.readInt32LE(52),
    velD: payload.readInt32LE(56),
    gSpeed: payload.readInt32LE(60),
    headMot: payload.readInt32LE(64) * 1e-5,
    sAcc: payload.readUInt32LE(68),
    headAcc: payload.readUInt32LE(72) * 1e-5,
    pDOP: payload.readUInt16LE(76) * 0.01,
    flags3: {
      invalidLlh: readBitFromUInt16(flags3, 0) == 1,
      lastCorrectionAge: readBitFromUInt16(flags3, 1, 4),
    },
    headVeh: payload.readInt32LE(84) * 1e-5,
    magDec: payload.readInt16LE(88) * 1e-2,
    magAcc: payload.readUInt16LE(90) * 1e-2,
  };
});
