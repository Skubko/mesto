import { addPopup, popupPicture, popupImage, popupCaption } from "./index.js";

export default class Card {
    constructor(dataName, dataLink, cardSelector) {
        this.name = dataName;
        this.link = dataLink;
        this.alt = dataName;
        this._cardSelector = cardSelector;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = this.link;
        this._element.querySelector('.element__name').textContent = this.name;
        this._element.alt = this.name;
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
            this._popupPictureOpen(this.name, this.link);
        });
    }

    _handleLikeCard() { //Функция лайка карточки
        this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }

    _handleDeleteCard() { //Функция удаления карточки
        this._element.closest('.element').remove();
    }
    _popupPictureOpen(name, link) { //Открываем попап с картинкой на весь экран
        addPopup(popupPicture); //добавляем к popup класс popup_opened
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
    };
}