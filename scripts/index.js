import Card from './Card.js';
import { initialCards, popupCardEdit, popupImage, popupAddNewCard, popups, inputUserName, inputAbout, formEditProfile, formAddNewCard, formEditValidator, addNewCardFormValidator, buttonOpenPopupProfile, buttonSubmitInFormAddNewCard, buttonsClosePopup, fieldUserName, fieldUserDescription, inputNameInformAddNewCard, inputLinkInformAddNewCard, cardsContainer, buttonOpenPopupAddNewCard, imageInPicturePopup, titleInPopupImage, selectors } from './consts.js';

// Функции
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscClick);
}
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscClick);
}
function closePopupByOverlayClick(e) {
  const popup = e.target.closest('.popup');
  if (e.currentTarget !== e.target) {
    return;
  }
  hidePopup(popup);
}
function closePopupByEscClick(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}
function openPopupProfile() {
  formEditValidator.resetErrors();
  inputUserName.value = fieldUserName.textContent;
  inputAbout.value = fieldUserDescription.textContent;
  showPopup(popupCardEdit);
}
function openPopupAddNewCard() {
  addNewCardFormValidator.resetErrors();
  showPopup(popupAddNewCard);
}
function openImage(name, link) {
  imageInPicturePopup.src = link;
  imageInPicturePopup.alt = name;
  titleInPopupImage.textContent = name;
  showPopup(popupImage);
}
function addItemToContainer(card, container, place) {
  if (place === 'append'){
    container.append(card);
  } else if (place === 'prepend') {
    container.prepend(card);
  }
}

function setProfileValue(e) {
  e.preventDefault();
  fieldUserName.textContent = inputUserName.value;
  fieldUserDescription.textContent = inputAbout.value;
  hidePopup(popupCardEdit);
}
function createCard(item) {
  const cardElement = new Card(item, selectors.template, openImage);
  const card = cardElement.generateCard();
  return card;
}
function addNewCard(e) {
  e.preventDefault();
  const item = {
    name: inputNameInformAddNewCard.value,
    link: inputLinkInformAddNewCard.value,
  };
  const card = createCard(item);
  addItemToContainer(card, cardsContainer, 'prepend');
  hidePopup(popupAddNewCard);
  formAddNewCard.reset();
  addNewCardFormValidator.disableSubmitButton(buttonSubmitInFormAddNewCard);
}
// Слушатели
buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    hidePopup(popup);
  });
});
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);

buttonOpenPopupAddNewCard.addEventListener('click', openPopupAddNewCard);

formEditProfile.addEventListener('submit', setProfileValue);

formAddNewCard.addEventListener('submit', addNewCard);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayClick);
});

initialCards.forEach(item => {
  const card = createCard(item);
  addItemToContainer(card, cardsContainer, 'append');
});

formEditValidator.enableValidation();
addNewCardFormValidator.enableValidation();
