import { readBitFromUInt16, readBitFromUInt32 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x10, 0x10, (payload: Buffer) => {
  const flags = payload.readUInt16LE(4);
  const _flags = {
    timeMarkValid: readBitFromUInt16(flags, 0, 2) == 1,
    timeMarkTime: readBitFromUInt16(flags, 2) == 1,
    calibTtagValid: readBitFromUInt16(flags, 3) == 1,
    numMeas: readBitFromUInt16(flags, 11, 5),
  };

  return {
    timeTag: payload.readUInt32LE(0),
    flags: _flags,
    id: payload.readUInt16LE(6),
    measurements: Array.from({ length: _flags.numMeas }).map((_, index) => {
      const offset = 8 + index * 4;
      const data = payload.readUInt32LE(offset);

      return {
        dataField: readBitFromUInt32(data, 0, 24),
        dataType: readBitFromUInt32(data, 24, 6),
      };
    }),
    ...(_flags.calibTtagValid
      ? { calibTtag: payload.readUInt32LE(8 + _flags.numMeas * 4) }
      : {}),
  };
});
