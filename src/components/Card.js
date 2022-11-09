export default class Card {
  constructor(data, userID, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.item.name;
    this._link = data.item.link;
    this._itemOwnerID = data.item.owner._id;
    this._userID = userID;
    this._itemID = data.item._id;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.places__image');
    this._buttonLike = this._element.querySelector('.places__like-button');
    this._buttonDelete = this._element.querySelector('.places__button-delete');
    this._likeCounter = this._element.querySelector('.places__like-counter');
    this._arrayOfLikes = data.item.likes;
    this._handleCardClick = data.handleCardClick;
    this._handleCardDelete = data.handleCardDelete;
    this._handleLikeClick = data.handleLikeClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content
    .querySelector('.places__item')
    .cloneNode(true);
    return cardElement;
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  likeCardState(state) {
    if (state) {
      this._buttonLike.classList.add('places__like-button_active');
    } else {
      this._buttonLike.classList.remove('places__like-button_active');
    }
  }
  isLiked(likes) {
    return likes.find(item => item._id === this._userID) ? true : false;
  }
  updateLikeCounter(counter) {
    this._likeCounter = counter;
  }
  _setEventListeners() {
    if (this._itemOwnerID === this._userID) {
      this._buttonDelete.classList.add('places__button-delete_active');
      this._buttonDelete.addEventListener('click', () => {
        this._handleCardDelete(this._itemID);
      });
    }
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
    this._buttonLike.addEventListener('click', async () => {
      const res = await this._handleLikeClick(this._itemID, this.isLiked(this._arrayOfLikes));
      this.updateLikeCounter(res.likes.length);
      this.likeCardState(this.isLiked(res.likes));
    })
  }
  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.places__title').textContent = this._name;
    if (this._arrayOfLikes.length > 0 ) {
      this._likeCounter.textContent = this._arrayOfLikes.length;
    }
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._element;
  }
}
