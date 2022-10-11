export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-image__picture');
    this._imageTitle = this._popup.querySelector('.popup-image__title');
  }
  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;
    super.open();
  }
}

import Popup from './Popup.js';
