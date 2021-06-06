import React from 'react'

export default function DeletePlacePopup (props) {
  const {onDelPlace, card, onClose, stopProp} = props;

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return  (
  <div className={`popup popup_type_del ${card && 'popup_opened'}`}
    onClick={onClose}
  >
    <div
        className="popup__container"
        onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-btn popup__close-btn_place_del`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <h2 className="popup__heading">Вы уверены?</h2>
      <form
        onSubmit={handleSubmit}
        className={`popup__form popup__form_type_del`}
        name="del"
        noValidate
        >
        <button type="submit" className={`popup__submit-btn popup__submit-btn_type_del`}>Да</button>
      </form>
    </div>
  </div>
  )
}
