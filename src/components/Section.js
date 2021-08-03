export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(initialCards, userId) {
        initialCards.forEach(item => { this._renderer(item, userId) }); //Отрисовка  стандартных карточек
    }

    addItem(element) {
        this._container.prepend(element);
    }
}