import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./../utils/Api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import auth from "./.././utils/Auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    api
      .getCardList()
      .then((cardListData) => {
        setCards(cardListData);
      })
      .catch((error) => {
        console.log(error.message);
      });

    api
      .getUserInfo()
      .then((infoData) => {
        setCurrentUser(infoData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  async function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (!token) navigate("/sign-in", { replace: true });
    else {
      try{
      const data = await auth.checkUserSession(token);
      setLoggedIn(true);
      setUserData({ email: data.data.email });
      navigate("/mesto", { replace: true });
      }
      catch(error){
        console.log('Error:', error);
      }
    }
  }

  const handleUpdateAvatarClick = () => {
    setIsUpdateAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const isOpen =
    isUpdateAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddCardPopupOpen ||
    selectedCard.link;

  // useEffect(() => {
  //   function closeByEscape(evt) {
  //     if (evt.key === "Escape") {
  //       closeAllPopups();
  //     }
  //   }
  //   if (isOpen) {
  //     document.addEventListener("keydown", closeByEscape);
  //     return () => {
  //       document.removeEventListener("keydown", closeByEscape);
  //     };
  //   }
  // }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id !== card._id ? c : null))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .updateUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    return api
      .sentCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleLogin(email) {
    setLoggedIn(true);
    setUserData({ email: email });
  }

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.clear("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userData={userData} onLogOut={handleLogOut} />
          <main className="content">
            <Routes>
              <Route
                path="*"
                element={
                  loggedIn ? (
                    <Navigate to="/mesto" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              ></Route>
              <Route
                exact
                path="/sign-in"
                element={<Login onLogin={handleLogin} />}
              ></Route>
              <Route
                exact
                path="/sign-up"
                element={<Register onRegister={handleLogin} />}
              ></Route>
              <Route
                path="/mesto"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onUpdateAvatar={handleUpdateAvatarClick}
                    onAddCard={handleAddCardClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
          {/* popup: edit profile */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          {/* popup: confirmation */}
          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonTitle="Да"
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          {/* popup: update avatar */}
          <EditAvatarPopup
            isOpen={isUpdateAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          {/* popup: add new card */}
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          {/* popup: open card */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
