const { readFileSync } = require('fs');
const path = require('path');

const inputFile = readFileSync(path.resolve(__dirname, '__test__', 'input.csv'), 'utf8');
const outputFile = readFileSync(path.resolve(__dirname, '__test__', 'output.csv'), 'utf8');

const vsToWkt = require('./vs-to-wkt-converter');

test('csv line should be converted to wkt line', () => {
  const inputs = inputFile.split('\n');
  const outputs = outputFile.split('\n');
  inputs.forEach((input, index) =>
    expect(vsToWkt(input)).toEqual(outputs[index].replace(';input', ''))
  );
});
