export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
  getInputValues() {
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }
  _resetErrors() {
    const errorInputs = Array.from(this._form.querySelectorAll('.popup__input_type_error'));

      if (errorInputs) {
        Array.from(errorInputs).forEach(input => {
          input.classList.remove('popup__input_type_error');
          input.nextElementSibling.textContent = '';
        });
      }
    }
  close() {
    super.close();
    this._form.reset();
    this._resetErrors();
  }
}

import Popup from './Popup.js';
