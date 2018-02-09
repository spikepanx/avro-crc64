const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

const { expect, should } = chai;

global.expect = expect;
global.should = should;
