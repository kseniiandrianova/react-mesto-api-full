import React from "react";

export default function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen} `}>
            <form className="popup__container popup__form" name={props.name} onSubmit={props.onSubmit}>
                <button className="popup__button-close popup__button-edit-close" type="reset" onClick={props.onClose}></button>
                <h2 className="popup__form-title">{props.title}</h2>
              {props.children}
                <button className="popup__button-save popup__button" type="submit">{props.submitText}</button>
            </form>
        </section>
    )
}