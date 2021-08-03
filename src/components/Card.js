export default class Card {
    constructor(cardData, cardSelector, handleCardClick, userId, handleDeleteCard, handleChangeLike) {
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
        this.handleChangeLike = handleChangeLike;
        this.userId = userId;
        this.likeCheck = false;

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
            if (this.likes[i]._id === this.userId) {
                this.likeCheck = true;
                this._elementHeart.classList.toggle('element__heart_active');
            };
        };
        if (this.owner === this.userId) {
            this._element.querySelector('.element__button-delete').addEventListener('click', () => { //Выбираем кнопку удалить карточку и сразу вешаем слушатель
                this._handleDeleteCard(this.id, this);
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
        this.handleChangeLike(this.id, this.likeCheck, this);
        // в коллбэке handleChangeLike добавляем/удаляем лайк и возвращаем в sumLikes количество лайков данной карточки
    }

    deleteCard() { //Функция удаления карточки
        this._element.remove();
    }

    updateLikes(res) {
        this._element.querySelector('.element__likeChecker').textContent = res;
    }

}