export default class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.alt = cardData.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector('.element__img');
        this._elementImg.src = this.link;
        this._elementImg.alt = this.alt;
        this._element.querySelector('.element__name').textContent = this.name;
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
        this._elementHeart = this._element.querySelector('.element__heart');
        this._elementHeart.addEventListener('click', () => { //Выбираем кнопку сердечко и сразу вешаем слушатель
            this._handleLikeCard();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', () => { //Выбираем кнопку удалить карточку и сразу вешаем слушатель
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__img').addEventListener('click', () => { //Выбираем картинку и сразу вешаем слушатель
            this._handleCardClick(this.name, this.link);
        });
    }

    _handleLikeCard() { //Функция лайка карточки
        this._elementHeart.classList.toggle('element__heart_active');
    }

    _handleDeleteCard() { //Функция удаления карточки
        this._element.remove();
    }

}