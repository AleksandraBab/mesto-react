import logo from '../images/logo.svg'

function Header () {
  return (
      <header className="header page__header">
          <img className="logo" src={logo} alt="Логотип Mesto Russia" />
      </header>
  )
}

export default Header
