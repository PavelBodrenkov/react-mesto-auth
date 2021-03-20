import React, { useEffect, useState } from "react"; 
import PopupWithForm from "./PopupWithForm.js"; 
import { ProfileContext } from "./../contexts/CurrentUserContext"; 
 
function EditProfilePopup({ 
  isOpen, 
  onClose, 
  closeOver, 
  onUpdateUser, 
  loading 
}) { 
  const currentUser = React.useContext(ProfileContext); 
  const [dataUser, setDataUser] = useState({ 
    name: "", 
    profession: "" 
  }); 
 
  useEffect(() => { 
    setDataUser({ 
      name: currentUser.name, 
      profession: currentUser.about 
    }); 
  }, [currentUser]); 
 
  function handleChange(e) { 
    const { name, value } = e.target; 
    setDataUser({ ...dataUser, [name]: value }); 
  } 
 
  function handleSubmit(e) { 
    e.preventDefault(); 
    onUpdateUser({ 
      name: dataUser.name, 
      about: dataUser.profession 
    }); 
  } 
 
  return ( 
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      closeOver={closeOver} 
      handleSubmit={handleSubmit} 
      name="edit" 
      title="Редактировать профиль" 
      nameForm="edit" 
    > 
      <input 
        onChange={handleChange} 
        value={dataUser.name} 
        id="text-input" 
        className="popup__data popup__data_type_name" 
        type="text" 
        placeholder="Имя" 
        name="name" 
        minLength="2" 
        maxLength="40" 
        required 
      /> 
      <span id="text-input-error" className="popup__data-error"></span> 
      <input 
        onChange={handleChange} 
        value={dataUser.profession} 
        id="subtext-input" 
        className="popup__data popup__data_type_job" 
        type="text" 
        placeholder="Вид деятельности" 
        name="profession" 
        minLength="2" 
        maxLength="200" 
        required 
      /> 
      <span id="subtext-input-error" className="popup__data-error"></span> 
      <button 
        className={`button button_type_save button_type_save-edit ${ 
          loading ? "button_type_disabled" : "button_type_save" 
        }`} 
        type="submit" 
        name="button" 
        value="Сохранить" 
        disabled={loading ? true : false} 
      > 
        {loading ? "Сохранение..." : "Сохранить"} 
      </button> 
    </PopupWithForm> 
  ); 
} 
 
export default EditProfilePopup; 
