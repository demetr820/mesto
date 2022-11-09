export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._form.addEventListener('submit', e => this._handleSubmit(e));
  }
}
import Popup from './Popup.js';
