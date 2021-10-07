//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//Эти вспомогателные функции понравились больше, поэтому свои убрал
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}
getRandomPositiveFloat(0.1, 1.2, 10);

function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

getRandomPositiveInteger(0, 1);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const TEST_TITLE = ['Отель Гранд Будапешт', 'Отель Тверь', 'Гостинница Москва', 'Parck Inn Hotel', 'Хостел у Петровича'];
const TEST_TYPE = ['palace', 'flat', 'house', 'bungalow' ,'hotel'];
const TEST_CHECKIN = ['12:00', '13:00', '14:00'];
const TEST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TEST_DESCRIPTION = ['Невероятно чистое помещение','Много траканов','Тонкие стены. Все слышно', 'Стеклянные стены'];
const TEST_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TEST_AVATAR = [];
//Создаю массив строк с разными адресами
for(let i = 1; i<=10;i++){
  TEST_AVATAR[i] = i === 10 ? `img/avatars/user${  i  }.png` : `img/avatars/user0${  i  }.png`;
}
//Перемешиваю массив случайным образом, чтобы аватарки не шли подряд
shuffle(TEST_AVATAR);

//Чтобы аватарки не вопрарялись в разных отелях, пришлось передавать в функцию номер отеля. Другого решения не придумал
const getHotel = (numberOfHotel) => {

  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  const set = new Set();
  //Создаем массив случайной длинны
  for(let i = 0; i < getRandomPositiveInteger(0,TEST_FEATURES.length-1)+1; i++) {
    set.add(TEST_FEATURES[getRandomPositiveInteger(0,TEST_FEATURES.length-1)]); //Заполняем случайными значениями. Повторяющиеся автоматически отсеиваются
  }
  const features = Array.from(set);
  const photos = [];
  for(let i = 1; i < getRandomPositiveInteger(1,10); i++) {
    photos.push(TEST_PHOTOS[getRandomPositiveInteger(0,TEST_PHOTOS.length-1)]);
  }
  return {
    author: {
      avatar: TEST_AVATAR[numberOfHotel],
    },
    offer: {
      title: TEST_TITLE[getRandomPositiveInteger(0, TEST_TITLE.length - 1)],
      address: `${location.lat }, ${ location.lng}`,
      price: getRandomPositiveInteger(10, 1000),
      type: TEST_TYPE[getRandomPositiveInteger(0, TEST_TYPE.length - 1)],
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 5),
      checkin: TEST_CHECKIN[getRandomPositiveInteger(0, TEST_CHECKIN.length - 1)],
      checkout: TEST_CHECKIN[getRandomPositiveInteger(0, TEST_CHECKIN.length - 1)],
      features: features,
      description: TEST_DESCRIPTION[getRandomPositiveInteger(0, TEST_DESCRIPTION.length - 1)],
      photos: photos,
    },
    location: location,
  };
};
const testHotelArray = [];
// Получить искомы массив с помощью меотда Array.from() не получилось за-за того, что в функцию нужно передавать параметры. Сделал через цикл
for(let i = 0; i < 10;i++) {
  testHotelArray[i]= getHotel(i);
}
console.log(testHotelArray);
