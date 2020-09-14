# Polly Text Splitter

[![Build Status](https://travis-ci.org/oleglegun/polly-text-split.svg?branch=master)](https://travis-ci.org/oleglegun/polly-text-split)
[![Coverage Status](https://coveralls.io/repos/github/oleglegun/polly-text-split/badge.svg?branch=master)](https://coveralls.io/github/oleglegun/polly-text-split?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Synopsis

Adaptively split plain text by batches with size of <=1500 characters each to overcome [AWS Polly TTS](https://aws.amazon.com/ru/polly/) input limitations. By default, this utility splits text by the nearest dot (.) or if no dot found - it searches for other characters, that we can set by our own or use the defaults.

## Motivation

When you use method `synthesizeSpeech()` of [AWS Polly TTS](https://aws.amazon.com/ru/polly/) SDK you cannot pass more than 1500 character at a time. If you have a long text, it can become tedious to manually split it at the right positions. This little library solves this problem by splitting your text by batches suitable for Polly input.

Also, given that the AWS Polly is a context aware text-to-speech system, it adjusts speech pronunciation and accents based on punctuation too. So this library tries to keep speech natural by splitting only at the right places:

1.  at the nearest dot `.`
2.  if (1) not found - split by `,` or `;` (by default, can be configured)
3.  if (2) not found - split by space ``
4.  if (3) not found - hard split at the `HARD_LIMIT` index

## Installation

`npm install polly-text-split`

## Code Example

### Basic usage

```js
const pollyTextSplit = require('polly-text-split')

// 1. Method split() returns array of strings.
const batches = pollyTextSplit.split('your long text here')

// 2. Method splitIndex() returns index of the possible split position.
const splitIndex = pollyTextSplit.splitIndex('your long text here')
// So you can split manually using native string method
const batch = 'your long text here'.slice(0, splitIndex + 1)
```

### Configuration

By default, configuration is not necessary, but if you need to set your own limits or split characters, you can use method `configure()` for that.

```js
const pollyTextSplit = require('polly-text-split')

// Configuration example with default values
const options = {
    // MIN length of a single batch of split text
    softLimit: 1000,
    // MAX length of a single batch of split text
    hardLimit: 1500,
    // Set of extra split characters (Optional property)
    extraSplitChars: ',;',
}

// Apply configuration
pollyTextSplit.configure(options)

// Use with new configuration
const batches = pollyTextSplit.split('your long text here')
```

[API documentation](./API.md)

## Tests

`npm test`

## Contributors

Any contributions are very welcome.

## License

MIT.

## Changelog

### [0.1.4] - 2018-04-23
- Hide private properties from user API.

### [0.1.3] - 2018-04-13
- Update JSDoc annotations.

### [0.1.2] - 2018-04-13
- Code refactor and optimizations.

### [0.1.1] - 2018-04-10
- Add Readme.

### [0.1.0] - 2018-04-10
- Initial release.
