import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeletePlacePopup from './DeletePlacePopup'
import React  from 'react'
import {api} from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [deleteCard, setDeleteCard] = React.useState(null)
  const [cards, setCards] = React.useState([])

  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext))

  /* Закрытие и открытие попапов */

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setDeleteCard(null)
  }

  const stopProp = (evt) => {
    evt.stopPropagation();
  }


  React.useEffect( () => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }

    api.getProfileInfo()
    .then( (userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => {
      console.log(err);
    });

    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  /* Сабмит попапов профиля */

  function handleUpdateUser (data) {
    api.editProfileInfo (data)
      .then( (data) => {
        setCurrentUser(data);
        closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

   function handleUpdateAvatar (data) {
    api.editAvatar (data)
      .then( (data) => {
        setCurrentUser(data);
        closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /* Работа с карточками */

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleDelClick = (card) => {
    setDeleteCard(card)
  }

  React.useEffect(() => {

    api.getInitialCards()
      .then( (initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleCardLike(card) {

    const isLiked = card.likes.some( element => element._id === currentUser._id);

    const changeLike = (newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    }

    if (!isLiked) {
      api.setLike(card._id)
      .then((newCard) => {
        changeLike(newCard)
      })
      .catch((err) => {
        console.log(err);
      })}
    else {
      api.deleteLike(card._id)
       .then((newCard) => {
        changeLike(newCard)
       })
       .catch((err) => {
         console.log(err);
      })
    }
  }

  function handleDeleteClick (deletedCard) {
    api.deleteItem(deletedCard._id)
    .then((data) => {
      const newCards = cards.filter((item) => item !== deletedCard);
      setCards(newCards);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  /* Сабмит добавления карточки */

  function handleAddPlaceSubmit (newCard) {
    api.postItem (newCard)
      .then( (newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /* Разметка */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDelClick={handleDelClick}
        cards={cards}
        onCardLike={handleCardLike}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        stopProp={stopProp}
        onAddPlace={handleAddPlaceSubmit}
      />

      <DeletePlacePopup
        onClose={closeAllPopups}
        stopProp={stopProp}
        card={deleteCard}
        onCardDelete={handleDeleteClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        stopProp={stopProp}
      />
    </CurrentUserContext.Provider>
  )
}

export default App;
