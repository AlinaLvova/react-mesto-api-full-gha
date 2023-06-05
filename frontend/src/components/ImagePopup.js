import {useState} from 'react';
import image_404 from './../images/404.webp';
import usePopupClose from "./../hooks/usePopupClose";

function ImagePopup({card, onClose}) {
  const [imageError, setImageError] = useState(false);

  usePopupClose(card.link, onClose);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClosePopup = () => {
    onClose();
  };
  
  return (
    <div
      className={`popup popup_opacity-img ${
        card.link ? "popup_opened" : ""
      }`}
      id="popup-open-img"
    >
      <div className="popup__big-img-container">
        {imageError ? (
          <img 
          className="popup__image" 
          type="button" 
          src={image_404}
          alt="not found" />
        ) : (
          <img 
          className="popup__image" 
          type="button" 
          src={card.link}
          alt={`пользователя: ${card.name}`}
          onError={handleImageError}
          />
        )}
        <figcaption className="popup__figcaption">{card.name}</figcaption>
        <button
          className="popup__close-btn link"
          id="close-btn-img"
          type="button"
          aria-label="close img popup"
          onClick={handleClosePopup}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
