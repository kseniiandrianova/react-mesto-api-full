import React from "react";
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';



function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [isInfoTooltiNegativeOpen, setInfoTooltiNegativeOpen] = React.useState(false);
    const [initialData, setInitialData] = React.useState({
      password: '',
      email: ''
    });

    const [isMenuOpened, setMenuOpened] = React.useState(false);
    const [isMenuIcon, setMenuIconOpen] = React.useState(false);
    const [isMenuCloseIcon, setMenuCloseIconOpen] = React.useState(false);


    const history = useHistory();

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

  React.useEffect(() => {
    handleCheckToken();
  }, [])

  function handleMenuClick() {
    setMenuOpened(true);
    setMenuIconOpen(true);
    setMenuCloseIconOpen(true);
  }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
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
        setSelectedCard(null);
        setInfoTooltipOpen(false);
        setInfoTooltiNegativeOpen(false);
        setMenuOpened(false);
        setMenuIconOpen(false);
        setMenuCloseIconOpen(false);
      }

      function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
          api.addLike(card._id).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err)
        });
        } else {
          api.deleteLike(card._id).then((newCard) => {
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
    const handleCheckToken = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
        .then((res) => {
          if(res) {
            const email = res.data.email;
            setLoggedIn(true);
            setInitialData({
              email
           });
            history.push('/main');
          }
            
          })
        .catch((err) => {
          console.log(err);
        });
      }
    }

    const handleRegSubmit = ( email, password ) => {
      return auth.register(email, password)
      .then(() => {
          setInfoTooltipOpen(true);
          setLoggedIn(true);
          history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltiNegativeOpen(true);
        setLoggedIn(false);

      })
    }

    const handleLogSubmit = ( {email, password}) => {
      return auth.authorize({email, password})
      .then((res) => {
        localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setInitialData({
             email,
             password
            
          });
          handleCheckToken();
          history.push('/main');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    

    
    
    const handleSignOut = () => {
      localStorage.removeItem('jwt')
      setLoggedIn(false)
      history.push('/signin')
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
            <Header  
            loggedIn={loggedIn} 
            email={initialData.email}
            onClose={closeAllPopups} 
            onSignOut={handleSignOut}
            isOpen ={isMenuOpened && 'header_opened'} 
            onMenu={handleMenuClick} 
            isMenuIcon={isMenuIcon && 'header_closed'}
            isMenuCloseIcon={isMenuCloseIcon ? 'header_opened' : 'header_closed'}
            />
            <Switch>
            <ProtectedRoute exact path="/main"
        component = {Main}
        loggedIn = {loggedIn}
        cards = {cards}
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick}  
        onAddPlace={handleAddPlaceClick} 
        onCardClick={handleCardClick}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        />
          <Route path="/signup">
            <Register onSubmit={handleRegSubmit} />
          </Route>
          <Route path="/signin">
            <Login  onSubmit={handleLogSubmit} />
          </Route>
          <Route path="/">
                {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
              </Route>
        </Switch>
        
            <EditProfilePopup 
            isOpen={isEditProfilePopupOpen && 'popup_opened'} 
            onClose={closeAllPopups}  
            onUpdateUser = {handleUpdateUser}
            />
            <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen && 'popup_opened'} 
            onClose={closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar} 
            />
            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen && 'popup_opened'} 
                onClose={closeAllPopups} 
                onAddPlace = {handleAddPlace} 
            />
            <ImagePopup 
            onClose={closeAllPopups} 
            card={selectedCard}
            />
            <PopupWithForm className="remove-card" title="Вы уверены?">
              <section className="popup popup_question">
                <div className="popup__container popup__form_question popup__form" name="form-container">
                </div>
              </section>
            </PopupWithForm>
            <InfoTooltip
            loggedIn={isInfoTooltipOpen}
            isOpen={loggedIn ? (isInfoTooltipOpen && 'popup_opened') : (isInfoTooltiNegativeOpen && 'popup_opened')}
            onClose={closeAllPopups}
          />
            <Footer />
            
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
