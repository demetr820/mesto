export class Card {
  constructor(item, template, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
    // this._imageInPicturePopup = document.querySelector('.popup-image__picture');
    // this._titleInPopupImage = document.querySelector('.popup-image__title');
    // this._iconDeleteCard = document.querySelector('.places__button-delete');
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._template)
    .content
    .querySelector('.places__item')
    .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._element.querySelector('.places__image')
    .addEventListener('click', (e) => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.places__button-delete').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.places__like-button').addEventListener("click", () => {
      this._element.querySelector('.places__like-button').classList.toggle('places__like-button_active');
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.places__title').textContent = this._name;
    this._element.querySelector('.places__image').src = this._link;

    return this._element;
  }
}
