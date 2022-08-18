const selectors = {
  // Попапы
  popupCardEdit: ".popup-profile",
  popupImage: ".popup-image",
  popupAddNewCard: ".popup-card-add",
  popups: ".popup",
  // Контейнеры
  cardsContainer: ".places",
  imageContainer: ".popup__container_image",
  // Формы
  formEditProfile: '.popup__form[name="edit-form"]',
  formAddNewCard: '.popup__form[name="form-add-card"]',
  // Кнопки
  buttonsClosePopup: ".popup__button-close",
  buttonOpenPopupProfile: ".profile__button_edit",
  buttonOpenPopupAddNewCard: ".profile__button_add",
  // Поля ввода
  inputUserName: ".popup__input_type_user-name",
  inputAbout: ".popup__input_type_description",
  inputNameInformAddNewCard: ".popup__input_type_name",
  inputLinkInformAddNewCard: ".popup__input_type_link",
  imageInPicturePopup: ".popup-image__picture",
  titleInPopupImage: ".popup-image__title",
  fieldUserName: ".profile__user-name",
  fieldUserDescription: ".profile__description",
  template: ".templates",
};
// Попапы
const popupCardEdit = document.querySelector(selectors.popupCardEdit);
const popupImage = document.querySelector(selectors.popupImage);
const popupAddNewCard = document.querySelector(selectors.popupAddNewCard);
const popups = document.querySelectorAll(selectors.popups);
// Кнопки
const buttonOpenPopupProfile = document.querySelector(
  selectors.buttonOpenPopupProfile
);
const buttonsClosePopup = document.querySelectorAll(
  selectors.buttonsClosePopup
);
// Поля ввода
const inputUserName = popupCardEdit.querySelector(selectors.inputUserName);
const inputAbout = popupCardEdit.querySelector(selectors.inputAbout);
// Формы
const formEditProfile = document.querySelector(selectors.formEditProfile);
const formAddNewCard = document.querySelector(selectors.formAddNewCard);
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
const template = document.querySelector(selectors.template);
const buttonOpenPopupAddNewCard = document.querySelector(
  selectors.buttonOpenPopupAddNewCard
);
const imageInPicturePopup = document.querySelector(
  selectors.imageInPicturePopup
);
const titleInPopupImage = document.querySelector(selectors.titleInPopupImage);
// Функции
function showPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscClick);
}
function hidePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscClick);
}
// Функция создания карточки
function createCard(item) {
  const card = template.content.cloneNode(true);
  const title = card.querySelector(".places__title");
  const image = card.querySelector(".places__image");
  const buttonDelete = card.querySelector(".places__button-delete");
  const buttonLike = card.querySelector(".places__like-button");
  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  buttonDelete.addEventListener("click", (e) => {
    e.target.parentNode.remove();
  });
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("places__like-button_active");
  });
  image.addEventListener("click", (e) => {
    openImage(item.name, item.link);
  });
  return card;
}
function addItemToContainer(item, container) {
  container.prepend(item);
}
function createInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);
    addItemToContainer(card, cardsContainer);
  });
}
function openImage(name, link) {
  imageInPicturePopup.src = link;
  imageInPicturePopup.alt = name;
  titleInPopupImage.textContent = name;
  showPopup(popupImage);
}
function closePopupByOverlayClick(e) {
  const popup = e.target.closest(".popup");
  if (e.currentTarget !== e.target) {
    return;
  }
  hidePopup(popup);
}
function closePopupByEscClick(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    hidePopup(popup);
  }
}
function resetErrorMessages(form) {
  const inputsError = Array.from(
    form.querySelectorAll(".popup__input_type_error")
  );
  if (inputsError.length !== 0) {
    inputsError.forEach((item) => {
      item.textContent = "";
      item.classList.remove("popup__input_type_error");
      item.nextElementSibling.textContent = "";
      item.nextElementSibling.classList.remove("popup__error_visible");
    });
  }
}
function checkButtonSubmitState(form) {
  const button = form.querySelector(".popup__button-submit");
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove("popup__button-submit_disabled");
  } else {
    button.setAttribute("disabled", true);
    button.classList.add("popup__button-submit_disabled");
  }
}
function openPopupProfile() {
  resetErrorMessages(formEditProfile);
  inputUserName.value = fieldUserName.textContent;
  inputAbout.value = fieldUserDescription.textContent;
  checkButtonSubmitState(formEditProfile);
  showPopup(popupCardEdit);
}
function openPopupAddNewCard() {
  formAddNewCard.reset();
  checkButtonSubmitState(formAddNewCard);
  resetErrorMessages(formAddNewCard);
  showPopup(popupAddNewCard);
}
// Слушатели
buttonsClosePopup.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    hidePopup(popup);
  });
});
buttonOpenPopupProfile.addEventListener("click", openPopupProfile);
buttonOpenPopupAddNewCard.addEventListener("click", openPopupAddNewCard);
formEditProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const popup = e.target.closest(".popup");
  fieldUserName.textContent = inputUserName.value;
  fieldUserDescription.textContent = inputAbout.value;
  hidePopup(popup);
});
formAddNewCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const popup = e.target.closest(".popup");
  const item = {
    name: inputNameInformAddNewCard.value,
    link: inputLinkInformAddNewCard.value,
  };
  const card = createCard(item);
  formAddNewCard.reset();
  addItemToContainer(card, cardsContainer);
  hidePopup(popup);
});
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlayClick);
});

createInitialCards();
