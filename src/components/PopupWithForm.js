import React, { useEffect } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  closeOver,
  handleSubmit,
  nameForm,
  children,
  title
}) {
  useEffect(() => {
    if (!isOpen) return null;
    const closeESC = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeESC);

    return () => {
      document.removeEventListener("keydown", closeESC);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={closeOver}
    >
      <div className="popup__conteiner">
        <form
          onSubmit={handleSubmit}
          action="#"
          id="form_reset"
          className={`form form_type_${nameForm}`}
          name={`popup-${name}`}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
        <button
          onClick={onClose}
          aria-label="Закрыть_попап"
          className="button button_type_close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
