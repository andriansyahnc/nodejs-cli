const os = require('os');
const Console = require('Console');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create, leave, park} = require('../cli');
const { getFee } = require('../../utils/common');

describe.only('leave', () => {
  Console.log = jest.fn();
  Console.error = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('leave', async () => {
    const arrLen = 10;
    create({_: [arrLen]});
    for (let idx = 0; idx < arrLen; idx+=1) {
      park({_: [`car-number-${idx}`]});
    }
    for (let idx = 0; idx < arrLen; idx+=1) {
      const hour = idx + 1;
      leave({_: [`car-number-${idx}`, hour]});
      const fee = getFee(hour);
      expect(Console.log).toHaveBeenCalledWith(expect.stringContaining(`${fee}`));
    }
  });
});
