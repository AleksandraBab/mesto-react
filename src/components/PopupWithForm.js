function PopupWithForm (props) {
  const {title, name, buttonText, children, isOpen, onClose, stopProp, onSubmit, valid} = props;

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
        onSubmit={onSubmit}
        noValidate>
        {children}
        <button
          type="submit"
          disabled={!valid}
          className={`popup__submit-btn popup__submit-btn_type_${name} ${valid ? '' : 'popup__submit-btn_disabled'}`}
        >
        {buttonText}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm
