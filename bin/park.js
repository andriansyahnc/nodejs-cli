#!/usr/bin/env node

const { park } = require('../src/controllers/cli');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Park: $0 <car-number>')
    .example('$0 C-1234-12', 'Parks a car')
    .argv;

park(argv);