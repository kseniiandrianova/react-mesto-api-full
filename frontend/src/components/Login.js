import React, { useState } from "react";


function Login({onLogin}) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

    const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!loginData.email || !loginData.password){
        return;
      }

      onLogin(loginData);

      // auth.authorize(loginData.email, loginData.password)
      // .then((data) => {
      //   if (data.jwt){
      // setState({email: '', password: ''},() => {
      // props.handleLogin();
      // props.history.push('/');
      // })
      // }
      // })
      // .catch(err => console.log(err));
    }

      return(
    <section className = 'login'>
      <div>
        <h2 className='login__title'>Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
        <input type="email"  id="email" name="email" autoComplete="email" value={ loginData.email } onChange={ handleChange } className="login__input login__input_value_email" placeholder='E-mail' />
        <span className="login__span input-email-error"></span>
        <input type="password" id="password" name="password" value={ loginData.password } onChange={ handleChange } className="login__input login__input_value_password" placeholder='Пароль' autoComplete="new-password" minLength="2" maxLength="40" />
        <span className="login__span input-password-error"></span>
        <button type="submit" className="login__button">Вход</button>
        </form>
      </div>
    </section>
  );
}


export default Login;
