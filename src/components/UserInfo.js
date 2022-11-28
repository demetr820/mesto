export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const data = {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
    }
    return data;
  }
  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userDescription.textContent = item.about;
    this._avatar.src = item.avatar;
  }
  setUserAvatar(item) {
    this._avatar.src = item.avatar;
  }
}

