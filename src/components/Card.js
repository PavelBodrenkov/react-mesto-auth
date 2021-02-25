import React from "react";
import { profileContext } from "./../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(profileContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `button button_type_delete ${isOwn ? "button_type_delete" : "button_type_delete-hidden"
    }`;

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `button button_type_like ${isLiked ? "button_type_like_active" : "button_type_like"
    }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <button
        onClick={handleDeleteClick}
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <button onClick={handleClick} className="button button_type_photo">
        <img className="element__photo" alt={card.name} src={card.link} />
      </button>
      <div className="element__position">
        <h3 className="element__subtitle">{card.name}</h3>
        <div>
          <button
            onClick={handleLikeClick}
            aria-label="Поставить_лайк"
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <div className="element__counter_like">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
