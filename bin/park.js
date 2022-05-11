#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {park} = require('../src/controllers/cli');

const {argv} = yargs(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Park: $0 <car-number>')
    .example('$0 C-1234-12', 'Parks a car');

park(argv);
