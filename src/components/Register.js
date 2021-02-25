import React from 'react';
import {Link} from 'react-router-dom';
import * as mainAuth from '../components/mainAuth';



class Register extends React.Component  {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      password: ''
    }
    this.hendleChange = this.hendleChange.bind(this);
    this.hendleSubmit = this.hendleSubmit.bind(this)
  }
  
  hendleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]:value
    });
  }

  hendleSubmit (e) {
    e.preventDefault()
    const {email, password} = this.state
    mainAuth.register(password, email)
  }

render () {
    return(
      <div className="register">
      <div className="register__container">
        <form onSubmit={this.hendleSubmit} action="#" id="form_reset" className="register__form" name noValidate>
          <h2 className="register__title">Регистрация</h2>
          <input onChange={this.hendleChange} className="register__input" type="email" name="email" placeholder="Email" value={this.state.email}></input>
          <input onChange={this.hendleChange} className="register__input" type="password" name="password" placeholder="Пароль" value={this.state.password}></input>
          <button className=" button button_type_register">Зарегистрироваться</button>
          <Link to={'/sing-in'} className="register__login">Уже зарегистрированы? Войти</Link>
        </form>
       
      </div>
    </div>

    )
}
}

export default Register