export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    this._userInfo = {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    };
    return this._userInfo;
  }
  setUserInfo(userName, userDescription) {
    this._userName.textContent = userName;
    this._userDescription.textContent = userDescription;
  }
}
