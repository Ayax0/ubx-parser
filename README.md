# @nextlvlup/ubx-parser

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/@nextlvlup/ubx-parser?color=yellow)](https://npmjs.com/package/@nextlvlup/ubx-parser)
[![npm downloads](https://img.shields.io/npm/dm/@nextlvlup/ubx-parser?color=yellow)](https://npm.chart.dev/@nextlvlup/ubx-parser)

<!-- /automd -->

This is my package description.

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
import { UBX_NAV_PVT } from "@nextlvlup/ubx-parser/parser";

const parser = createParser();

// callback with error and respective buffer
parser.hooks.hook("error", (err, buf) => console.log);
// callback with packets as raw buffer
parser.hooks.hook("data", (data) => console.log);

// attach UBX-NAV-PVT Parser and listen for packets
// callback with fully typed UBX-NAV-PVT packets
parser.attach(UBX_NAV_PVT).hook((data) => console.log);

parser.parse(/** Input Buffer */);
```

##

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
