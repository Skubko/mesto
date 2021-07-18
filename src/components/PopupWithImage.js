import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardPicture = this._popup.querySelector('.popup__image');
        this._popupCardTitle = this._popup.querySelector('.popup__caption');
    }


    open(elem) {
        super.open(); //добавляем  класс popup_opened
        this._popupCardPicture.src = elem.link; //Открываем  картинкe на весь экран
        this._popupCardPicture.alt = elem.name;
        this._popupCardTitle.textContent = elem.name;
    }
}