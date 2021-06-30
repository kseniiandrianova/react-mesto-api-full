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
        <PopupWithForm name="edit-avatar" title="Обновить аватар" submitText="Сохранить" isOpen = {props.isOpen} onClose = {props.onClose} onSubmit = {handleSubmit}>
            <input type="url" ref = {avatarRef} id="input-avatar" className="popup__input popup__input_value-avatar_link" name="link" required placeholder="Ссылка на картинку" />
            <span className="popup__span input-avatar-error"></span>
   
    </PopupWithForm>
    )
}