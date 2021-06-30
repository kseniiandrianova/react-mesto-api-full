export const BASE_URL = 'http://localhost:3000';

function handleResponse(res) {
  if (!res.ok ) {
      console.log(res);
      return Promise.reject(console.log(`Что-то пошло не так. Ошибка ${res.status}`));
    }
  return res.json();
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: data.password,
      email: data.email
     })
  }).then((res) => handleResponse(res));
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: data.password,
      email: data.email  
     })
  }).then((res) => handleResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((response) => handleResponse(response))
    .then((data) => data);
};
