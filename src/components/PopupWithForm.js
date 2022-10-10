export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }
  _resetErrors() {
    const inputs = Array.from(this._form.querySelectorAll('.popup__input_type_error'));
      if (inputs) {
        Array.from(inputs).forEach(input => {
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
