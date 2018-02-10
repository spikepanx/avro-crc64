/* global expect */

const { fingerprint64AvroSchema } = require('../src');
const errors = require('../src/errors');

describe('Rabin 64 Bit CRC Fingerprint', () => {
  it('should compute the correct fingerprint', () => {
    const { schemaString, fingerprint } = require('./fixtures/avroOK');

    const promise = expect(fingerprint64AvroSchema(schemaString))
      .to.eventually.be.fulfilled
      .then(fp => expect(Buffer.from(fp).toString('hex')).be.equal(fingerprint))
    ;
    return promise;
  });

  it('should reject invalid JSON with AvroSchemaStringSyntaxError Error', () => {
    const invalidJson = 'foobar';

    const promise = expect(fingerprint64AvroSchema(invalidJson))
      .to.eventually.be.rejectedWith(errors.AvroSchemaStringSyntaxError)
    ;
    return promise;
  });

  it('should reject invalid AVRO schema with InvalidAvroSchemaError Error', () => {
    const invalidSchema = JSON.stringify({
      type: 'record',
      fields: [{ name: 'foo' }],
      foo: 'bar',
    });

    const promise = expect(fingerprint64AvroSchema(invalidSchema))
      .to.eventually.be.rejectedWith(errors.InvalidAvroSchemaError)
    ;
    return promise;
  });
});
