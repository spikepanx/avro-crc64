class AvroSchemaStringSyntaxError extends Error {
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

class InvalidAvroSchemaError extends Error {
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
  AvroSchemaStringSyntaxError,
  InvalidAvroSchemaError,
};
