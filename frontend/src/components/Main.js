import React from "react";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
                <section className="profile">
                    <button className="profile__change-btn" type="button" onClick={props.onEditAvatar}>
                    <img className="profile__pic"  src={currentUser.avatar} alt="Фото профиля" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        </div>
                        <h2 className="profile__description">{currentUser.about}</h2>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                        {props.cards.map((card) => {
                         return(
                            <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike = {props.onCardLike} onCardDelete = {props.onCardDelete} />
                        )  
                        } )}
                    
                </section>
            </main>
    )
}