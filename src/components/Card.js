export default class Card {
    constructor(cardData, cardSelector, handleCardClick, user_id, handleDeleteCard, handleChangeLike) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.alt = cardData.name;
        this.id = cardData._id;
        this.owner = cardData.owner._id;
        this.likes = cardData.likes;
        this.sumLikes = cardData.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleChangeLike = handleChangeLike;
        this.user_id = user_id;
    }


    generateCard() {
        this._element = this._getTemplate();
        this._elementImg = this._element.querySelector('.element__img');
        this._elementImg.src = this.link;
        this._elementImg.alt = this.alt;
        this._element.querySelector('.element__name').textContent = this.name;
        this._element.querySelector('.element__likeChecker').textContent = this.sumLikes;
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
        for (let i = 0; i < this.likes.length; i++) {
            if (this.likes[i]._id === this.user_id) {
                this._elementHeart.classList.toggle('element__heart_active');
            };
        };
        if (this.owner === this.user_id) {
            this._element.querySelector('.element__button-delete').addEventListener('click', () => { //Выбираем кнопку удалить карточку и сразу вешаем слушатель
                this._deleteCard();
                this._handleDeleteCard(this.id);
            });
        } else {
            this._element.querySelector('.element__button-delete').classList.add('element__hidden')
        };

        this._element.querySelector('.element__img').addEventListener('click', () => { //Выбираем картинку и сразу вешаем слушатель
            this._handleCardClick(this.name, this.link);
        });
    }

    _handleLikeCard() { //Функция лайка карточки
        this._elementHeart.classList.toggle('element__heart_active');
        let check = 0;
        for (let i = 0; i < this.likes.length; i++) {
            if (this.likes[i]._id === this.user_id) {
                check = check + 1;
            };
        }; // проверяем ставили картинке раньше лайк или нет
        this._handleChangeLike(this.id, check);
        this._element.querySelector('.element__likeChecker').textContent = this.sumLikes - check;
    }

    _deleteCard() { //Функция удаления карточки
        this._element.remove();
    }
}