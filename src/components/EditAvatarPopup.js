import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  closeOver,
  name,
  title,
  onUpdateAvatar,
  loading
}) {
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputEl.current.value
    });
  }

  useEffect(() => {
    if (!isOpen) {
      inputEl.current.value = "";
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
      nameForm="avatar"
    >
      <input
        ref={inputEl}
        id="avatar-input"
        className="popup__data popup__data_photo"
        type="url"
        name="photoAvatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatar-input-error" className="popup__data-error"></span>
      <button
        className={`button button_type_save button_type_save-profile ${
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

export default EditAvatarPopup;
