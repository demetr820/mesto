const selectors = {
  // Попапы
  popupCardEdit: '.popup-profile',
  popupImage: '.popup-image',
  popupAddNewCard: '.popup-card-add',
  // Контейнеры
  cardsContainer: '.places',
  imageContainer: '.popup__container_image',
  // Формы
  formEditProfile: '.popup__form_type_edit',
  formAddNewCard: '.popup__form_type_add',
  // Кнопки
  popupCloseButtons: '.popup__button-close',
  editProfileButton: '.profile__button_edit',
  addNewCardButton: '.profile__button_add',
  // Поля ввода
  inputUserName: '.popup__input_type_user-name',
  inputAbout: '.popup__input_type_description',
  formAddNewCardInputName: '.popup__input_type_name',
  formAddNewCardInputLink: '.popup__input_type_link',
  ImageInPicturePopup: '.popup-image__picture',
  popupImageTitle: '.popup-image__title',
  userName: '.profile__user-name',
  userDescription: '.profile__description',
  template: '.templates',
}
// Попапы
const popupCardEdit = document.querySelector(selectors.popupCardEdit);
const popupImage = document.querySelector(selectors.popupImage);
const popupAddNewCard = document.querySelector(selectors.popupAddNewCard);
// Кнопки
const editProfileButton = document.querySelector(selectors.editProfileButton);
const popupCloseButtons = document.querySelectorAll(selectors.popupCloseButtons);
// Поля ввода
const inputUserName = popupCardEdit.querySelector(selectors.inputUserName);
const inputAbout = popupCardEdit.querySelector(selectors.inputAbout);
// Формы
const formEditProfile = document.querySelector(selectors.formEditProfile);
const formAddNewCard = document.querySelector(selectors.formAddNewCard);
const userName = document.querySelector(selectors.userName);
const userDescription = document.querySelector(selectors.userDescription);
const formAddNewCardInputName = formAddNewCard.querySelector(selectors.formAddNewCardInputName);
const formAddNewCardInputLink = formAddNewCard.querySelector(selectors.formAddNewCardInputLink);
const cardsContainer = document.querySelector(selectors.cardsContainer);
const template = document.querySelector(selectors.template).content;
const addNewCardButton = document.querySelector(selectors.addNewCardButton);
const ImageInPicturePopup = document.querySelector(selectors.ImageInPicturePopup);
const popupImageTitle = document.querySelector(selectors.popupImageTitle);
function showPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByOverlayClick);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePopup(popup);
    }
  });
}
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}
// Функция создания карточки
function createCard(item) {
  const card = template.cloneNode(true);
  const title = card.querySelector('.places__title');
  const image = card.querySelector('.places__image');
  const buttonDelete = card.querySelector('.places__button-delete');
  const buttonLike = card.querySelector('.places__like-button');
  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  buttonDelete.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('places__like-button_active');
  });
  image.addEventListener('click', (e) => {
    const name = e.target.alt;
    const link = e.target.src;
    openImage(name, link);
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
  ImageInPicturePopup.src = link;
  ImageInPicturePopup.alt = name;
  popupImageTitle.textContent = name;
  showPopup(popupImage);
}
function closePopupByOverlayClick(e) {
  const popup = e.currentTarget;
  if (e.currentTarget !== e.target) return;
  hidePopup(popup);
  popup.removeEventListener('click', closePopupByOverlayClick);
}
popupCloseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    hidePopup(popup);
  });
});
editProfileButton.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputAbout.value = userDescription.textContent;
  showPopup(popupCardEdit);
});
addNewCardButton.addEventListener('click', () => {
  formAddNewCard.reset();
  showPopup(popupAddNewCard);
});
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const isValid = form.checkValidity();
  if (isValid) {
    const popup = e.target.closest('.popup');
    userDescription.textContent = inputAbout.value;
    hidePopup(popup);
  } else {
    console.log('Form is not valid!');
  }
});
formAddNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const isValid = form.checkValidity();
  if (isValid) {
    const popup = e.target.closest('.popup');
    const item = {
      name: formAddNewCardInputName.value,
      link: formAddNewCardInputLink.value,
    };
    const card = createCard(item);
    formAddNewCard.reset();
    addItemToContainer(card, cardsContainer);
    hidePopup(popup);
  } else {
    console.log('Form is not valid!');
  }
});
createInitialCards();



