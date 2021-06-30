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
            
            <input value={ name || '' } onChange={handleChangeName} type="text" id="input-name" className="popup__input popup__input_value_name" name="name" required minLength="2" maxLength="40" />
            <span className="popup__span input-name-error"></span>
            <input value={description || ''} onChange={handleChangeDescription} type="text" id="input-job" className="popup__input popup__input_value_job" name="job" required minLength="2" maxLength="200" />
            <span className="popup__span input-job-error"></span>
         
    </PopupWithForm>
    )
}