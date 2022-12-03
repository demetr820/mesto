export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this.submitButton = this._popup.querySelector('.popup__button-submit');
  }
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._form.addEventListener('submit', (e) => this._handleSubmit(e));
  }
}
import Popup from './Popup.js';
