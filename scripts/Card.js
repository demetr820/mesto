export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = item.name;
    this._link = item.link;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content
    .querySelector('.places__item')
    .cloneNode(true);

    return cardElement;
  }
  _openFullSizeImage() {
    this._handleCardClick(this._name, this._link);
  }
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  _likeCard() {
    this._buttonLike.classList.toggle('places__like-button_active');
  }
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._openFullSizeImage();
    });

    this._element.querySelector('.places__button-delete').addEventListener('click', () => {
      this._removeCard();
    });

    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
  }
  generateCard() {
    this._buttonLike = this._element.querySelector('.places__like-button');
    this._image = this._element.querySelector('.places__image');
    this._setEventListeners();
    this._element.querySelector('.places__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
}
