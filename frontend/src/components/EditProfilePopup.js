import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
         description,
        });
      }
      function handleChangeName(e) {
        setName(e.target.value)
      }
    
      function handleChangeDescription(e) {
        setDescription(e.target.value)
      }

    

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" submitText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            
                <input value={name || ''} onChange={handleChangeName} id="profile-name" type="text"  className="popup__input popup__input_name" name="profile-name" minLength="2"
                maxLength="40" required />
                <span className="error" id="profile-name-error"></span>
                <input value={description || ''} onChange={handleChangeDescription} id="profile-description" type="text" className="popup__input popup__input_description" name="profile-description" minLength="2"
                maxLength="200" required />
                <span className="error" id="profile-description-error"></span>
         
    </PopupWithForm>
    )
}