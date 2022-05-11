#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {status} = require('../src/controllers/cli');

const {argv} = yargs(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Park: $0')
    .example('$0', 'Prints status of the parking lot');

status(argv);
