import {sendData} from './load.js';
import {showAlert} from './utils.js';

const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const toggleListDisabled = (elementsList) => {
  for(let i = 0; i < elementsList.length;i++ ){
    elementsList[i].toggleAttribute('disabled');
  }
};

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');

  toggleListDisabled(form.querySelectorAll('input'));
  toggleListDisabled(mapFilter.querySelectorAll('select'));
  toggleListDisabled(mapFilter.querySelectorAll('input'));
};
//Поумолчания страница неактивна
disableForm();

const enabledForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');

  toggleListDisabled(form.querySelectorAll('input'));
  toggleListDisabled(mapFilter.querySelectorAll('select'));
  toggleListDisabled(mapFilter.querySelectorAll('input'));
};

//Получить новую минимульную цену
const getMinPrice = (selectedTypeOption) => {
  let minPrise = 0;
  if (selectedTypeOption.value === 'flat') {
    minPrise = 1000;
  }
  if (selectedTypeOption.value === 'hotel') {
    minPrise = 3000;
  }
  if (selectedTypeOption.value === 'house') {
    minPrise = 5000;
  }
  if (selectedTypeOption.value === 'palace') {
    minPrise = 10000;
  }
  return minPrise;
};

//Все поля с которыми я работаю при валидации
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adRoomNumber = document.querySelector('#room_number');
const adRoomCapacity = document.querySelector('#capacity');
const roomType = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const address = document.querySelector('#address');

//Ограничения для заголовка
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

//Ограничения для цены
const MAX_PRISE_LENGTH = 1000000;

//Предварительно нужно задать минимально возможную стоимость
adPrice.min = getMinPrice(roomType);
adPrice.placeholder = getMinPrice(roomType);

const setAddressCoordinate = (lat,lng) => {
  const floatLat = parseFloat(lat);
  const floatLng = parseFloat(lng);
  address.value = `${ floatLat.toFixed(5)},${floatLng.toFixed(5)}`;
};

const checkPrice = () => {
  const value = adPrice.value;
  if( value < adPrice.min) {
    adPrice.setCustomValidity(`Цена для данного типа жилья не может быть ниже ${adPrice.min} руб.`);
  }
  else if( value > MAX_PRISE_LENGTH) {
    adPrice.setCustomValidity(`Цена для данного типа жилья не может быть выше ${MAX_PRISE_LENGTH} руб.`);
  }
  else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
};
//Логика для проверки комнат и размещенных в них людях
const checkRoomCapacity = () => {
  const roomCapacity = adRoomCapacity.value;
  const roomNumber = adRoomNumber.value;

  if (roomNumber === '100' && roomCapacity !== '0' || roomNumber !== '100' && roomCapacity === '0' ) {
    adRoomCapacity.setCustomValidity('Такой тип размещения только не для гостей');
  }
  else if(roomCapacity > roomNumber) {
    adRoomCapacity.setCustomValidity(`Нельзя разместить ${roomCapacity} гостей в ${roomNumber} комнатах`);
  }
  else {
    adRoomCapacity.setCustomValidity('');
  }

  adRoomCapacity.reportValidity();
};
//Если на странице поумолчанию стоят невалидные значения, а пользователь ничего не менял, то должна производиться первичная проверка по умолчанию
checkRoomCapacity();

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  checkPrice();
});

roomType.addEventListener('change', () => {
  adPrice.min = getMinPrice(roomType);
  adPrice.placeholder = getMinPrice(roomType);
  checkPrice();
});

adRoomNumber.addEventListener('change', () => {
  checkRoomCapacity();
});

adRoomCapacity.addEventListener('change', () => {
  checkRoomCapacity();
});

form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  sendData(
    () => showAlert('success'),
    () => showAlert('error'),
    new FormData(evt.target),
  );
});

export {disableForm,enabledForm,setAddressCoordinate};
