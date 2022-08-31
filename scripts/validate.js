const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    form.addEventListener('input', (e) => handleFormInput(e, config));
    form.addEventListener('submit', handleFormSubmit);
  });
}

function handleFormInput(e, config) {

  const input = e.target;
  const form = e.currentTarget;
  if (!input.validity.valid) {
    showInputError(input, config);
  } else {
    hideInputError(input, config);
  }
  setSubmitButtonState(form, config);
}

function handleFormSubmit(e) {
  e.preventDefault();
}
function showInputError(input, config) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  span.classList.add(config.spanErrorClass);
}

function hideInputError(input, config) {
  const span = input.nextElementSibling;
  span.textContent = '';
  input.classList.remove(config.inputErrorClass);
  span.classList.remove(config.spanErrorClass);

}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.inactiveButtonClass);
  }
}

function disableSubmitButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add(config.inactiveButtonClass);
}

enableValidation(config);
