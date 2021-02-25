import React from "react";
import Card from "./Card.js";
import { profileContext } from "./../contexts/CurrentUserContext";

function Main({
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cardsContext
}) {
  const currentUser = React.useContext(profileContext);
  return (
    <div className="conteiner">
      <main className="main">
        <section className="profile">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                aria-label="Редактировать_профиль"
                className="button button_type_edit"
                type="button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            aria-label="Добавить_фото"
            className="button button_type_add-card"
            type="button"
          ></button>
        </section>
        <section className="elements">
          <div className="elements__content">
            {cardsContext.map((item) => {
              return (
                <Card
                  card={item}
                  onCardClick={onCardClick}
                  key={item._id}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
