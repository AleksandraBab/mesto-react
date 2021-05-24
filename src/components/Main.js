import React from 'react'
import {api} from '../utils/Api'
import Card from './Card'

function Main ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {

    api.getInitialData()
      .then( (arg) => {
        const [dataFirtsPromise, dataSecondPromise] = arg;
        setUserName(dataFirtsPromise.name);
        setUserDescription(dataFirtsPromise.about);
        setUserAvatar(dataFirtsPromise.avatar)
        setCards(dataSecondPromise);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
      <main className="content">
          <section className="profile section page__section">
            <div
              className="profile__avatar-block"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={userAvatar}
                alt=""
              />
              <div className="profile__bckgrnd"></div>
            </div>
            <div className="profile__info">
              <div className="profile__row">
                <h1 className="profile__name">{userName}</h1>
                <button
                  type="button"
                  className="profile__edit-btn"
                  aria-label="Редактировать профиль"
                  onClick={onEditProfile}
                >
                </button>
                </div>
              <p className="profile__caption">{userDescription}</p>
            </div>
            <button
              type="button"
              className="profile__add-btn"
              aria-label="Добавить карточку"
              onClick={onAddPlace}
            >
          </button>
          </section>
          <section className="elements section page__section">
            <ul className="elements__grid-items">
              {cards.map((item) => (
                    <Card
                      key={item._id}
                      card={item}
                      onCardClick={onCardClick}
                    />
              ))}
            </ul>
          </section>
      </main>
  )
}

export default Main
