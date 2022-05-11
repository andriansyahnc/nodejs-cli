const os = require('os');
const Console = require('Console');

const userHomeDir = os.homedir();
process.env.DIRECTORY = `${userHomeDir}/.nodejs-cli-test`;
const {create, status, park} = require('../cli');

describe.only('status', () => {
  Console.log = jest.fn();
  Console.error = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('status', async () => {
    const arrLen = 3;
    create({_: [arrLen]});
    for (let idx = 0; idx < arrLen - 1; idx+=1) {
      park({_: [`car-number-${idx}`]});
      status();
      expect(Console.log).toHaveBeenCalledWith(expect.stringContaining("empty"));
    }
    park({_: [`car-number-${arrLen}`]})
    status();
    expect(Console.log).toHaveBeenCalledWith(expect.not.stringContaining("empty"));
  });
});
