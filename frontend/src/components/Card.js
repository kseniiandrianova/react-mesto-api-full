import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button_active ${isOwn ? 'element__button-delete' : 'element__button-delete_visible'}`
      ); 
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    return(
            <article className="element" id={props.id}>
                <button type="button" className={cardDeleteButtonClassName} onClick = {handleDeleteClick} />
                <img className="element__image" alt={props.card.name} src={`${props.card.link}`} onClick={handleClick} />
                <div className="element__box">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like_box">
                        <button type="button" className={cardLikeButtonClassName} onClick = {handleLikeClick} />
                        <span className="element__counter">{props.card.likes.length}</span>
                    </div>
                    
                </div>
            </article>
            
    )
}