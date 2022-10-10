export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close');
  }
  open() {
    this._popup.classList.add('popup_opened');
  }
  close() {
    this._popup.classList.remove('popup_opened');
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
    window.addEventListener('keydown', (e) => {
      this._handleEscClose(e);
    });
    this._popup.addEventListener('click', (e) => {
      this._handleOverlayClose(e);
    });
  }
}
