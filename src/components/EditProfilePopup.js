import React, { useEffect, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { profileContext } from "./../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  closeOver,
  onUpdateUser,
  loading
}) {
  const currentUser = React.useContext(profileContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const load = useRef(null);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function hendleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
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
        onChange={handleNameChange}
        value={name}
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
        onChange={hendleDescriptionChange}
        value={description}
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
        ref={load}
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
