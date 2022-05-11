const fs = require('fs');
const os = require('os');
const set = require('lodash/set');
const Table = require('cli-table3');
const colors = require('@colors/colors');
const Console = require("Console");
const {isParkingLotExists, getFee} = require('../utils/common');

const userHomeDir = os.homedir();
const dir = process.env.DIRECTORY || `${userHomeDir}/.nodejs-cli`;
const file = `${dir}/storage.json`;

const create = (argv) => {
  const arrLen = argv._?.[0];
  if (arrLen === undefined) {
    const errMess =
    'Length of array required, please run `create --h` for further information';
    console.error(errMess);
    return;
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  const arr = Array.from(Array(arrLen));
  const data = JSON.stringify({
    data: arr,
  });
  fs.writeFileSync(file, data);
  Console.log(`Created parking lot with ${arrLen} slots`);
};

const park = (argv) => {
  if (!isParkingLotExists(file)) {
    Console.log('Parking lot not created yet.');
    return;
  }

  const carNumber = argv._?.[0];
  if (carNumber === undefined) {
    console.error('Car number required, please run `park --help` for further information');
    return;
  }
  const data = fs.readFileSync(file, {encoding: 'utf-8', flag: 'r'});
  const fileData = JSON.parse(data);
  const idx = fileData.data.findIndex((item) => item === null);
  if (idx === -1) {
    Console.log('Sorry, parking lot is full');
    return;
  }
  set(fileData, `data[${idx}]`, carNumber);
  const newData = JSON.stringify(fileData);
  fs.writeFileSync(file, newData);
  Console.log(`Allocated slot number ${idx + 1}`);
};

const status = () => {
  if (!isParkingLotExists(file)) {
    Console.log('Parking lot not created yet.');
    return;
  }

  const data = fs.readFileSync(file, 'utf-8');
  const arrData = JSON.parse(data);
  const table = new Table({
    head: [colors.white('Slot No.'), colors.white('Registration No.')],
    colWidths: [10, 20],
    chars: {'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
      'right': '', 'right-mid': '', 'middle': ' '},
  });
  arrData.data.forEach((element, idx) => {
    table.push([idx + 1, element ?? 'empty']);
  });
  Console.log(table.toString());
};

const leave = (argv) => {
  if (!isParkingLotExists(file)) {
    Console.log('Parking lot not created yet.');
    return;
  }

  const carNumber = argv._?.[0];
  const hour = argv._?.[1];
  if (carNumber === undefined || hour === undefined) {
    console.error('Car number and hour required, please run `leave --help` for further information');
    return;
  }
  const data = fs.readFileSync(file, 'utf-8');
  const fileData = JSON.parse(data);
  const idx = fileData.data.findIndex((item) => item === carNumber);
  if (idx === -1) {
    Console.log(`Registration Number ${carNumber} not found`);
    return;
  }
  set(fileData, `data[${idx}]`, null);
  const newData = JSON.stringify(fileData);
  fs.writeFile(file, newData, (err) => {
    if (err) {
      Console.log(err);
    } else {
      const fee = getFee(hour);
      Console.log(`Registration Number ${carNumber} from Slot ${idx + 1} has left with Charge ${fee}`);
    }
  });
};

module.exports = {
  create,
  park,
  status,
  leave,
};
