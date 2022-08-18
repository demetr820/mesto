const form1 = {
  formSelector: '.popup__form[name="edit-form"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
}
const form2 = {
  formSelector: '.popup__form[name="form-add-card"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
}


function enableValidation(config) {
  const form = document.querySelector(config.formSelector);

  form.addEventListener('input', (e) => handleFormInput(e, config));

  form.addEventListener('submit', handleFormSubmit);

}

function handleFormInput(e, config) {
  const input = e.target;
  const form = e.currentTarget;
  showInputError(input, config);
  setSubmitButtonState(form, config);
}

function handleFormSubmit(e) {
  e.preventDefault();
}
function showInputError(input, config) {
  if (!input.validity.valid) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
    span.classList.add(config.spanErrorClass);

  } else {
    const span = input.nextElementSibling;
    span.textContent = '';
    input.classList.remove(config.inputErrorClass);
    span.classList.remove(config.spanErrorClass);
  }
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
enableValidation(form1);
enableValidation(form2);
