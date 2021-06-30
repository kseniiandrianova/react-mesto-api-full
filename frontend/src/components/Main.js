
import React from "react";
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {

  const currentUserContext = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" type = "button" onClick={props.onEditAvatar}>
          <img src={currentUserContext.avatar} alt="Фото профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserContext.name}</h1>
          <button type='button' className="profile__info-btn" onClick={props.onEditProfile}></button>
          <p className="profile__job">{currentUserContext.about}</p>
        </div>
        <button type='button' className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">

      {props.cards.map((card) => {
                         return(
                            <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike = {props.onCardLike} onCardDelete = {props.onCardDelete} />
                        )  
                        } )}
                        
      </section>
    </main>
  );
}

export default Main;
