const path = require('path');
const transformFolderContent = require('../transform-folder-content');

const INPUT_PATH = path.resolve(__dirname, '..', '..', 'input');
const OUTPUT_FILE = path.resolve(__dirname, '..', '..', 'output', 'result.csv');

const DESCRIPTION = `
converts all csvs found in input folder into wkt notation and stores it in output/result.csv
`;

module.exports = program => {
  program
    // .command('run')
    .description(DESCRIPTION)
    .action(async () => {
      try {
        await transformFolderContent(INPUT_PATH, OUTPUT_FILE);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
      }
    });
};
