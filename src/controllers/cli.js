const fs = require('fs');
const os = require('os');
const set = require('lodash/set');

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

const park = (argv) => {
  if (!fs.existsSync(file)) {
    console.log("Parking lot not created yet.")
    return;
  }
  const carNumber = argv._?.[0];
  if (carNumber === undefined) {
      console.error("Car number required, please run `park --help` for further information");
      return;
  }
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err)
      console.log(err);
    else {
      const fileData = JSON.parse(data);
      const idx = fileData.data.findIndex((item) => item === null);
      set(fileData, `data[${idx}]`, carNumber);
      const newData = JSON.stringify(fileData);
      fs.writeFile(file, newData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(`Allocated slot number ${idx}`);
        }
      })   
    }
  });
  
}

module.exports = {
    create,
    park,
};