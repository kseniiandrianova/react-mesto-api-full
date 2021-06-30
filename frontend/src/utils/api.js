export default class Api {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (!res.ok ) {
        return Promise.reject(console.log(`Что-то пошло не так. Ошибка ${res.status}`));
    }
    return res.json();
  }

  getInitalCards(){
      return fetch(`${this._address}cards`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
        })
        .then(this._handleResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._address}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleResponse)
  }

  
  deleteCard(cardId){
    return fetch(`${this._address}cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
    })
    .then(this._handleResponse)
  }

  putLikes(cardId) {
    return fetch(`${this._address}cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
    })
    .then(this._handleResponse)
  }

  deleteLikes(cardId) {
    return fetch(`${this._address}cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
    })
    .then(this._handleResponse)
  }

  getProfileInfo() {
    return fetch(`${this._address}users/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
      })
      .then(this._handleResponse)
  }

  getInitialData() {
    return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
  }

  saveProfileInfo({name, description}) {
    return fetch(`${this._address}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._handleResponse)
  }

  saveAvatar({avatar}) {
    return fetch(`${this._address}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      avatar: avatar
      })
    })
    .then(this._handleResponse)
  }  

}

const config = {
  address: "http://localhost:3000/",
};

export const api = new Api(config);

