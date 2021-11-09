const showSuccessAlert = () => {
  const alertContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.body.append(alertContainer);
  const escHandler = (evt) => {
    if (evt.key  === 'Escape') {
      alertContainer.remove();
      document.removeEventListener('keydown',escHandler);
    }
  };
  document.addEventListener('keydown',escHandler);
  const clickHandler = () => {
    alertContainer.remove();
    document.removeEventListener('click',clickHandler);
  };
  document.addEventListener('click',clickHandler);
};

const showErrorAlert = (errorText) => {
  const alertContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  alertContainer.querySelector('.error__message').textContent = errorText;
  document.body.append(alertContainer);
  const escHandler = (evt) => {
    if (evt.key  === 'Escape') {
      alertContainer.remove();
      document.removeEventListener('keydown',escHandler);
    }
  };
  document.addEventListener('keydown',escHandler);
  const clickHandler = () => {
    alertContainer.remove();
    document.removeEventListener('click',clickHandler);
  };
  document.addEventListener('click',clickHandler);

  const closeErrorPopup = document.querySelector('.error__button');
  const buttonHandler = () => {
    alertContainer.remove();
    closeErrorPopup.removeEventListener('click',buttonHandler);
  };
  closeErrorPopup.addEventListener('click',buttonHandler);
};

export {showErrorAlert,showSuccessAlert};
