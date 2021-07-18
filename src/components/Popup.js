export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._keyEscapeHandler.bind(this);
    }

    open() { // нужен
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() { // нужен
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _keyEscapeHandler(event) { //Функция закрытия попапа по клавише Escape   // нужен 
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.close-icon').addEventListener('click', (event) => this.close());
        //   вешаем слушатель на крестик закрытия попапа
        this._popup.addEventListener('click', (event) => { //// вешаем слушатель на область вокруг попапа для закрытия по клику
            if (event.target === event.currentTarget) { this.close(); }
        })
    }
}