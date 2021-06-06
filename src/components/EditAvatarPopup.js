import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function EditProfilePopup (props) {
  const {onUpdateAvatar, isOpen, onClose, stopProp} = props;

  const currentUser = React.useContext(CurrentUserContext);
 
  const avatar = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({avatar: avatar.current.value});
    avatar.current.value = ''
} 

  return  (
  <div className={`popup popup_type_avatar ${isOpen && 'popup_opened'}`}
    onClick={onClose}
  >
    <div
        className="popup__container"
        onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-btn popup__close-btn_place_avatar`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <h2 className="popup__heading">Обновить аватар</h2>
      <form
        onSubmit={handleSubmit}
        className={`popup__form popup__form_type_avatar`}
        name="avatar"
        noValidate
        >
        <input
          ref={avatar}
          type="url"
          name="avatar"
          placeholder="Вставьте ссылку на изображение"
          id="avatar"
          className="popup__input popup__input_type_avatar"
          required
        />
        <span className="popup__error popup__error_type_avatar"></span>
        <button type="submit" className={`popup__submit-btn popup__submit-btn_type_edit`}>Сохранить</button>
      </form>
    </div>
  </div>
  )
}
   