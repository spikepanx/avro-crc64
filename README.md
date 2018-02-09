# avro-crc64
[![Build Status](https://travis-ci.org/spikepanx/avro-crc64.svg?branch=master)](https://travis-ci.org/spikepanx/avro-crc64)
[![Coverage Status](https://coveralls.io/repos/github/spikepanx/avro-crc64/badge.svg?branch=master)](https://coveralls.io/github/spikepanx/avro-crc64?branch=master)

## Features
- Computes the 64-bit AVRO fingerprint for a given AVRO schema string

## Installation
```bash
npm install avro-64
```

## Documentation
- API (tbd)

## Examples

One can find this example in the /examples folder.

```js
/* example 1 */
const { fingerprint64AvroSchema } = require('../src');

const avroSchemaExample = {
  type: 'record',
  name: 'Example',
  doc: 'Simple example avro schema',
  fields: [
    {
      name: 'foobar',
      type: 'string',
      doc: 'foobar is all about barbazz',
    },
  ],
};

fingerprint64AvroSchema(JSON.stringify(avroSchemaExample))
  .then((uint8) => {
    const hexFingerprint = Buffer.from(uint8).toString('hex');

    return console.log(hexFingerprint); // logs "b75d6f7da238cf70"
  })
;
```
