function ImagePopup ({card, onClose, stopProp}) {
  return (
    <div
      className={`popup popup_type_image ${card && 'popup_opened'}`}
      onClick={onClose}
    >
        <figure
          className="popup__figure"
          onClick={stopProp}
        >
          <button
            type="button"
            className="popup__close-btn popup__close-btn_place_image"
            aria-label="Закрыть без сохранения"
            onClick={onClose}
          >
          </button>
          <img
            className="popup__image"
            src={card ? card.link : ''}
            alt={card ? card.name : ''}
          />
          <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
        </figure>
      </div>
  )
}

export default ImagePopup
