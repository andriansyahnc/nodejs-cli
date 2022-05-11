const os = require('os');
const Console = require('Console');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create} = require('../cli');

describe.only('create', () => {
  Console.log = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('create', async () => {
    const arrLen = 10;
    create({_: [arrLen]});
    const message = `Created parking lot with ${arrLen} slots`;
    expect(Console.log).toHaveBeenCalledWith(message);
  });
});
