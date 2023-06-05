import {useContext} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Card from './Card';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import InfoTooltip from "./InfoTooltip";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const navigate = useNavigate();

  function handleClosePopup(){
    navigate("/mesto", { replace: true, state: { isOpenInfoPopup : false } });  
  }
  
  return (
    <div>
      <section className="profile">
        <div className="profile__info-group">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              alt="Аватара пользователя."
              src={currentUser.avatar}
            />
            <button
              className="profile__avatar-button"
              type="button"
              aria-label="update avatar"
              onClick={props.onUpdateAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__group-name-btn">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button link"
                type="button"
                aria-label="edit profile"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button link"
          type="button"
          aria-label="add new card"
          onClick={props.onAddCard}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {props.cards.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              key={card._id}
              likes={card.likes}
              owner={card.owner}
              _id={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
      <InfoTooltip
        isSuccessfull={true}
        isOpen={location.state?.isOpenInfoPopup || false}
        onClosePopup={handleClosePopup}
        successTitle={location.state?.title || ""}
      ></InfoTooltip>
    </div>
  );
}

export default Main;
