export default class Api {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  _handleResponse(res) {
    if (!res.ok ) {
        return Promise.reject(console.log(`Что-то пошло не так. Ошибка ${res.status}`));
    }
    return res.json();
}

  getInitalCards(token){
      return fetch(`${this._url}cards`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        .then(this._handleResponse)
  }

  addCard({name, link}, token) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleResponse)
  }

  
  deleteCard(cardId, token){
    return fetch(`${this._url}cards/${cardId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
    .then(this._handleResponse)
  }


  addLike(cardId, token) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
    .then(this._handleResponse)
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
    .then(this._handleResponse)
  }

  getProfileInfo(token) {
    return fetch(`${this._url}users/me`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(this._handleResponse)
  }

  getInitialData() {
    return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
  }

  saveProfileInfo({name, description}, token) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._handleResponse)
  }

  saveAvatar({avatar}, token) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
      avatar: avatar
      })
    })
    .then(this._handleResponse)
  }  

}

 export const api = new Api({
  url:"https://api.kseniiamesto.students.nomoredomains.monster/",
});