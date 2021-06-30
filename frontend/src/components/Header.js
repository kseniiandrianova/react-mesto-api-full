import '../index.css';
import logo from "../images/header.svg";
import menu from "../images/menu.svg";
import Close from "../images/CloseIcon.svg";
import React from "react";
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
  return (
    <Switch>
      <Route path='/signup'>
        <header className="header">
          <img src={logo} alt="логотип 'Место'" className="header__logo" />
          <Link to='/signin' className="header__state">Вход</Link>
        </header>
      </Route>
      <Route path='/signin'>
        <header className="header">
          <img src={logo} alt="логотип 'Место'" className="header__logo" />  
          <Link to='/signup' className="header__state">Регистрация</Link>
        </header>
      </Route>
      <Route path='/mesto'>
        <div className={`header__popup ${props.isOpen}`}>
          <p className='header__popup-email'>{props.emailData.email}</p>
          <button onClick={props.onLogout} className="header__popup-button">Выход</button>
        </div>
        <header className="header">
          <img src={logo} alt="логотип 'Место'" className="header__logo" />
          <div className='header__navbar'>
          <p className='header__email'>{props.emailData.email}</p>
          <button type='button' onClick={props.onMenu} className={`header__menu-button ${props.isMenuIcon}`}><img src={menu} alt='Меню' /></button>
          <button type='button' onClick={props.onClose} className={`header__close-button ${props.isMenuCloseIcon}`}><img src={Close} alt='Крестик' /></button>
          <button onClick={props.onLogout} className="header__button">Выход</button>
          </div>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
