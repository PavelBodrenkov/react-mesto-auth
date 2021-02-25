import React from 'react';
import logo from './../images/logo.svg';
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className="header line">
      <img src={logo} alt="логотип" className="header__logo" />
      <Link to={'/sing-up'} className="header__login">Войти</Link>
    </header>
  )
}

export default Header