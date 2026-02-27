<h1 align="center">
  <sup>@se-oss/slugify</sup>
  <br>
  <a href="https://github.com/shahradelahi/ts-slugify/actions/workflows/ci.yml"><img src="https://github.com/shahradelahi/ts-slugify/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@se-oss/slugify"><img src="https://img.shields.io/npm/v/@se-oss/slugify.svg" alt="NPM Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License"></a>
  <a href="https://bundlephobia.com/package/@se-oss/slugify"><img src="https://img.shields.io/bundlephobia/minzip/@se-oss/slugify" alt="npm bundle size"></a>
  <a href="https://packagephobia.com/result?p=@se-oss/slugify"><img src="https://packagephobia.com/badge?p=@se-oss/slugify" alt="Install Size"></a>
</h1>

_@se-oss/slugify_ is a high-performance, strictly typed slugification library with support for Unicode transliteration, smart casing, and custom character preservation.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/slugify
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/slugify
```

**yarn**

```bash
yarn add @se-oss/slugify
```

</details>

## 📖 Usage

### Basic

```typescript
import slugify from '@se-oss/slugify';

slugify('I ♥ Cats');
//=> 'i-love-cats'

slugify('  Déjà Vu!  ');
//=> 'deja-vu'

slugify('я люблю единорогов');
//=> 'ya-lyublyu-edinorogov'
```

### Advanced Features

- **Smart Decamelization**: Automatically handles camelCase and PascalCase.
- **Character Preservation**: Keep specific symbols like `#` or `@` as-is.
- **Collision Handling**: Generate unique slugs using a counter.
- **Transliteration**: Powered by `@se-oss/transliterate` for robust script support.

```typescript
import { slugifyWithCounter } from '@se-oss/slugify';

slugify('fooBar 123 $#%', { decamelize: true });
//=> 'foo-bar-123'

const slug = slugifyWithCounter();
slug('foo bar'); //=> 'foo-bar'
slug('foo bar'); //=> 'foo-bar-2'
```

## 📚 Documentation

For more information, please see the [API docs](https://www.jsdocs.io/package/@se-oss/slugify).

## 🚀 Performance

| Library               | hz             | min    | max    | mean   | p99    | rme    |
| :-------------------- | :------------- | :----- | :----- | :----- | :----- | :----- |
| **@se-oss/slugify**   | **336,028.90** | 0.0027 | 2.4412 | 0.0030 | 0.0048 | ±0.98% |
| simov/slugify         | 323,177.82     | 0.0028 | 0.2437 | 0.0031 | 0.0038 | ±0.21% |
| @sindresorhus/slugify | 1,936.71       | 0.4814 | 3.0069 | 0.5163 | 0.8098 | ±1.22% |

> **Result:** @se-oss/slugify is **173x faster** than @sindresorhus/slugify.

_Benchmark script: [`bench/index.bench.ts`](bench/index.bench.ts)_

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-slugify).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-slugify/graphs/contributors).
