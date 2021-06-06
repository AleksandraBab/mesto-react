import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function EditProfilePopup (props) {
  const {onUpdateUser, isOpen, onClose, stopProp} = props;

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  React.useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } 
  })

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({name, about: description});
  } 


  return  (
  <div className={`popup popup_type_edit ${isOpen && 'popup_opened'}`}
    onClick={onClose}
  >
    <div
        className="popup__container"
        onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-btn popup__close-btn_place_edit`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <h2 className="popup__heading">Редактировать профиль</h2>
      <form
        onSubmit={handleSubmit}
        className={`popup__form popup__form_type_edit`}
        name="edit"
        noValidate>
        <input
            value={name}
            onChange={handleNameChange}
            type="text"
            name="author"
            placeholder="Введите имя"
            id="name"
            className="popup__input popup__input_type_name"
            required minLength="2"
            maxLength="40"
        />
        <span className="popup__error popup__error_type_name"></span>
        <input
            value={description}
            onChange={handleDescriptionChange}
            type="text" name="job"
            placeholder="Введите профессию"
            id="caption"
            className="popup__input popup__input_type_caption"
            required minLength="2"
            maxLength="200"
        />
        <span className="popup__error popup__error_type_caption"></span>
        <button type="submit" className={`popup__submit-btn popup__submit-btn_type_edit`}>Сохранить</button>
      </form>
    </div>
  </div>
  )
}