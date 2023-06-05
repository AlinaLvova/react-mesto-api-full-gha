import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function AuthenticationForm(props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false); //проверка email на корректность ввода данных
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [errorInfoTooltipTitle, setErrorInfoTooltipTitle] = useState("");

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formValue.password.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formValue.email, formValue.password]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (name === "email") {
      setEmailValid(/^\S+@\S+\.\S+$/.test(value));
    }
  };

  function handleClickLogIn() {
    navigate("/sign-in", { replace: true });
  }

  function handleClosePopup() {
    setIsInfoTooltipOpen(false);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setErrorInfoTooltipTitle('');
    const title = props.isLogin ? 'Вы успешно вошли в систему!' : 'Вы успешно зарегистрировались!';
    try {
      const data = props.isLogin
        ? await auth.signin( formValue.email, formValue.password)
        : await auth.signup( formValue.email, formValue.password);
  
      if (props.isLogin) {
        localStorage.setItem('token', data.token);
      }

      props.handleLogin(formValue.email);

      setFormValue({email: '', password: ''});

      navigate("/mesto", {
        replace: true,
        state: { isOpenInfoPopup: true , title: title},
      });
    } catch (error) {
      setErrorInfoTooltipTitle(error.message);
      setIsInfoTooltipOpen(true);
      console.log('Error:', error);
    }
  }

  return (
    <>
      <div className="auth">
        <h3 className="auth__title">
          {props.isLogin ? "Вход" : "Регистрация"}
        </h3>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__form-input-group">
            <input
              id="email"
              name="email"
              type="email"
              className="auth__input auth__span"
              placeholder="Email"
              required
              value={formValue.email}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <span className="auth__error"></span>
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input auth__span"
              placeholder="Пароль"
              required
              value={formValue.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className={`auth__button ${!buttonDisabled && "link"}`}
            type="submit"
            disabled={buttonDisabled}
          >
            {props.isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <span className="auth__error"></span>
        {!props.isLogin && (
          <button className="auth__span link" onClick={handleClickLogIn}>
            Уже зарегистрированы? Войти
          </button>
        )}
      </div>
      <InfoTooltip
        isSuccessfull={false}
        isOpen={isInfoTooltipOpen}
        onClosePopup={handleClosePopup}
        failedTitle={errorInfoTooltipTitle}
      ></InfoTooltip>
    </>
  );
}

export default AuthenticationForm;
