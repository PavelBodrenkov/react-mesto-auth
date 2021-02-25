import React from "react";
import { useEffect } from "react";

function ImagePopup({ isOpen, onClose, closeOver, card }) {
  useEffect(() => {
    if (!isOpen) return;
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
      className={`popup popup_type_photo ${isOpen && "popup_opened"}`}
      onClick={closeOver}
    >
      <figure className="popup__big">
        <button
          onClick={onClose}
          aria-label="Закрыть_попап"
          className="button button_type_close button_type_big-close"
          type="button"
        ></button>
        <img className="popup__big-photo" alt="Фото" src={`${card.link}`} />
        <figcaption className="popup__big-title">{`${card.name}`}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
