import { createHooks } from "hookable";
import type { PacketParser } from "./packet-parser";

interface Hooks {
  error: (error: Error, buff?: Buffer) => Promise<void> | void;
  data: (data: Buffer) => Promise<void> | void;
}

const PACKET_MIN_LENGTH = 8;

export function createUBXParser() {
  const hooks = createHooks<Hooks>();
  const parsers: [PacketParser<any>, (data: any) => Promise<void> | void][] =
    [];

  let buffer = Buffer.from([]);

  function validate(packet: Buffer) {
    let a = 0;
    let b = 0;

    for (let i = 2; i < packet.length - 2; i++) {
      a = (a + packet.readUInt8(i)) & 0xff;
      b = (b + a) & 0xff;
    }

    const ck_a = packet.readUInt8(packet.length - 2);
    const ck_b = packet.readUInt8(packet.length - 1);

    return a === ck_a && b === ck_b;
  }

  function parse(buf: Buffer) {
    buffer = Buffer.concat([buffer, buf]);

    while (buffer.length > 0) {
      const start = buffer.indexOf(Buffer.from([0xb5, 0x62]));

      if (start === -1) break;
      else if (start > 0) {
        hooks.callHook(
          "error",
          new Error("invalide packet droped"),
          buffer.subarray(0, start),
        );

        buffer = buffer.subarray(start);
        continue;
      }

      if (buffer.length < PACKET_MIN_LENGTH) break;

      const size = buffer.readUInt16LE(4);
      if (buffer.length < PACKET_MIN_LENGTH + size) break;

      const packet = buffer.subarray(0, PACKET_MIN_LENGTH + size);

      const ubx_class = packet.readUInt8(2);
      const ubx_id = packet.readUInt8(3);
      const payload = packet.subarray(6, 6 + size);

      buffer = buffer.subarray(packet.length);

      if (!validate(packet)) {
        hooks.callHook(
          "error",
          new Error("checksum validation failed"),
          packet,
        );

        continue;
      }

      for (const [parser, cb] of parsers.filter(
        ([parser]) =>
          parser.ubx_class === ubx_class && parser.ubx_id === ubx_id,
      )) {
        cb(parser.parse(payload));
      }

      hooks.callHook("data", packet);
    }
  }

  function attach<T>(parser: PacketParser<T>) {
    return {
      hook(cb: (data: T) => Promise<void> | void) {
        parsers.push([parser, cb]);
      },
    };
  }

  return {
    hooks,
    attach,
    parse,
  };
}
