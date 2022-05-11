const fs = require('fs');
const os = require('os');

const userHomeDir = os.homedir();
const dir = `${userHomeDir}/.nodejs-cli`
const file = `${dir}/storage.json`;

const create = (argv) => {
    const arrLen = argv._?.[0];
    if (arrLen === undefined) {
        console.error("Length of array required, please run `create --help` for further information");
        return;
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    const arr = Array.from(Array(arrLen));
    const data = JSON.stringify({
      data: arr,
    })
    fs.writeFile(file, data, (err) => {
      if (err)
        console.log(err);
      else {
        console.log(`Created parking lot with ${arrLen} slots`);
      }
    })
    
}

module.exports = {
    create,
};