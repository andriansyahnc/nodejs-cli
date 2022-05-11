#!/usr/bin/env node

const { create } = require('../src/controllers/cli');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Create: $0 <size> [options]')
    .example('$0 10', 'Creates parking lot of size 10')
    .argv;

create(argv);