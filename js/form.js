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

export {disableForm,enabledForm};
