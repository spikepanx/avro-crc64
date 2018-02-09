
exports.schemaString = JSON.stringify({
  type: 'record',
  namespace: 'lol.spikepanx.germany',
  name: 'dogs',
  aliases: [
    'lol.spikepanx.spain.dogs',
  ],
  doc: 'foobar foobar',
  fields: [
    {
      name: 'breed',
      type: 'string',
      doc: 'breed of the dog',
    },
    {
      name: 'name',
      type: 'string',
      doc: 'name of the dog',
    },
  ],
});

exports.fingerprint = '27f8390ad38a07d3';

