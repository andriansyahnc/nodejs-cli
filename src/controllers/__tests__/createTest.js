const os = require('os');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create} = require('../cli');

describe.only('create', () => {
  // eslint-disable-next-line no-console
  console.log = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('create', async () => {
    const arrLen = 10;
    create({_: [arrLen]});
    const message = `Created parking lot with ${arrLen} slots`;
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
