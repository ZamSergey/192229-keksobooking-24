//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandom(min, max) {
  if(min >= 0 && max > 0 && max > min && (max - min) >=1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
}
getRandom(0, 1);

function getRandomScale(min, max, scale) {
  const scaleNumber = Math.pow(10, scale);
  if(min >= 0 && max > 0 && max > min && (max - min) >=0) {
    return Math.floor((min + Math.random() * (max - min + 1 / scaleNumber)) * scaleNumber) / scaleNumber;
  }
  return false;
}

getRandomScale(0.1, 1.2, 10);
