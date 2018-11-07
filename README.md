# Metalsmith Paths [![version][npm-version]][npm-url] [![License][license-image]][license-url]

A Metalsmith plugin that adds file path values (`base`, `dir`, `ext`, `name`, `href`) to metadata `path` property.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --only=production --save metalsmith-paths
```

## API

```js
const metalsmith = new Metalsmith(__dirname)
  .use(paths({
    property: "paths"
  }))
```

given the following directory structure:

```
src/
└── blog
    └── post.html
```

The following metadata will be generated:

| metadata      | value             |
| ------------- | ----------------- |
| `path.base`   | `post.html`       |
| `path.dir`    | `blog`            |
| `path.ext`    | `.html`           |
| `path.name`   | `post`            |
| `path.href`   | `/blog/post.html` |
| `path.dhref`  | `/blog/`          |

## CLI

You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-paths": {
      "property": "paths"
    }
  }
}
```

## Options

| name             | description                        | default   |
| ---------------- | ---------------------------------- | --------- |
| `property`       | property to store the path data to | `path`    |
| `directoryIndex` | remove the filename if it matches  | disabled  |
| `parseWindows`   | exchange `\` for `/` on Windows systems  | true  |

### directoryIndex

Removes the filename from the `href` attribute if it matches the value of
`directoryIndex`. Default: disabled. For example, the following configuration:

```json
{
  "plugins": {
    "metalsmith-paths": {
      "property": "path",
      "directoryIndex": "index.html"
    }
  }
}
```

Would produce the following filenames:

| Filename                      | `path.href`                   |
| ----------------------------- | ----------------------------- |
| `/index.html`                 | `/`                           |
| `/portfolio/index.html`       | `/portfolio/`                 |
| `/portfolio/project1.html`    | `/portfolio/project1.html`    |
| `/portfolio/project2.html`    | `/portfolio/project2.html`    |

---
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/metalsmith-paths.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/metalsmith-paths
[travis-image]: https://img.shields.io/travis/ahmadnassri/metalsmith-paths.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/metalsmith-paths
[npm-version]: https://img.shields.io/npm/v/metalsmith-paths.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/metalsmith-paths.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/metalsmith-paths
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/metalsmith-paths.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/metalsmith-paths.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/metalsmith-paths
[david-image]: https://img.shields.io/david/ahmadnassri/metalsmith-paths.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/metalsmith-paths
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/metalsmith-paths/badge?style=flat-square
