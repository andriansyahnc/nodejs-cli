const os = require('os');
const Console = require('Console');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create} = require('../cli');

describe.only('create', () => {
  Console.log = jest.fn();
  Console.error = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('create', async () => {
    const arrLen = 10;
    create({_: [arrLen]});
    const message = `Created parking lot with ${arrLen} slots`;
    expect(Console.log).toHaveBeenCalledWith(message);
  });

  it('create with no parameter', async () => {
    create({_: []});
    const message = 'Length of array required, please run `create --h` for further information';
    expect(Console.error).toHaveBeenCalledWith(message);
  });
});
