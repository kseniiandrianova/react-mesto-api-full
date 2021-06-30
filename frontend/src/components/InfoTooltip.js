import React from 'react';
import iconCorrect from '../images/icon-correct.svg';
import iconUncorrect from '../images/icon-uncorrect.svg';



export default function infoTooltip(props) {

    return (
        <section className={`popup popup_${props.name} ${props.isOpen}`}>
         <div className="popup__container">
            <form className="popup__form" name="infoTooltip" onSubmit={props.onSubmit}>
                <button className="popup__button-close popup__button-edit-close" type="reset" onClick={props.onClose}></button>
                <img className="popup__icon" src={props.loggedIn ? iconUncorrect  : iconCorrect } alt="Статус регистрации" />
                <h2 className="popup__title_info">{props.loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
              {props.children}
            </form>
        </div>
        </section>
        
    )
};