import { settings } from "./index.js";

export default class FormValidator {
    constructor(settings, formSelector) {
        this._form = document.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(settings.inputSelector);
        this._submitButton = this._form.querySelector(settings.submitButtonSelector);
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass
    }

    enableValidation() { //Включение валидации
        this._setEventListeners();
    }

    _setEventListeners() { //Вешаем слушатели
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => { //// Вызовем функцию  на каждый ввод символа в элемент inputList
                this._checkInputValidity(inputElement); // отправляем в checkInputValidity  обрабатываемый элемент   
                this._toggleButtonState();
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) { // проверяем на валидность поля  inputElement
            this._showInputError(inputElement); // // Если поле не проходит валидацию, покажем ошибку    через функцию showInputError
        } else {
            this._hideInputError(inputElement); // Если проходит, скроем
        }
    }

    _showInputError(inputElement) { // показываем какая ошибка  в inputElement 
        const errorElement = this._form.querySelector(`.${inputElement.id}-placeholder`); //// Выбираем элемент ошибки на основе уникального класса. В Практикуме это расплывчато описано. Я убил 4 часа пока меня не осенило (((
        inputElement.classList.add(this._inputErrorClass); //// Функция, которая добавляет класс с ошибкой
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-placeholder`);
        inputElement.classList.remove(this._inputErrorClass); //// Функция, которая удаляет класс с ошибкой
        errorElement.textContent = '';
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() { //проверяем на наличие хотябы одного невалидного инпута
        return Array.from(this._inputList).some((inputElement) => { // проходим по этому массиву методом some
            return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true , // Обход массива прекратится и вся фунцкция // hasInvalidInput вернёт true
        })
    }
    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
    }
}