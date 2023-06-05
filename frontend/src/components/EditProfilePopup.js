import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        id="input-name"
        name="user-name"
        type="text"
        className="popup__input-field"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="input-name-error popup__input-field-error"></span>
      <input
        id="input-about"
        name="user-about"
        type="text"
        className="popup__input-field"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={about || ""}
        onChange={handleChangeAbout}
      />
      <span className="input-about-error popup__input-field-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
