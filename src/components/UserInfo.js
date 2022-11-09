export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }, api) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }
  initialUserInfo() {
    return this._api.getUserInfo()
    .then(data => {
      this._userName.textContent = data.name;
      this._userDescription.textContent = data.about;
      this._avatar.src = data.avatar;
    });
  }
  getUserInfo() {
    return this._api.getUserInfo();
  }
  setUserInfo(item) {
    return this._api.updateProfile(item)
      .then(data => {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.about;
      })
  }
  setUserAvatar(item) {
    return this._api.updateProfileAvatar(item).then(data => {
      this._avatar.src = item.avatar;
    })
  }
}

