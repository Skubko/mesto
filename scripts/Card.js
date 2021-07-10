import { addPopup, popupPicture, popupImage, popupCaption, characteristics } from "./index.js";

export default class Card {
    constructor(characteristics, cardSelector) {
        this.name = characteristics.name;
        this.link = characteristics.link;
        this.alt = characteristics.name;
        this._cardSelector = cardSelector;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = this.link;
        this._element.querySelector('.element__name').textContent = this.name;
        this._element.querySelector('.element__img').alt = this.alt;
        this._setEventListeners();

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__heart').addEventListener('click', () => { //Выбираем кнопку сердечко и сразу вешаем слушатель
            this._handleLikeCard();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', () => { //Выбираем кнопку удалить карточку и сразу вешаем слушатель
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__img').addEventListener('click', () => { //Выбираем картинку и сразу вешаем слушатель
            this._openPopupPicture(this.name, this.link);
        });
    }

    _handleLikeCard() { //Функция лайка карточки
        this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }

    _handleDeleteCard() { //Функция удаления карточки
        this._element.remove();
    }

    _openPopupPicture(name, link) { //Открываем попап с картинкой на весь экран
        addPopup(popupPicture); //добавляем к popup класс popup_opened
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
    };
}