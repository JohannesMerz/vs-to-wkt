const fs = require('fs');
const path = require('path');
const readline = require('readline');
const vsToWkt = require('./vs-to-wkt-converter');

async function transformFolderContent(inputPath, outputFile) {
  const files = getCsvsOfFolder(inputPath);
  console.info('start transforming files...', files);
  const writeStream = fs.createWriteStream(outputFile);
  await files.reduce(
    (prev, current) => prev.then(() => transformFile(current, writeStream)),
    Promise.resolve()
  );
  writeStream.end();
}
module.exports = transformFolderContent;

function getCsvsOfFolder(folder) {
  return fs
    .readdirSync(folder, 'utf8')
    .filter(file => file.endsWith('.csv'))
    .map(file => path.resolve(folder, file));
}

function withFileName(result, fileName) {
  return `${result};${fileName}\n`;
}

async function transformFile(file, outputStream) {
  return new Promise((resolve, reject) => {
    const inputStream = fs.createReadStream(file);
    const fileName = path.basename(file).replace('.csv', '');
    const rl = readline.createInterface({
      input: inputStream,
      // output: outputStream,
      terminal: false,
    });

    rl.on('line', line => {
      try {
        const result = withFileName(vsToWkt(line), fileName);
        outputStream.write(result);
      } catch (error) {
        rl.error(error);
      }
    });

    rl.on('close', () => resolve());
    rl.on('error', reject);
  });
}
