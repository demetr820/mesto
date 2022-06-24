const buttonEdit = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const inputUserName = popup.querySelector('#user-name');
const inputAbout = popup.querySelector('#about');
const form = popup.querySelector('.popup__container');
const popupHide = () => {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', function() {
  const userName = document.querySelector('.profile__user-name');
  const userDescription = document.querySelector('.profile__description');
  inputUserName.value = userName.textContent;
  inputAbout.value = userDescription.textContent;
  popup.classList.add('popup_opened');
});
buttonClose.addEventListener('click', popupHide);
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const inputUserName = popup.querySelector('#user-name');
  const inputAbout = popup.querySelector('#about');
  const userName = document.querySelector('.profile__user-name');
  const userDescription = document.querySelector('.profile__description');
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputAbout.value;
  popupHide();
});
