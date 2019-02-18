const { readFileSync, createReadStream } = require('fs');
const readline = require('readline');

const path = require('path');

const vsToWkt = require('./vs-to-wkt-converter');
