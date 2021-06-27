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
    
                <input  ref={nameRef} id="card-name" type="text" placeholder="Название" className="popup__input popup__input_name-card" name="card-name" minLength="2"
                maxLength="30" required />
                <span className="error" id="card-name-error"></span>
                <input  ref={linkRef} id="card-picture" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link" name="card-link" required />
                <span className="error" id="card-error"></span>
        
    </PopupWithForm>
    )
}