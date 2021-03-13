import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { profileContext } from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from './Register';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import * as mainAuth from "../components/mainAuth";
import ErrorPopup from "./ErrorPopup";
import DonePopup from "./DonePopup"
import Burger from "./Burger";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loadingCard, setLoadingCard] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [delPopup, setDelPopup] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory();
  const [userEmail, setUserEmail] = useState([])
  const [registerMessage, setRegisterMessage] = useState(false)
  const [doneRegMessage, setDoneMessage] = useState(false)
  const [burgerhidden, setBurgerHidden] = useState("")

  useEffect(() => {
    Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then(([usersData, cards]) => {
        setCurrentUser(usersData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const likeRequest = isLiked ? api.deleteLike(card._id) : api.addLike(card._id)
    likeRequest.then((newCard) => {
      const newCards = cards.map((item) =>
        item._id === card._id ? newCard : item
      )
      setCards(newCards);
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function hendleDeleteCard(card) {
    setCardToDelete(card);
    setDelPopup(true);
  }

  function handleCardDeleteSubmit() {
    setLoadingDelete(true)
    api
      .deleteAddCard(cardToDelete._id)
      .then(() => {
        const delcard = cards.filter((item) => item._id !== cardToDelete._id);
        setCards(delcard);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setCardToDelete({});
        setLoadingDelete(false)
      });
  }

  function handleCardClick(card) {
    setIsPhotoPopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function openPopupError() {
    setRegisterMessage(true)
  }

  function openPopupDone() {
    setDoneMessage(true)
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPhotoPopupOpen(false);
    setDelPopup(false);
    setRegisterMessage(false);
    setDoneMessage(false);
  }

  function escClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      closeAllPopup();
    }
  }

  function handleUpdateUser({ name, about }) {
    setLoadingProfile(true);
    api
      .pathEditProfile({ name: name, about: about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoadingProfile(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoadingAvatar(true);
    api
      .addAvatar({ avatar: avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoadingAvatar(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setLoadingCard(true);
    api
      .postAddCard({ name: name, link: link })
      .then((res) => {
        setCards([res, ...cards]);
        if (res) {
          closeAllPopup()
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoadingCard(false));
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  function hendleLogin() {
    setLoggedIn(true)
  }

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"))
      const token = localStorage.getItem("token")
      console.log(token)
      if (token) {
        mainAuth.getContent(token).then((res) => {
          console.log(res)
          if (res) {
            setUserEmail(res.data.email)
            history.push("/main")
            hendleLogin()
            console.log(res.data.email)
          }
        })
          .catch((err) => console.log(err))
      }
    }
  }

  useEffect(() => {
    const closeESC = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopup();
      }
    };
    document.addEventListener("keydown", closeESC);

    return () => {
      document.removeEventListener("keydown", closeESC);
    };
  }, []);


  return (
    <div className="page">
      <profileContext.Provider value={currentUser}>
        <Burger userEmail={userEmail} setUserEmail={setUserEmail} setLogged={setLoggedIn} burgerhidden={burgerhidden} />
        <Header userEmail={userEmail} setUserEmail={setUserEmail} setLogged={setLoggedIn} setBurgerHidden={setBurgerHidden} />
        <Switch>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={hendleDeleteCard}
            cardsContext={cards}
          />
          <ProtectedRoute
            path="/main"
            component={Footer}
          />
          <Route path="/sign-up">
            <Register openPopupDone={openPopupDone} openPopupError={openPopupError} />
          </Route>
          <Route path="/sign-in">
            <Login hendleLogin={hendleLogin} openPopupError={openPopupError} />
          </Route>
          <Route>
            {loggedIn ? (
              <Redirect to="/main" />
            ) : (
                <Redirect to="sign-in" />
              )
            }
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          closeOver={escClose}
          onUpdateUser={handleUpdateUser}
          loading={loadingProfile}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          closeOver={escClose}
          name="avatar"
          title="Обновить аватар"
          onUpdateAvatar={handleUpdateAvatar}
          loading={loadingAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          closeOver={escClose}
          name="photo"
          title="Новое место"
          onAddPlace={handleAddPlaceSubmit}
          loading={loadingCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
          isOpen={isPhotoPopupOpen}
          closeOver={escClose}
        />
        <DeleteCardPopup
          isOpen={delPopup}
          name="delete"
          card={selectedCard}
          onCardDelete={handleCardDeleteSubmit}
          onClose={closeAllPopup}
          closeOver={escClose}
          loading={loadingDelete}
        />
        <ErrorPopup closeOver={escClose} onClose={closeAllPopup} registerMessage={registerMessage} />
        <DonePopup closeOver={escClose} onClose={closeAllPopup} doneRegMessage={doneRegMessage} />
      </profileContext.Provider>
    </div>
  );
}

export default App;
