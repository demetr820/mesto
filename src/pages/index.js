import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import {
  inputUserName,
  inputAbout,
  editFormValidator,
  addNewCardFormValidator,
  avatarChangeFormValidator,
  buttonOpenPopupProfile,
  API_OPTIONS,
  buttonOpenPopupAddNewCard,
  selectors,
  popupConfirmDeletion,
  popupCardEdit,
  avatarProfile
  } from '../utils/consts.js';

const api = new Api(API_OPTIONS);

const popupWithImage = new PopupWithImage(selectors.popupImage);

const popupWithFormProfile = new PopupWithForm(selectors.popupCardEdit, (item) => {
  showLoading(true);
  userInfo.setUserInfo(item)
  .finally(() => {
    showLoading(false);
  });
});
const popupWithFormNewCard = new PopupWithForm(selectors.popupAddNewCard, (item) => {
  api.createCard(item)
  .then(data => {
    const card = createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner,
    }, userID);
    cardsList.addItem(card);
    addNewCardFormValidator.disableSubmitButton();
    addNewCardFormValidator.resetErrors();
  });
});

const popupAvatarChange = new PopupWithForm(selectors.popupAvatarChange, (item) => {
  userInfo.setUserAvatar(item);
  avatarChangeFormValidator.resetErrors();
});

const userInfo = new UserInfo({ nameSelector: selectors.fieldUserName,
  descriptionSelector: selectors.fieldUserDescription,
  avatarSelector: selectors.imageAvatarProfile });

// Функции
function createNewCard(item, userID) {
  const cardElement = new Card({
    item,
    handleImageClick: openImagePopup,
    handleLikeClick: (id, isLiked) => {
      return api.handleLike(id, isLiked)
      .then((data) => {
        cardElement.updateLikeCounter(data.likes.length);
        cardElement.likeCardState(cardElement.isLiked(data.likes));
      })
      .catch(err => console.log(err));
    },
    handleCardDelete: (id) => {
      popupConfirmDeletion.open();
      popupConfirmDeletion.setSubmitAction(e => {
        e.preventDefault();
        api.deleteCard(id)
        .then(() => {
          cardElement.removeCard();
          popupConfirmDeletion.close();
        })
        .catch(err => console.log(err));
      })
    }
  }, userID,
  selectors.template);
  const card = cardElement.generateCard();
  return card;
}
function openImagePopup(link, name) {
  popupWithImage.open(link, name);
}
function showLoading(state) {
  const btn = popupCardEdit.querySelector('.popup__button-submit');
  if (state) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохранить';
  }
}

// Слушатели
buttonOpenPopupProfile.addEventListener('click', () => {
  editFormValidator.resetErrors();
  const data = userInfo.getUserInfo();
  inputUserName.value = data.name;
  inputAbout.value = data.about;
  popupWithFormProfile.open();
});

buttonOpenPopupAddNewCard.addEventListener('click', () => {
  addNewCardFormValidator.resetErrors();
  popupWithFormNewCard.open();
});
avatarProfile.addEventListener('click', () => {
  avatarChangeFormValidator.disableSubmitButton();
  popupAvatarChange.open();
});

popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();
popupAvatarChange.setEventListeners();
popupConfirmDeletion.setEventListeners();
editFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
avatarChangeFormValidator.enableValidation();

let userID = null;
const cardsList = new Section(createNewCard, selectors.cardsContainer);
const init = async () => {
  api.getUserInfo()
  .then((data) => {
    userID = data._id;
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(err));
  api.getInitialCards()
  .then(data => {
    cardsList.renderItems(data, userID)
  })
  .catch(err => console.log(err));
}
init();
