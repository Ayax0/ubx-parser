export interface PacketParser<T> {
  ubx_class: number;
  ubx_id: number;
  parse(packet: Buffer): T;
}

export function definePacketParser<T>(
  ubx_class: number,
  ubx_id: number,
  cb: (payload: Buffer) => T,
): PacketParser<T> {
  return {
    ubx_class,
    ubx_id,
    parse(payload: Buffer) {
      return cb(payload);
    },
  };
}
