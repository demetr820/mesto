import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const selectors = {
  // Попапы
  popupCardEdit: '.popup-profile',
  popupImage: '.popup-image',
  popupAddNewCard: '.popup-card-add',
  popups: '.popup',
  // Контейнеры
  cardsContainer: '.places',
  imageContainer: '.popup__container_image',
  // Формы
  formEditProfile: '.popup__form[name="edit-form"]',
  formAddNewCard: '.popup__form[name="form-add-card"]',
  // Кнопки
  buttonsClosePopup: '.popup__button-close',
  buttonOpenPopupProfile: '.profile__button_edit',
  buttonOpenPopupAddNewCard: '.profile__button_add',
  buttonSubmit: '.popup__button-submit',
  // Поля ввода
  inputUserName: '.popup__input_type_user-name',
  inputAbout: '.popup__input_type_description',
  inputNameInformAddNewCard: '.popup__input_type_name',
  inputLinkInformAddNewCard: '.popup__input_type_link',
  imageInPicturePopup: '.popup-image__picture',
  titleInPopupImage: '.popup-image__title',
  fieldUserName: '.profile__user-name',
  fieldUserDescription: '.profile__description',
  template: '.templates',
};
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
};
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Попапы
const popupCardEdit = document.querySelector(selectors.popupCardEdit);
const popupImage = document.querySelector(selectors.popupImage);
const popupAddNewCard = document.querySelector(selectors.popupAddNewCard);
const popups = document.querySelectorAll(selectors.popups);

// Поля ввода
const inputUserName = popupCardEdit.querySelector(selectors.inputUserName);
const inputAbout = popupCardEdit.querySelector(selectors.inputAbout);
// Формы
const formEditProfile = document.querySelector(selectors.formEditProfile);
const formAddNewCard = document.querySelector(selectors.formAddNewCard);
// Валидация форм
const validateEditForm = new FormValidator(config, formEditProfile);
const validateAddNewCardForm = new FormValidator(config, formAddNewCard);
// Кнопки
const buttonOpenPopupProfile = document.querySelector(
  selectors.buttonOpenPopupProfile
);
const buttonSubmitInFormAddNewCard = formAddNewCard.querySelector(selectors.buttonSubmit);
const buttonsClosePopup = document.querySelectorAll(
  selectors.buttonsClosePopup
);
const fieldUserName = document.querySelector(selectors.fieldUserName);
const fieldUserDescription = document.querySelector(
  selectors.fieldUserDescription
);
const inputNameInformAddNewCard = formAddNewCard.querySelector(
  selectors.inputNameInformAddNewCard
);
const inputLinkInformAddNewCard = formAddNewCard.querySelector(
  selectors.inputLinkInformAddNewCard
);
const cardsContainer = document.querySelector(selectors.cardsContainer);
const buttonOpenPopupAddNewCard = document.querySelector(
  selectors.buttonOpenPopupAddNewCard
);
const imageInPicturePopup = document.querySelector(
  selectors.imageInPicturePopup
);
const titleInPopupImage = document.querySelector(selectors.titleInPopupImage);


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
  validateEditForm.resetErrors();
  inputUserName.value = fieldUserName.textContent;
  inputAbout.value = fieldUserDescription.textContent;
  showPopup(popupCardEdit);
}
function openPopupAddNewCard() {
  validateAddNewCardForm.resetErrors();
  showPopup(popupAddNewCard);
}
function openImage(name, link) {
  imageInPicturePopup.src = link;
  imageInPicturePopup.alt = name;
  titleInPopupImage.textContent = name;
  showPopup(popupImage);
}
function addItemToContainer(card, container) {
  container.prepend(card);
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
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  fieldUserName.textContent = inputUserName.value;
  fieldUserDescription.textContent = inputAbout.value;
  hidePopup(popupCardEdit);
});
formAddNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = {
    name: inputNameInformAddNewCard.value,
    link: inputLinkInformAddNewCard.value,
  };
  const cardElement = new Card(item, '.templates', openImage);
  const card = cardElement.generateCard();

  addItemToContainer(card, cardsContainer);
  hidePopup(popupAddNewCard);
  formAddNewCard.reset();
  validateAddNewCardForm.disableSubmitButton(buttonSubmitInFormAddNewCard);
});
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayClick);
});

initialCards.forEach(item => {
  const cardElement = new Card(item, '.templates', openImage);
  const card = cardElement.generateCard();
  document.querySelector('.places').append(card);
});

validateEditForm.enableValidation();
validateAddNewCardForm.enableValidation();
