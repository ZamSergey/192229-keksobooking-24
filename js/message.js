const ALERT_SHOW_TIME = 5000;

const showSuccessAlert = () => {
  const alertContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.body.append(alertContainer);
  const escClickHandler = (evt) => {
    if (evt.key  === 'Escape') {
      alertContainer.remove();
      document.removeEventListener('keydown',escClickHandler);
    }
  };
  document.addEventListener('keydown',escClickHandler);
  const alertClickHandler = () => {
    alertContainer.remove();
    document.removeEventListener('click',alertClickHandler);
  };
  document.addEventListener('click',alertClickHandler);
};

const showErrorAlert = (errorText) => {
  const alertContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  alertContainer.querySelector('.error__message').textContent = errorText;
  document.body.append(alertContainer);
  const escClickHandler = (evt) => {
    if (evt.key  === 'Escape') {
      alertContainer.remove();
      document.removeEventListener('keydown',escClickHandler);
    }
  };
  document.addEventListener('keydown',escClickHandler);
  const alertClickHandler = () => {
    alertContainer.remove();
    document.removeEventListener('click',alertClickHandler);
  };
  document.addEventListener('click',alertClickHandler);

  const closeErrorPopup = document.querySelector('.error__button');
  const buttonClickHandler = () => {
    alertContainer.remove();
    closeErrorPopup.removeEventListener('click',buttonClickHandler);
  };
  closeErrorPopup.addEventListener('click',buttonClickHandler);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorAlert,showSuccessAlert,showAlert};
