export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    window.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  _handleOverlayClose(e) {
    if (e.currentTarget !== e.target) {
      return;
    }
    this.close();
  }
  setEventListeners() {
    this._buttonClose.addEventListener('click', (e) => {
      this.close();
    });
    this._popup.addEventListener('click', (e) => {
      this._handleOverlayClose(e);
    });
  }
}
