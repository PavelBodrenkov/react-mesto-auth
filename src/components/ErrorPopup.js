import React from "react";

function ErrorPopup({registerMessage, onClose, closeOver}) {

    return(
        <div onClick={closeOver} className={`error-popup popup ${registerMessage && "popup_opened"}`}>
            <ul className="error-popup__lists">
                <li className="error-popup__images"></li>
                <li className="error-popup__title">Что-то пошло не так!Попробуйте ещё раз.</li>
                <button onClick={onClose} className="button button_type_close button_type_error" type="button"></button>
            </ul>
        </div>
    )
    
}

export default ErrorPopup