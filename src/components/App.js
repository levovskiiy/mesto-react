import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPalcePupupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddPalcePupupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({})
  }

  return (
    <>
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        buttonText="Удалить"
      ></PopupWithForm>

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
              <input
                id="username"
                name="username"
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                defaultValue="_"
                required
              />
              <span className="popup__input-error username-error"></span>

              <input
                id="about"
                name="description"
                type="text"
                className="popup__input popup__input_type_descr"
                placeholder="Описание"
                minLength="2"
                maxLength="200"
                defaultValue="_"
                required
              />
              <span className="popup__input-error about-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        <input
          id="placeName"
          name="name"
          type="text"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error placeName-error"></span>

        <input
          id="link"
          name="link"
          type="url"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error link-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="replace-avatar"
        title="Обновить Аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        <input
          id="linkAvatar"
          name="linkAvatar"
          type="url"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на новую картинку профиля"
          required
        />
        <span className="popup__input-error linkAvatar-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPalce={handleAddPalceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
    </>
  );
}

export default App;
