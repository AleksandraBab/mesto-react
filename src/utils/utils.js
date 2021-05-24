const closeWithEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

const closeWithClick = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popup)
 }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

const renderLoading = (element, isLoading, initialText) => {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = initialText
  }
}

export {openPopup, closePopup, closeWithClick, renderLoading}
