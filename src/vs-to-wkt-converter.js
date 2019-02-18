function vsToWkt(input) {
  const sections = input.split(';');
  const [name, , type, ...points] = sections;
  switch (type) {
    case 'FreeForm':
      return withName(name)(freeFormToWkt(points[2]));
    case 'Square':
      return withName(name)(squareToWkt(points[0]));
    default:
      throw new Error(`unkown input type ${type}`);
  }
}
module.exports = vsToWkt;

function squareToWkt(rectString) {
  const points = getPointsFromRect(rectString);
  return `POLYGON((${points.join(', ')}, ${points[0]}))`;
}

function getPointsFromRect(rectString) {
  const GET_POINTS = /rect\(([0-9]+),([0-9]+),([0-9]+),([0-9]+)\)/g;
  const [, a, b, c, d] = GET_POINTS.exec(rectString);
  return [`${a} ${b}`, `${c} ${b}`, `${c} ${d}`, `${a} ${d}`];
}

function freeFormToWkt(pointString) {
  const points = getPointsFromString(pointString);
  return `POLYGON((${points.join(', ')}, ${points[0]}))`;
}

function getPointsFromString(pointString) {
  const GET_POINTS = /point\((:?[0-9]+,\s?[0-9]+)\)/g;
  const result = [];
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = GET_POINTS.exec(pointString)) !== null) {
    result.push(match[1].replace(',', '  ').replace(/\s+/g, ' '));
  }
  return result;
}

function withName(name) {
  return result => `${name};${result}`;
}
