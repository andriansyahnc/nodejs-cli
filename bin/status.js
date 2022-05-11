#!/usr/bin/env node

const { status } = require('../src/controllers/cli');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Park: $0')
    .example('$0', 'Prints status of the parking lot')
    .argv;

status(argv);