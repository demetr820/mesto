import FormValidator  from './FormValidator.js';
export const selectors = {
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
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
};
export const initialCards = [
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
export const popupCardEdit = document.querySelector(selectors.popupCardEdit);
export const popupImage = document.querySelector(selectors.popupImage);
export const popupAddNewCard = document.querySelector(selectors.popupAddNewCard);
export const popups = document.querySelectorAll(selectors.popups);

// Поля ввода
export const inputUserName = popupCardEdit.querySelector(selectors.inputUserName);
export const inputAbout = popupCardEdit.querySelector(selectors.inputAbout);
// Формы
export const formEditProfile = document.querySelector(selectors.formEditProfile);
export const formAddNewCard = document.querySelector(selectors.formAddNewCard);
// Валидация форм
export const formEditValidator = new FormValidator(config, formEditProfile);
export const addNewCardFormValidator = new FormValidator(config, formAddNewCard);
// Кнопки
export const buttonOpenPopupProfile = document.querySelector(
  selectors.buttonOpenPopupProfile
);
export const buttonSubmitInFormAddNewCard = formAddNewCard.querySelector(selectors.buttonSubmit);
export const buttonsClosePopup = document.querySelectorAll(
  selectors.buttonsClosePopup
);
export const fieldUserName = document.querySelector(selectors.fieldUserName);
export const fieldUserDescription = document.querySelector(
  selectors.fieldUserDescription
);
export const inputNameInformAddNewCard = formAddNewCard.querySelector(
  selectors.inputNameInformAddNewCard
);
export const inputLinkInformAddNewCard = formAddNewCard.querySelector(
  selectors.inputLinkInformAddNewCard
);
export const cardsContainer = document.querySelector(selectors.cardsContainer);
export const buttonOpenPopupAddNewCard = document.querySelector(
  selectors.buttonOpenPopupAddNewCard
);
export const imageInPicturePopup = document.querySelector(
  selectors.imageInPicturePopup
);
export const titleInPopupImage = document.querySelector(selectors.titleInPopupImage);



