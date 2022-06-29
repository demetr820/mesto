const buttonEdit = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const inputUserName = popup.querySelector('.popup__input_user-name');
const inputAbout = popup.querySelector('.popup__input_description');
const form = popup.querySelector('.popup__container');
const buttonsLike = document.querySelectorAll('.places__like-button');
const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__description');

function popupShow() {
  inputUserName.value = userName.textContent;
  inputAbout.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}
function popupHide() {
  popup.classList.remove('popup_opened');
}
function formSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputAbout.value;
  popupHide();
}

buttonEdit.addEventListener('click', popupShow);
buttonClose.addEventListener('click', popupHide);
form.addEventListener('submit', formSubmit);
