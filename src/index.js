
const avro = require('avsc');
const Bluebird = require('bluebird');
const errors = require('./errors');
const Long = require('long');

const EMPTY = 'c15d213aa4d7a795';


let fpTable;
/**
 * @description
 * @returns
 */

const parseAsync = Bluebird.method(JSON.parse); // safe JSON.parse
// const typeForSchemaAsync = Bluebird.method(avro.Type.forSchema);

 function initFingerprintTable() {
  const empty = Long.fromString(EMPTY, true, 16);
  const table = [];

  for (let i = 0; i < 256; i += 1) {
    let fp = Long.fromNumber(i, true);

    for (let j = 0; j < 8; j += 1) {
      const a = fp.and(Long.fromNumber(1, true)).neg();
      const b = empty.and(a);

      fp = fp.shru(1).xor(b);
    }
    table[i] = fp;
  }
  return table;
}

/**
 * @description Synchronous compute AVRO fingerprint
 * @param {Buffer} buf canonical AVRO schema
 * @returns {Uint8Array} 64 bit AVRO fingerprint
 */
function fingerprint64(buf) {
  let fp = Long.fromString(EMPTY, true, 16);

  for (let i = 0; i < buf.length; i += 1) {
    const a = fp.xor(Long.fromNumber(buf[i], true)); // (fp ^ buf[i])
    const b = a.and(Long.fromNumber(255, true)); // (fp ^ buf[i]) & 0xff
    const idx = parseInt(b.toNumber().toFixed(), 10);

    fp = fp.shru(8).xor(fpTable[idx]);
  }
  // @ts-ignore
  return new Uint8Array(fp.toBytesLE());
}
/**
 * @description 64-bit AVRO fingerprint of given AVRO schema string
 * @param {string} schemaString stringified AVRO JSON schema
 * @returns {Promise<Uint8Array>} 64 bit AVRO fingerprint
 */
async function fingerprint64AvroSchema(schemaString) {
  const schema = await parseAsync(schemaString)
    .catch(SyntaxError, err => Bluebird.reject(new errors.AvroSchemaStringSyntaxException(err)));

  let type; // AVSC Avro type instance
  try {
    type = avro.Type.forSchema(schema);
  } catch (err) {
    // TODO: be more specific
    throw (new errors.InvalidAvroSchemaException(err));
  }

  const canonicalSchema = type.schema({ exportAttrs: false, noDeref: false });
  const canonicalSchemaString = JSON.stringify(canonicalSchema);
  const fp = fingerprint64(Buffer.from(canonicalSchemaString));

  return fp;
}

// let's go
fpTable = initFingerprintTable();



/*

const dlpSchema = require('../tests/DataPortabilityResponse.avsc.json');
const dlpType = avro.Type.forSchema(dlpSchema);

const mceSchema = '{"type":"record","name":"DataPortabilityResponse","namespace":"com.telefonica.germany.streams.dlp.dsgvo.v1","doc":"Data Portability Response Schema","fields":[{"name":"DataAccessURI","type":"string","doc":""},{"name":"DataExpirationDate","type":"string","doc":""}],"aliases":["com.telefonica.germany.streams.dlp.dsgvo.v1.dev.DataPortabilityResponse","com.telefonica.germany.streams.dlp.dsgvo.v1.e2e1.DataPortabilityResponse","com.telefonica.germany.streams.dlp.dsgvo.v1.e2e2.DataPortabilityResponse"]}';

const mceType = avro.Type.forSchema(JSON.parse(mceSchema));


const dlpCanonicalSchema = JSON.stringify(dlpType.schema(canonicalSchemaOpts));
const mceCanonicalSchema = JSON.stringify(mceType.schema(canonicalSchemaOpts));

console.log(dlpCanonicalSchema);
console.log();

console.log(mceCanonicalSchema);
console.log(fingerprint64(Buffer.from(mceCanonicalSchema)));
*/

module.exports = {
  initFingerprintTable,
  fingerprint64,
  fingerprint64AvroSchema,
  errors,
};
