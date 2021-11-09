function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function isElemInArray(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

export {getRandomPositiveFloat, getRandomPositiveInteger, shuffle,isElemInArray};
