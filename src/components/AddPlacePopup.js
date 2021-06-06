import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function AddPlacePopup (props) {
  const {onAddPlace, isOpen, onClose, stopProp} = props;

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect( () => {
      if(!isOpen) {
          setName('')
          setLink('')
      }
  })

  function handleNameSet(evt) {
    setName(evt.target.value);
  }

  function handleLinkSet(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({name, link});
    setName('');
    setLink('');
} 

  return  (
  <div className={`popup popup_type_add ${isOpen && 'popup_opened'}`}
    onClick={onClose}
  >
    <div
        className="popup__container"
        onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-btn popup__close-btn_place_add`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <h2 className="popup__heading">Новое место</h2>
      <form
        onSubmit={handleSubmit}
        className={`popup__form popup__form_type_add`}
        name="add"
        noValidate
        >
        <input value={name} onChange={handleNameSet} type="text" name="place" placeholder="Название" id="place" className="popup__input popup__input_type_place" required minLength="2" />
        <span className="popup__error popup__error_type_place"></span>
        <input value={link} onChange={handleLinkSet} type="url" name="photo" placeholder="Ссылка на картинку" id="src" className="popup__input popup__input_type_src" required />
        <span className="popup__error popup__error_type_src"></span>
        <button type="submit" className={`popup__submit-btn popup__submit-btn_type_add`}>Создать</button>
      </form>
    </div>
  </div>
  )
}