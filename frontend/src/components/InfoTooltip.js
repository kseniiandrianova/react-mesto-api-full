import React from "react";


export default function InfoTooltip(props) {
    function handleClickClose(evt) {
        if (evt.target === evt.currentTarget) {
          props.onClose();
        }
    }
    return(
      <div>
            <div className={`popup popup__${props.stateNotice} ${props.isOpen}`}>
              <div className="popup__container" id="container1">
              <button type='button' className="popup__close-button" onClick={handleClickClose}></button>
                <form className="popup__form" name="InfoTooltipPositive">
                  <img src={props.image} alt='Успешная регистрация' className="popup__notice-image" />
                  <p className="popup__notice-title">{props.title}</p>
                </form>
              </div>
            </div>
        </div>
    )
}