import React, { useState } from 'react';
import logo from './../images/logo.svg';
import {Link, useHistory, useLocation} from 'react-router-dom'


function Header ({userEmail, setLogged, setUserEmail, setBurgerHidden}) {
  
const location = useLocation()
const history = useHistory()
const currentPath = location.pathname
const [toggle, setToggle] = useState(true)

function signOut () {
  localStorage.removeItem('token')
  history.push('/sing-up')
  setLogged(false)
  setUserEmail("")
}

function toggleBurger() {
  const currentState = toggle;
  setToggle(!currentState);
  setBurgerHidden(currentState)
  console.log(toggle)
}
    
  return (
    <header className="header line">
      <img src={logo} alt="логотип" className="header__logo" />
      <Link className={currentPath.search('/sing-in') ? "hidden" : "header__login"} to={'/sing-up'} >Регистрация</Link>
      <Link className={currentPath.search('/sing-up') ? "hidden" : "header__login"} to={'/sing-in'} >Войти</Link>
      <div className={currentPath.search('/main') ? "hidden" : "header__exit"}>
      <div className="user-data">{userEmail}</div>
      <Link onClick={signOut} to={'/main'} className="header__login">Выйти</Link>
      </div>
      <div onClick={toggleBurger} className={`header__burger-menu ${toggle ? '': 'active'}`}>
        <span></span>
      </div>
    </header>
  )
}


export default Header