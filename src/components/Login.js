import React from 'react'

function Login () {
    return (
        <div className="register">
        <div className="register__container">
          <form action="#" id="form_reset" className="register__form" name noValidate>
            <h2 className="register__title">Вход</h2>
            <input className="register__input" type="email" name="email" placeholder="Email"></input>
            <input className="register__input" type="password" name="password" placeholder="Пароль"></input>
            <button className=" button button_type_register">Войти</button>
          </form>
         
        </div>
      </div>
    )
}

export default Login