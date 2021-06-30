import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData.password.length > 16) {
      return setMessage('Пароль слишком длинный!');
    }
    onRegister(registerData);
  };

  return (
    
    <section className = 'register'>
      <div>
        <h2 className='register__title'>Регистрация</h2>
        <form className="register__form" onSubmit={handleSubmit}>
        <input type="email"  id="email" name="email" autoComplete="email" value={ registerData.email } onChange={ handleChange } className="register__input register__input_value_email" placeholder='E-mail' />
        <span className="register__span input-email-error"></span>
        <input type="password" id="password" name="password" value={ registerData.password } onChange={ handleChange } className="register__input register__input_value_password" placeholder='Пароль' autoComplete="new-password" minLength="2" maxLength="40" />
        <span className="register__span input-password-error"></span>
        <button type="submit" className="register__button" >Зарегестрироваться</button>
        </form>
      </div>
      <div>
        <p className='register__subtitle'>Уже зарегистрированы? <Link to="/signin" className='register__link' >Войти</Link></p>
      </div>
    </section>
  );
}


export default Register;
