import { readBitFromUInt16, readBitFromUInt32 } from "../utils";
import { definePacketParser } from "..";

export default definePacketParser(0x10, 0x10, (payload: Buffer) => {
  return {
    timeTag: payload.readUInt32LE(0),
    timeMarkSent: readBitFromUInt16(payload.readUInt16LE(4), 0, 2),
    timeMarkEdge: readBitFromUInt16(payload.readUInt16LE(4), 2),
    calibTtagValid: readBitFromUInt16(payload.readUInt16LE(4), 3) == 1,
    numMeas: readBitFromUInt16(payload.readUInt16LE(4), 11, 5),
    measurements: Array.from({ length: payload.readUInt16LE(4) }).map(
      (_, index) => {
        const offset = 8 + index * 4;

        return {
          dataField: readBitFromUInt32(payload.readUInt32LE(offset), 0, 24),
          dataType: readBitFromUInt32(payload.readUInt32LE(offset), 24, 6),
          calibTtag: payload.readUInt32LE(offset + 1),
        };
      },
    ),
  };
});
