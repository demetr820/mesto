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
  api.createCard(item).then(data => {
    const card = createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner,
    });
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
  avatarSelector: selectors.imageAvatarProfile }, api);

// Функции
function createNewCard(item) {
  const cardElement = new Card({
    item,
    handleImageClick: openImagePopup,
    handleLikeClick: (id, isLiked) => {
      return api.handleLike(id, isLiked)
    },
    handleCardDelete: (id) => {
      popupConfirmDeletion.open();
      popupConfirmDeletion.setSubmitAction(e => {
        e.preventDefault();
        api.deleteCard(id)
        .then(() => {
          cardElement.removeCard();
          popupConfirmDeletion.close();
        });
      })
    }
  }, '4d5c0747a5cbd99c4e345055',
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
  api.getUserInfo()
  .then(data => {
    inputUserName.value = data.name;
    inputAbout.value = data.about;
    popupWithFormProfile.open();
  })
  .catch(err => console.log(err))
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

api.getInitialCards().then(data => {
  const initialCards = data;
  cardsList.renderItems(initialCards);
});

const cardsList = new Section(createNewCard, selectors.cardsContainer);
userInfo.initialUserInfo();
