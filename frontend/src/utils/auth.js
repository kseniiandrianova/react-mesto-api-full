export const BASE_URL = 'https://auth.nomoreparties.co';

 function handleResponse(res) {
  if (!res.ok ) {
      return Promise.reject(console.log(`Что-то пошло не так. Ошибка ${res.status}`));
      
  }
  
  return res.json();
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email  
      
     }),
  })
    .then(res => handleResponse(res));
};

export const authorize = ( data ) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ 
      password: data.password,
      email: data.email 
    }),
  })
    .then(res => handleResponse(res))
    .then((data) => data);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
  .then(data => data)
}