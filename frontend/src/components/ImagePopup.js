import React from "react";

export default function ImagePopup({card, onClose}) {
    function handleClickClose(evt) {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
    }
    return( 
          <section className={`popup popup_group_photo ${card && 'popup_opened'}`} onClick={handleClickClose}>
            <div className="popup__container">
            <button type='button' className="popup__close-button" onClick={onClose}></button>
            <img src={`${card?.link}`} alt={card?.name} className="popup__photo" />
            <h3 className="popup__name">{card?.name}</h3>
          </div>
        </section>
    )
}