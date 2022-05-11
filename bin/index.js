#!/usr/bin/env node

const { create } = require('../src/controllers/cli');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Create: $0 <length of array> [options]')
    .example('$0 10', 'Create an array which has length of 10')
    .example('$0 10 -y', 'Create an array which has length of 10, and override the existing array (if any)')
    .argv;

create(argv);