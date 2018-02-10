# avro-crc64 API

## fingerprint64AvroSchema(schemaString: string): Promise&lt;Uint8Array&gt;
 fingerprint64AvroSchema returns a promise which resolves to a Rabin 64-bit crc fingerprint as 8 byte [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

### Parameters
- schemaString&lt;string&gt;: [Apache AVRO](https://avro.apache.org/docs/current/) schema in string representation

### Returns
- Promise&lt;Uint8Array&gt;: 64-bit fingerprint

### Errors
The returned promise will reject with:
- AvroSchemaStringSyntaxError&lt;Error&gt;: In case parsing of schemaString fails with a SytaxError Exception
- InvalidAvroSchemaError&lt;Error&gt;: In case a [AVSC](https://github.com/mtth/avsc) AVRO Type could not be instantiated with parsed schemaString object.
