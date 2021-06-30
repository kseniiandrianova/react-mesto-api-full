import React from "react";
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup (props) {
    const avatarRef = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }
    return (
        <PopupWithForm 
        name="edit-avatar" 
        title="Обновить аватар" 
        submitText="Сохранить" 
        isOpen = {props.isOpen} 
        onClose = {props.onClose} 
        onSubmit = {handleSubmit}
        >
            <input ref = {avatarRef} id="card-link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_photo" name="card-link" required />
            <span className="error" id="card-link-error"></span>
   
    </PopupWithForm>
    )
}