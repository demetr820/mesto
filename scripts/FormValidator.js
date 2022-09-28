export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  };
  enableValidation() {
    this._form.addEventListener('input', (e) => this._handleFormInput(e, this._config));
    this._form.addEventListener('submit', this._handleFormSubmit);
  };

  _handleFormInput(e, config) {
    const input = e.target;

    if (!input.validity.valid) {
      this._showInputError(input, config);
    } else {
      this._hideInputError(input, this._config);
    }
    this._setSubmitButtonState(this._form, config);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
  }
  _showInputError(input, config) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
    span.classList.add(config.spanErrorClass);
  }

  _hideInputError(input, config) {
    const span = input.nextElementSibling;
    span.textContent = '';
    input.classList.remove(config.inputErrorClass);
    span.classList.remove(config.spanErrorClass);

  }

  _setSubmitButtonState(form, config) {
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

  disableSubmitButton(button) {
    button.setAttribute('disabled', true);
    button.classList.add(this._config.inactiveButtonClass);
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
