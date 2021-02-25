import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function DeleteCardPopup({
  isOpen,
  onCardDelete,
  onClose,
  name,
  closeOver,
  loading
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      onClose={onClose}
      name={name}
      closeOver={closeOver}
      nameForm="delete"
    >
      <h2 className="popup__title popup__title_type_photo">Вы уверены ?</h2>
      <button
        className={`button button_type_save ${
          loading ? "button_type_disabled" : "button_type_save"
        }`}
        type="submit"
        name="button"
        value="yes"
        disabled={loading ? true : false}
      >
        {loading ? "Удаление..." : "Да"}
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
