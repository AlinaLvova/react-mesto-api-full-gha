import usePopupClose from "./../hooks/usePopupClose";

function PopupWithForm({isOpen, onClose, name, title, onSubmit, isLoading, children}){
    usePopupClose(isOpen, onClose);

    return(
        <div className={`popup ${isOpen ? 'popup_opened':''}`} id={`popup-${name}`}>
            <div className="popup__container">
                <button className="popup__close-btn link" id="close-btn-edit" type="button"
                    aria-label="close edit form"  onClick={onClose}/>
                <form className="popup__form" method="POST" name={`${name}-form`} onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                    {children}
                    <button className="popup__submit-btn link" type="submit">{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;