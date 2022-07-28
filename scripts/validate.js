const forms = [
{
  formClass: 'popup__form[name="edit-form"]',
  buttonClass: 'popup__button-submit',
  buttonInvalidClass: 'popup__button-submit_invalid',
}, {
  formClass: 'popup__form[name="form-add-card"]',
  buttonClass: 'popup__button-submit',
  buttonInvalidClass: 'popup__button-submit_invalid',
}];
function enableValidation(config) {
  const form = document.querySelector('.' + config.formClass);
  form.addEventListener('input', (e)=> handleFormInput(e, config));
}
function handleFormInput(e, config) {
  const input = e.target;
  const form = e.currentTarget;
  showFieldError(input);
  setSubmitButtonState(form, config);
};
function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}
function setSubmitButtonState(form, config) {
  const button = form.querySelector('.' + config.buttonClass);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonInvalidClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonInvalidClass);
  }
};
forms.forEach(form => {
  enableValidation(form);
});


