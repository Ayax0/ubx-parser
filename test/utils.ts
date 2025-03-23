import { createParser, type PacketParser } from "../src";

export function hookOnce<T>(packet_parser: PacketParser<T>, packet: Buffer) {
  return new Promise<T>((resolve, reject) => {
    const parser = createParser();
    parser.hooks.hook("error", (error) => reject(error));
    parser.attach(packet_parser).hook((data) => resolve(data));

    parser.parse(packet);
  });
}
