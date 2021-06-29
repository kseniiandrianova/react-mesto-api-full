export const BASE_URL = 'https://api.kseniiamesto.students.nomoredomains.monster/';

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
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password
      
     }),
  })
    .then(res => handleResponse(res));
};

export const authorize = ( data ) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: 'POST',
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
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
    },
    credentials: "include",
  })
  .then(res => handleResponse(res))
  .then(data => data)
}