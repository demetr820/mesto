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
  popupCloseButton: '.popup__button-close',
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
}
// Попапы
const popupCardEdit = document.querySelector(selectors.popupCardEdit);
const popupImage = document.querySelector(selectors.popupImage);
const popupAddNewCard = document.querySelector(selectors.popupAddNewCard);
// Кнопки
const editProfileButton = document.querySelector(selectors.editProfileButton);
const popupCloseButton = document.querySelectorAll(selectors.popupCloseButton);
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
const addNewCardButton = document.querySelector(selectors.addNewCardButton);
const ImageInPicturePopup = document.querySelector(selectors.ImageInPicturePopup);
const popupImageTitle = document.querySelector(selectors.popupImageTitle);

function popupShow(popup) {
  popup.classList.add('popup_opened');
}
function popupHide(popup) {
  popup.classList.remove('popup_opened');
}
// Функция создания карточки
function createCard(item) {
  const card = document.querySelector('.templates').content.cloneNode(true);
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
  popupShow(popupImage);
}
popupCloseButton.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    popupHide(popup);
  });
});
editProfileButton.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputAbout.value = userDescription.textContent;
  popupShow(popupCardEdit);
});
addNewCardButton.addEventListener('click', () => {
  popupShow(popupAddNewCard);
});
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  const popup = e.target.closest('.popup');
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputAbout.value;
  popupHide(popup);
});
formAddNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const popup = e.target.closest('.popup');
  const item = {
    name: formAddNewCardInputName.value,
    link: formAddNewCardInputLink.value,
  };
  console.log(item);
  const card = createCard(item);
  formAddNewCardInputName.value = '';
  formAddNewCardInputLink.value = '';
  addItemToContainer(card, cardsContainer);
  popupHide(popup);
});
createInitialCards();
