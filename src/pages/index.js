import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards,
  popupCardEdit,
  popupImage,
  popupAddNewCard,
  popups,
  inputUserName,
  inputAbout,
  formEditProfile,
  formAddNewCard,
  formEditValidator,
  addNewCardFormValidator,
  buttonOpenPopupProfile,
  buttonSubmitInFormAddNewCard,
  buttonsClosePopup,
  fieldUserName,
  fieldUserDescription,
  inputNameInformAddNewCard,
  inputLinkInformAddNewCard,
  cardsContainer,
  buttonOpenPopupAddNewCard,
  imageInPicturePopup,
  titleInPopupImage,
  selectors } from '../utils/consts.js';

const popupWithImage = new PopupWithImage(selectors.popupImage);

const popupWithFormProfile = new PopupWithForm(selectors.popupCardEdit, (e) => {
  e.preventDefault();
  userInfo.setUserInfo(inputUserName.value, inputAbout.value)
  popupWithFormProfile.close();
});

const popupWithFormNewCard = new PopupWithForm(selectors.popupAddNewCard, (e) => {
  e.preventDefault();
  const item = {
    name: inputNameInformAddNewCard.value,
    link: inputLinkInformAddNewCard.value,
  };
  const cardElement = new Card(item, selectors.template, openImagePopup);
  const card = cardElement.generateCard();
  cardsList.addItem(card);
  popupWithFormNewCard.close();
  popupWithFormNewCard.disableSubmitButton();
});
const userInfo = new UserInfo({ nameSelector: selectors.fieldUserName, descriptionSelector: selectors.fieldUserDescription });

// Функции
function openImagePopup(link, name) {
  popupWithImage.open(link, name);
}
// Слушатели
buttonOpenPopupProfile.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  inputUserName.value = data.userName;
  inputAbout.value = data.userDescription;
  popupWithFormProfile.open();
});

buttonOpenPopupAddNewCard.addEventListener('click', () => {
  popupWithFormNewCard.open();
});

const cardsList = new Section({ items: initialCards, renderer: (item) => {
  const cardElement = new Card(item, selectors.template, openImagePopup);
  const card = cardElement.generateCard();
  cardsList.addItem(card);
  }
}, selectors.cardsContainer);

popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();
cardsList.renderItems();
formEditValidator.enableValidation();
addNewCardFormValidator.enableValidation();

