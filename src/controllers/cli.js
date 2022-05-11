const fs = require('fs');
const os = require('os');
const set = require('lodash/set');
const Table = require('cli-table3');
const colors = require('@colors/colors')

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
      if (idx === -1) {
        console.log("Sorry, parking lot is full");
        return;
      }
      set(fileData, `data[${idx}]`, carNumber);
      const newData = JSON.stringify(fileData);
      fs.writeFile(file, newData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(`Allocated slot number ${idx + 1}`);
        }
      })   
    }
  });
  
}

const status = (argv) => {
  if (!fs.existsSync(file)) {
    console.log("Parking lot not created yet.")
    return;
  }
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err)
      console.log(err);
    else {
      const arrData = JSON.parse(data);
      const table = new Table({
        head: [colors.white('Slot No.'), colors.white('Registration No.')],
        colWidths: [10, 20],
        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      })
      arrData.data.forEach((element, idx) => {
        table.push([idx + 1, element]);
      });
      console.log(table.toString());
    }
  });
  
}

module.exports = {
    create,
    park,
    status,
};