import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'
import React from 'react'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  const stopProp = (evt) => {
    evt.stopPropagation();
  }

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  }

  React.useEffect( () => {
    document.addEventListener('keydown', handleEscClose)
  }, [])

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}

        children={
          <>
            <input type="text" name="author" placeholder="Введите имя" id="name" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
            <span className="popup__error popup__error_type_name"></span>
            <input type="text" name="job" placeholder="Введите профессию" id="caption" className="popup__input popup__input_type_caption" required minLength="2" maxLength="200" />
            <span className="popup__error popup__error_type_caption"></span>
          </>
        }
      />

      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}
        children={
          <>
            <input type="text" name="place" placeholder="Название" id="place" className="popup__input popup__input_type_place" required minLength="2" />
            <span className="popup__error popup__error_type_place"></span>
            <input type="url" name="photo" placeholder="Ссылка на картинку" id="src" className="popup__input popup__input_type_src" required />
            <span className="popup__error popup__error_type_src"></span>
          </>
        }
      />

      <PopupWithForm
        name="del"
        title="Вы уверены?"
        buttonText="Да"
        children={null}
      />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}
        children={
          <>
            <input type="url" name="avatar" placeholder="Вставьте ссылку на изображение" id="avatar" className="popup__input popup__input_type_avatar" required />
            <span className="popup__error popup__error_type_avatar"></span>
          </>
        }
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        stopProp={stopProp}
      />
    </>
  )
}

export default App;
