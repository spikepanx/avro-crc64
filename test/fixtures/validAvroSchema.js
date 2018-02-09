
exports.schemaString = JSON.stringify({
  type: 'record',
  namespace: 'com.telefonica.germany.streams.dlp.dsgvo.v1',
  name: 'DataPortabilityResponse',
  aliases: [
    'com.telefonica.germany.streams.dlp.dsgvo.v1.dev.DataPortabilityResponse',
    'com.telefonica.germany.streams.dlp.dsgvo.v1.e2e1.DataPortabilityResponse',
    'com.telefonica.germany.streams.dlp.dsgvo.v1.e2e2.DataPortabilityResponse',
  ],
  doc: 'Data Portability Response Schema',
  fields: [
    {
      name: 'DataAccessURI',
      type: 'string',
      doc: 'test test',
    },
    {
      name: 'DataExpirationDate',
      type: 'string',
      doc: 'foo bar',
    },
  ],
});

exports.fingerprint = '0a1c5677fa2d1c1c';

