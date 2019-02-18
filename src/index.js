const program = require('commander');
const { version } = require('../package.json');
const { run } = require('./commands');

const DESCRIPTION = `
  Transfromation tool for transforming visualizer data into wkt format. 
`;

module.exports = function bin() {
  program.description(DESCRIPTION).version(version, '-v, --version');

  run(program);

  program.parse(process.argv);
};
