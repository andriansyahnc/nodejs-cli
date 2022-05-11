#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {create} = require('../src/controllers/cli');

const {argv} = yargs(process.argv.slice(2))
    .help('h')
    .alias('h', 'help')
    .usage('Create: $0 <size> [options]')
    .example('$0 10', 'Creates parking lot of size 10');

create(argv);
