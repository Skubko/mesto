export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(initialCards, user_id) {
        initialCards.forEach(item => { this._renderer(item, user_id) }); //Отрисовка  стандартных карточек
    }

    addItem(element) {
        this._container.prepend(element);
    }
}