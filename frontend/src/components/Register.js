import { Link } from 'react-router-dom';
import React from 'react';

export default function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({email, password})
    }

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form " name="register-form" onSubmit={handleSubmit}>
                <input id="email" name="email" type="email" className="register__input" autoComplete="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                <input  id="password" name="password" type="password" className="register__input register__input_password" placeholder="Пароль" autoComplete="new-password" value={password} onChange={handlePasswordChange} required />
                <button className="register__button" type="submit">Зарегистрироваться</button>
                <Link className="register__login " to="/singin">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}
