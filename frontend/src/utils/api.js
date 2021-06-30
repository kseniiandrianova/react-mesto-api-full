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

 
  
    getInitalCards(){
        return fetch(`${this._url}cards`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
          })
          .then(this._handleResponse)
    }

    getProfileInfo() {
      return fetch(`${this._url}users/me`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        })
        .then(this._handleResponse)
    }
    
    getInitialData() {
      return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
    }
    addCard({name, link}) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._handleResponse)
    }
  
    
    deleteCard(cardId){
      return fetch(`${this._url}cards/${cardId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
      })
      .then(this._handleResponse)
    }
  
  
    addLike(cardId) {
      return fetch(`${this._url}cards/likes/${cardId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
      })
      .then(this._handleResponse)
    }
  
    deleteLike(cardId) {
      return fetch(`${this._url}cards/likes/${cardId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
      })
      .then(this._handleResponse)
    }
  
    saveProfileInfo({name, description}) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          name: name,
          about: description
        })
      })
      .then(this._handleResponse)
    }
  
    saveAvatar({avatar}) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
        avatar: avatar
        })
      })
      .then(this._handleResponse)
    }  
  
  }
  
   export const api = new Api({
    url:"http://localhost:3000/",
  });