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
            this._handleSubmit(this._cardId, this.card);
        });
        super.setEventListeners();
    }
    open(id, card) {
        this._cardId = id;
        this.card = card;
        super.open();
    }

}