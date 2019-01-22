test('csv should be converted to wkt', () => {
  expect(csvToWkt(input)).toEqual(expectedOutput);
});
