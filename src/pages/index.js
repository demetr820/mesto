import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards,
  inputUserName,
  inputAbout,
  formEditValidator,
  addNewCardFormValidator,
  buttonOpenPopupProfile,
  // inputNameInformAddNewCard,
  // inputLinkInformAddNewCard,
  buttonOpenPopupAddNewCard,
  selectors} from '../utils/consts.js';

const popupWithImage = new PopupWithImage(selectors.popupImage);

const popupWithFormProfile = new PopupWithForm(selectors.popupCardEdit, (item) => {
  userInfo.setUserInfo(item);
});

const popupWithFormNewCard = new PopupWithForm(selectors.popupAddNewCard, (item) => {
  const card = createNewCard(item);
  cardsList.addItem(card);
  addNewCardFormValidator.disableSubmitButton();
});
const userInfo = new UserInfo({ nameSelector: selectors.fieldUserName, descriptionSelector: selectors.fieldUserDescription });

// Функции
function createNewCard(item) {
  const cardElement = new Card(item, selectors.template, openImagePopup);
  const card = cardElement.generateCard();
  return card;
}

function openImagePopup(link, name) {
  popupWithImage.open(link, name);
}
// Слушатели
buttonOpenPopupProfile.addEventListener('click', () => {
  formEditValidator.resetErrors();
  const data = userInfo.getUserInfo();
  inputUserName.value = data.userName;
  inputAbout.value = data.userDescription;
  popupWithFormProfile.open();
});

buttonOpenPopupAddNewCard.addEventListener('click', () => {
  addNewCardFormValidator.resetErrors();
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

