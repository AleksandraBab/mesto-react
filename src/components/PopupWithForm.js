function PopupWithForm (props) {
  const {title, name, buttonText, children, isOpen, onClose, stopProp} = props;

  return  (
  <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
    onClick={onClose}
  >
    <div className="popup__container"
      onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-btn popup__close-btn_place_${name}`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <h2 className="popup__heading">{title}</h2>
      <form
        className={`popup__form popup__form_type_${name}`}
        name={name}
        noValidate>
        {children}
        <button type="submit" className={`popup__submit-btn popup__submit-btn_type_${name}`}>{buttonText}</button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm
