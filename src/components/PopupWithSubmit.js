import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }
    setEventListeners() {
        //на форму вешем слушатель сабмита, затем использем коллбэк 
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._cardId);
        });
        super.setEventListeners();
    }
    open(id) {
        this._cardId = id;
        super.open();
    }
    close() {
        super.close();
        this._form.reset();
    }
}