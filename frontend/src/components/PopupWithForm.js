import React from "react";

export default function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen}`}>
        <div className="popup__container">
          <button type='button' className="popup__close-button" onClick={props.onClose}></button>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
              {props.children}
            <button type="submit" className="popup__button">{props.submitText}</button>
          </form>
        </div>
        </div>
    
    )
}