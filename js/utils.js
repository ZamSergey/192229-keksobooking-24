const ALERT_SHOW_TIME = 3000;
const ALERT_SUCCESS_TEMPLATE =  document.querySelector('#success').content.querySelector('.success');
const ALERT_ERROR_TEMPLATE =   document.querySelector('#error').content.querySelector('.error');

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

const showAlert = (result) => {
  let template = '';
  if (result === 'success') {
    template = ALERT_SUCCESS_TEMPLATE;
  }
  else {
    template = ALERT_ERROR_TEMPLATE;
  }

  const alertContainer = template.cloneNode(true);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, getRandomPositiveFloat, getRandomPositiveInteger, shuffle};
