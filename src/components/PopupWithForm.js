export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const item = this._getInputValues();
      this._handleFormSubmit(item);
    });
    super.setEventListeners();
  }
  close() {
    super.close();
    this._form.reset();
  }
}

import Popup from './Popup.js';
