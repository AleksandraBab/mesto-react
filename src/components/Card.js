function Card ({card, onCardClick}) {

  return (
    <li
      className="element"
    >
      <div className="element__image-wrapper">
        <img className="element__image" src={card.link} alt={card.name}
          onClick={() => onCardClick(card)}
        />
        <button
          type="button"
          className="element__delete-btn"
          aria-label="Удалить"
        >
        </button>
      </div>
      <div className="element__caption">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like">
          <button type="button" className="element__like-btn" aria-label="Добавить в избранное"></button>
          <span className="element__likecounter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
