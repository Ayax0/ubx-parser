import { describe, expect, it } from "vitest";
import { UBX_INF_TEST } from "../src/message";
import { hookOnce } from "./utils";

describe("@nextlvlup/ubx-parser", () => {
  it("parse test packet", () => {
    const TEST_PKT = Buffer.from([
      0xb5, 0x62, 0x04, 0x03, 0x0c, 0x00, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20,
      0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21, 0x50, 0x52,
    ]);

    hookOnce(UBX_INF_TEST, TEST_PKT).then((result) =>
      expect(result.str).toBe("Hello World!"),
    );
  });
  it("fails when packet is incomplete", async () => {
    const TEST_PKT = Buffer.from([
      0x04, 0x03, 0x0c, 0x00, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f,
      0x72, 0x6c, 0x64, 0x21, 0x50, 0x52, 0xb5, 0x62,
    ]);

    await expect(hookOnce(UBX_INF_TEST, TEST_PKT)).rejects.toThrowError(
      "invalide packet droped",
    );
  });
  it("fails when checksum is invalide", async () => {
    const TEST_PKT = Buffer.from([
      0xb5, 0x62, 0x04, 0x03, 0x0c, 0x00, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20,
      0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21, 0x00, 0x00,
    ]);

    await expect(hookOnce(UBX_INF_TEST, TEST_PKT)).rejects.toThrowError(
      "checksum validation failed",
    );
  });
});
