import '../index.css';
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api.js'; 
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute';
import Union from "../images/Union.svg";
import Union1 from "../images/Union1.svg";


function App() {




    const history = useHistory();




    const [isMenuOpened, setMenuOpened] = useState(false);
    const [isMenuIcon, setMenuIconOpen] = useState(false);
    const [isMenuCloseIcon, setMenuCloseIconOpen] = useState(false);
    const [isInfoTooltipPositivePopupOpen, setInfoTooltipPositivePopupOpen] = useState(false);
    const [isInfoTooltipNegativePopupOpen, setInfoTooltipNegativePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isNotice, setNoticeState] = useState(false);

    const [loggedIn, setIsLoggedIn] = React.useState(false);


    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [userInfo, setUserInfo] = useState({email: ''});
    


    React.useEffect( () => {
      Promise.all([
          api.getInitalCards(),
          api.getProfileInfo()
      ])
         .then((result ) => {
          const [cardData, userData] = result;
          setCurrentUser(userData);
          setCards(cardData);
         })
          .catch((err) => {
              console.log(err)
          })
  }, [])

    
      function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
      }

      function handleMenuClick() {
        setMenuOpened(true);
        setMenuIconOpen(true);
        setMenuCloseIconOpen(true);
      }

      function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
      }

      function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
      }

      function handleCardClick(card) {
        setSelectedCard(card);
      }

      function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setInfoTooltipPositivePopupOpen(false);
        setInfoTooltipNegativePopupOpen(false);
        setMenuOpened(false);
        setMenuIconOpen(false);
        setMenuCloseIconOpen(false);
        setSelectedCard(null);
      }

      function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (!isLiked) {
          api.putLikes(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err)
          });
        } else {
          api.deleteLikes(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err)
          });
        }
        
        }

      function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards
        .filter(item => item._id !== card._id))
        })
        .catch((err) => {
          console.log(err)
        })
      }
      
      function handleUpdateUser(e) {
        api.saveProfileInfo(e)
        .then((userData) => {
          setCurrentUser(userData)
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err)
        })
      }
      
      function handleUpdateAvatar(userData) {
        api.saveAvatar(userData)
        .then((result) => {
          setCurrentUser(result);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err)
        })
      }
      function handleAddPlace(cardData) {
        api.addCard(cardData)
        .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      tokenCheck();
    }, []);
    
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth
        .getContent(jwt)
        .then((res) => {
          if(res){
            const email = res.email;
            setUserInfo({email});
            setIsLoggedIn(true);
            history.push('/mesto'); 
          }
        })
        .catch((err) => {
          console.log(err)
      });
      }
      
    };
  
    const onLogin = (data) => {
      return auth
        .authorize(data)
        .then((res) => {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setUserInfo(data);
          tokenCheck();
          history.push('/mesto');
        })
        .catch((err) => {
          console.log(err)
        });
      };

    const onLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('jwt');
      history.push('/signup');
    };

    function onRegister(data) {
      return auth
      .register(data)
      .then((res) => {
        if(res) {
          history.push('/signin');
          setInfoTooltipPositivePopupOpen(true);
          setNoticeState(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipNegativePopupOpen(true)
        setNoticeState(false);
      })
    }
    

  return (
    <CurrentUserContext.Provider value={ currentUser }>
    <div className="page">
    <Header emailData={userInfo} onLogout={onLogout} isOpen ={isMenuOpened && 'header-menu_opened'} onMenu={handleMenuClick} 
    isMenuIcon={isMenuIcon && 'header-menu_closed'}
    isMenuCloseIcon={isMenuCloseIcon ? 'header-menu_opened' : 'header-menu_closed'}   onClose={closeAllPopups} />
    
      <Switch>
      <ProtectedRoute path='/mesto' component={Main} loggedIn={loggedIn} cards={cards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike= {handleCardLike} onCardDelete={handleCardDelete} />
        <Route path='/signup' >
          <Register onRegister= {onRegister} /> 
        </Route>
        <Route path='/signin'>
          <Login onLogin={ onLogin } />
        </Route>
    </Switch>

        <InfoTooltip 
        stateNotice={isNotice ? 'positiveNotice' : 'negativeNotice'} image={isNotice ? Union : Union1} 
        title={isNotice ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} 
        isOpen={isNotice ? (isInfoTooltipPositivePopupOpen && 'popup_opened') : (isInfoTooltipNegativePopupOpen && 'popup_opened')} 
        onClose={closeAllPopups}  />
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen && 'popup_opened'} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser} /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen && 'popup_opened'} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen && 'popup_opened'} onClose={closeAllPopups} onAddPlace = {handleAddPlace} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <PopupWithForm name="remove-card" title="Вы уверены?" submitText="Да">
          <section className="popup popup_delete">
              <div className="popup__container" name="form-container">
              </div>
          </section>
        </PopupWithForm> 
    <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
