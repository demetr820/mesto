export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  };
  enableValidation() {
    this._form.addEventListener('input', (e) => this._handleFormInput(e));
    this._form.addEventListener('submit', (e) => this._handleFormSubmit(e));
  };

  _handleFormInput(e) {
    const input = e.target;

    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
    this._setSubmitButtonState();
  }

  _handleFormSubmit(e) {
    e.preventDefault();
  }
  _showInputError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
    span.classList.add(this._config.spanErrorClass);
  }

  _hideInputError(input) {
    const span = input.nextElementSibling;
    span.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
    span.classList.remove(this._config.spanErrorClass);

  }

  _setSubmitButtonState() {
    const isValid = this._form.checkValidity();
    if (isValid) {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      this.disableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }
  resetErrors() {
    const inputs = Array.from(this._form.querySelectorAll(`.${this._config.inputErrorClass}`));
    this._form.reset();
    if (inputs) {
      Array.from(inputs).forEach(input => {
        input.classList.remove(this._config.inputErrorClass);
        input.nextElementSibling.textContent = '';
      });
    }
  }
}
