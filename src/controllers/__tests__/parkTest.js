const os = require('os');
const Console = require('Console');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create, park} = require('../cli');

describe.only('park', () => {
  Console.log = jest.fn();
  Console.error = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('park', async () => {
    const arrLen = 3;
    create({_: [arrLen]});
    for (let idx = 0; idx < arrLen; idx+=1) {
      park({_: [`car-number-${idx}`]})
      const message = `Allocated slot number ${idx + 1}`;
      expect(Console.log).toHaveBeenCalledWith(message);
    }
    park({_: [`car-number-${arrLen}`]})
    const message = `Sorry, parking lot is full`;
    expect(Console.log).toHaveBeenCalledWith(message);
  });

  it('park with no parameter', async () => {
    park({_: []});
    const message = 'Car number required, please run `park --help` for further information';
    expect(Console.error).toHaveBeenCalledWith(message);
  });
});
