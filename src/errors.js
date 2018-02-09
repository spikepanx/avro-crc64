class AvroSchemaStringSyntaxException extends Error {
/**
 * Creates an instance of AvroSchemaStringSyntaxException.
 * @param {Error} err
 * @memberof AvroSchemaStringSyntaxException
 */
  constructor(err) {
    super();
    this.message = `JSON string not parseable: ${err.message}`;
    this.stack = err.stack;
  }
}

class InvalidAvroSchemaException extends Error {
  /**
   * Creates an instance of InvalidAvroSchemaException.
   * @param {Error} err
   * @memberof InvalidAvroSchemaException
   */
  constructor(err) {
    super();
    this.message = `AVRO schema error: ${err.message}`;
    this.stack = err.stack;
  }
}

module.exports = {
  AvroSchemaStringSyntaxException,
  InvalidAvroSchemaException,
};
