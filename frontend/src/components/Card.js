import { useState, useContext } from "react";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import image_404 from "./../images/404.webp";

function Card(card) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `card__like link ${isLiked && 'card__like_active' }`;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    card.onCardClick(card);
  };

  const handleClickLikeCard = () => {
    card.onCardLike(card);
  }

  const handleDeleteClick = () => {
    card.onCardDelete(card);
  }
         
  return (
    <li className="card" key={card._id}>
      <article>
        {isOwner && (
          <button
            className="card__delete link card__delete_active"
            aria-label="to-delete-card"
            onClick={handleDeleteClick}
          ></button>
        )}
        {imageError ? (
          <img
            className="card__image"
            src={image_404}
            alt="not found"
            onClick={handleClick}
          />
        ) : (
          <img
            className="card__image"
            src={card.link}
            onError={handleImageError}
            alt={`пользователя: ${card.name}`}
            onClick={handleClick}
          />
        )}
        <div className="card__footer">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="liked"
              onClick={handleClickLikeCard}
            ></button>
            <h4 className="card__like-counter">
              {card.likes.length > 0 ? card.likes.length : ""}
            </h4>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
