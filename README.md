# @nextlvlup/ubx-parser

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/@nextlvlup/ubx-parser?color=yellow)](https://npmjs.com/package/@nextlvlup/ubx-parser)
[![npm downloads](https://img.shields.io/npm/dm/@nextlvlup/ubx-parser?color=yellow)](https://npm.chart.dev/@nextlvlup/ubx-parser)

<!-- /automd -->

A parser for the GNSS protocol ubx. Developed and tested with a ublox M9L GPS module.

This library was created based on the documentation provided by ublox.
[Interface Description](https://content.u-blox.com/sites/default/files/documents/M9-ADR-5.15_InterfaceDescription_UBX-22037101.pdf)
[Integration Manual](https://content.u-blox.com/sites/default/files/NEO-M9L_Integrationmanual_UBX-20048485.pdf)

## Usage

Install the package:

```sh
# ✨ Auto-detect (supports npm, yarn, pnpm, deno and bun)
npx nypm install @nextlvlup/ubx-parser
# npm
npm install @nextlvlup/ubx-parser
# pnpm
pnpm install @nextlvlup/ubx-parser
```

## Basic Usage

```ts
import { createParser } from "@nextlvlup/ubx-parser";
import { UBX_NAV_PVT } from "@nextlvlup/ubx-parser/message";

const parser = createParser();

// callback with error and respective buffer
parser.hooks.hook("error", (err, buf) => console.log(err, buf));
// callback with packets as raw buffer
parser.hooks.hook("data", (data) => console.log(data));

// attach UBX-NAV-PVT Parser and listen for packets
// callback with fully typed UBX-NAV-PVT packets
parser.attach(UBX_NAV_PVT).hook((data) => console.log(data));

parser.parse(/** Input Buffer */);
```

## TCP/IP Example

If you want to provide the GNSS data from a local Linux device via TCP you can do this with the following command:
`socat -d -d tcp-l:1234 file://dev/ttyS0,b460800,raw`

This command starts a TCP server and serves as a gateway between the local serial port ttyS0 and the TCP client.

```ts
import { Socket } from "node:net";

import { createParser } from "@nextlvlup/ubx-parser";
import { UBX_NAV_PVT } from "@nextlvlup/ubx-parser/message";

const client = new Socket();
const parser = createParser();

// listen for UBX_NAV_PVT packets
parser.attach(UBX_NAV_PVT).hook((data) => console.log(data));

client.connect({ host: "localhost", port: 1234 });
client.on("data", (buffer) => parser.parse(buffer));
```

## SerialPort Example

```ts
import { SerialPort } from "serialport";

import { createParser } from "@nextlvlup/ubx-parser";
import { UBX_NAV_PVT } from "@nextlvlup/ubx-parser/message";

const serialport = new SerialPort({ path: "/dev/ttyS0", baudRate: 460_800 });
const parser = createParser();

// listen for UBX_NAV_PVT packets
parser.attach(UBX_NAV_PVT).hook((data) => console.log(data));

port.on("data", (buffer) => parser.parse(buffer));
```

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/Ayax0/ubx-parser/blob/main/LICENSE) license.
Made by [community](https://github.com/Ayax0/ubx-parser/graphs/contributors) 💛
<br><br>
<a href="https://github.com/Ayax0/ubx-parser/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Ayax0/ubx-parser" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
