import { React, useEffect, useRef, useState } from "react"; 
import PopupWithForm from "./PopupWithForm.js"; 
 
function AddPlacePopup({ 
  isOpen, 
  onClose, 
  closeOver, 
  name, 
  title, 
  onAddPlace, 
  loading 
}) { 
   
  const [dataValue, setDataValue] = useState({ 
    point: '', 
    photo: '' 
  }) 
 
  function hendleChange (e) { 
    const {name, value} = e.target 
    setDataValue({...dataValue, [name]:value}) 
  } 
 
  function handleSubmit(e) { 
    e.preventDefault(); 
    onAddPlace({ 
      name: dataValue.point, 
      link: dataValue.photo 
    }); 
  } 
 
  useEffect(() => { 
    if (!isOpen) { 
      dataValue.point = ""; 
      dataValue.photo = ""; 
    } 
  }, [isOpen]); 
 
  return ( 
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      closeOver={closeOver} 
      name={name} 
      title={title} 
      handleSubmit={handleSubmit} 
      nameForm="photo" 
    > 
      <input 
        //  
        onChange={hendleChange} 
        id="photo-input" 
        className="popup__data popup__data_photo popup__data_type_location" 
        type="text" 
        name="point" 
        placeholder="Название" 
        minLength="2" 
        maxLength="30" 
        required 
        value={dataValue.point} 
      /> 
      <span id="photo-input-error" className="popup__data-error"></span> 
      <input 
        // ref={linkCurrent} 
        onChange={hendleChange} 
        id="url-input" 
        className="popup__data popup__data_photo popup__data_type_link" 
        type="url" 
        name="photo" 
        placeholder="Ссылка на картинку" 
        required 
        value={dataValue.photo} 
      /> 
      <span id="url-input-error" className="popup__data-error"></span> 
      <button 
        className={`button button_type_save button_type_save-add ${ 
          loading ? "button_type_disabled" : "button_type_save" 
        }`} 
        type="submit" 
        name="button" 
        value="Создать" 
        disabled={loading ? true : false} 
      > 
        {loading ? "Сохранение..." : "Создать"} 
      </button> 
    </PopupWithForm> 
  ); 
} 
 
export default AddPlacePopup; 