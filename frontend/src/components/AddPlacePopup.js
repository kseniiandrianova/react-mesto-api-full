import React from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopap (props) {
    const nameRef = React.useRef('');
    const linkRef = React.useRef('');
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        })
    }


    return (
        <PopupWithForm 
        name="add-cards" 
        title="Новое место" 
        submitText="Создать" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleAddPlaceSubmit}>
    
        <input  ref={nameRef} type="text" id="input-place" className="popup__input popup__input_value_place" name="name" required minLength="2" maxLength="30" placeholder="Название" />
        <span className="popup__span input-place-error"></span>
        <input ref={linkRef} type="url" id="input-link" className="popup__input popup__input_value_link" name="link" required placeholder="Ссылка на картинку" />
        <span className="popup__span input-link-error"></span>   
        
    </PopupWithForm>
    )
}