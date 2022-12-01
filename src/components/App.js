import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";

import {useEffect, useState} from "react";
import {currentUserContext} from "../contexts/currentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPalcePupupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);



  useEffect(() => {
    api.getData()
      .then((data) => {
        const [user, userCards] = data;
        setCards(userCards);
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleLikeCard(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeStatus(card._id, isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Произошла ошибка при лайке карточки\n${err}`);
      })
  }

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(`Произошла ошибка при удалении карточки\n${err}`);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };
  const handleAddPalceClick = () => {
    setIsAddPalcePupupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setIsDeleteCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (userData) => {
    api.editProfile(userData)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При обновлении данных пользователя произошла ошибка:\n${err}`);
      });
  };

  const handleUpdateAvatar = (userAvatar) => {
    api.replaceAvatar(userAvatar.avatar)
      .then(data => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При обновлении данных пользователя произошла ошибка:\n${err}`);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api.postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Произошла ошибка при добавлении новой карточки:\n${err}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddPalcePupupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({})
  }

  return (
    <>
      <currentUserContext.Provider value={currentUser}>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          buttonText="Удалить"
        ></PopupWithForm>

        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfileOpen} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onUpdatePalce={handleAddPlaceSubmit}/>


        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <Header />
        <Main
          cards={cards}
          onCardDelete={handleDeleteCard}
          onCardLike={handleLikeCard}
          onAddPalce={handleAddPalceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </currentUserContext.Provider>
    </>
  );
}

export default App;
