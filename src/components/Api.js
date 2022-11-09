export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._header = options.headers;
    this._id = options.id;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._header })
      .then(response => this._checkResponse(response))
      .catch(err => Promise.reject(err));
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._header })
      .then(response => this._checkResponse(response))
      .catch(err => Promise.reject(err));
  }
  createCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify(item)
    })
    .then(response => this._checkResponse(response))
    .catch(err => Promise.reject(err));
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._header
    })
    .then(response => this._checkResponse(response))
    .catch(err => Promise.reject(err));
  }
  updateProfile(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'authorization': 'e91cfcf8-46ae-42f5-a621-5b5a6218f23b',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    })
    .then(response => this._checkResponse(response))
    .catch(err => Promise.reject(err));
  }
  updateProfileAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'authorization': 'e91cfcf8-46ae-42f5-a621-5b5a6218f23b',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    })
    .then(response => this._checkResponse(response))
    .catch(err => Promise.reject(err));
  }
  handleLike(id, isLiked) {
    if (isLiked === false) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          'authorization': 'e91cfcf8-46ae-42f5-a621-5b5a6218f23b',
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(response => this._checkResponse(response))
      .catch(err => Promise.reject(err));
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          'authorization': 'e91cfcf8-46ae-42f5-a621-5b5a6218f23b',
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(response => this._checkResponse(response))
      .catch(err => Promise.reject(err));
    }
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }
}

