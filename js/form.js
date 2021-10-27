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

const enabledForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');

  toggleListDisabled(form.querySelectorAll('input'));
  toggleListDisabled(mapFilter.querySelectorAll('select'));
  toggleListDisabled(mapFilter.querySelectorAll('input'));
};

form.addEventListener('submit',(evt) => {
  evt.preventDefault();
})

const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adRoomNumber = document.querySelector('#room_number');
const adRoomCapacity = document.querySelector('#capacity');


/*const setValidRoomCapasity = (roomNumber) => {
  const capacityOptions = adRoomCapacity.children;
  console.log(capacityOptions)
  for(const option of capacityOptions) {
    if(option.value > roomNumber) {
      option.disabled = true;
    }
    else {
      option.disabled = false;
    }
  }
}*/

/*adTitle.addEventListener('invalid', () => {
  console.log(adTitle.validity);
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30-и символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  }
  else {
    adTitle.setCustomValidity('');
  }
});*/

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

const MIN_PRISE_LENGTH = 1000;
const MAX_PRISE_LENGTH = 1000000;

adPrice.addEventListener('input', () => {
  const value = adTitle.value;
  console.log(adPrice.validity)
  if( value < MIN_PRISE_LENGTH) {
    adPrice.setCustomValidity(`Цена для данного типа жилья не может быть ниже ${MIN_PRISE_LENGTH} руб.`);
  }
  else if( value > MAX_PRISE_LENGTH) {
    adPrice.setCustomValidity(`Цена для данного типа жилья не может быть выше ${MAX_PRISE_LENGTH} руб.`);
  }
  else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

adRoomNumber.addEventListener('input', () => {
  // const roomNumber = adRoomNumber
  //setValidRoomCapasity(adRoomNumber.value)
});

adRoomCapacity.addEventListener('input', () => {
  const roomCapacity = adRoomCapacity.value;
  const roomNumber = adRoomNumber.value;
  if(roomCapacity > roomNumber) {
    adRoomCapacity.setCustomValidity(`Нельзя разместить ${roomCapacity} гостей в ${roomNumber} комнатах`);
  }
  else {
    adRoomCapacity.setCustomValidity('');
  }

  adRoomCapacity.reportValidity();
  //setValidRoomCapasity(adRoomNumber.value) Заготовка для динамического изменения
});

export {disableForm,enabledForm};
