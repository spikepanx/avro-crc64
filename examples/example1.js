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
