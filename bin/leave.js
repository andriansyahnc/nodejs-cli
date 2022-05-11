#!/usr/bin/env node

const { leave } = require('../src/controllers/cli');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Leave: $0 <car-numbers> <hours>')
    .example('$0 C-1234-12 1', 'Removes (unpark) a car')
    .argv;

leave(argv);