import logo from "../images/logo.svg";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState(false);
  const maxSize = 400;
  
  const Menu = (
    <menu className="header__auth-container">
      <div className="header__auth header__email">
        {props.userData.email}
      </div>
      <Link to="/sign-in" className="header__auth grey" onClick={handleLogOut}>
        Выйти
      </Link>
    </menu>
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  function handleClickOnMenu() {
    setIsClicked(!isClicked);

}
  function handleLogOut() {
    props.onLogOut();
    setIsClicked(false);
  }

  return (
    <header>
      {isClicked && <menu className="header__mobile-menu">{Menu}</menu>}
      <div className="header">
        <img
          src={logo}
          alt="Надписи Место и Россия."
          className="header__logo"
        />
        <Routes>
          <Route
            exact
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__auth link">
                Регистрация
              </Link>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__auth link">
                Войти
              </Link>
            }
          />
          <Route
            exact
            path="/mesto"
            element={
              <>
                {width > maxSize ? (
                  Menu
                ) : (
                  <button
                    className={`${
                      isClicked ? "header__menu-btn_clicked" : ""
                    } header__menu-btn link`}
                    onClick={handleClickOnMenu}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
