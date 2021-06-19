const showInputError = (formElement, inputElement, errorMessage, options) => { // показываем какая ошибка  в inputElement 
    const errorElement = formElement.querySelector(`.${inputElement.id}-placeholder`); //// Выбираем элемент ошибки на основе уникального класса. В Практикуме это расплывчато описано. Я убил 4 часа пока меня не осенило (((
    inputElement.classList.add(options.inputErrorClass); //// Функция, которая добавляет класс с ошибкой
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
    inputElement.classList.remove(options.inputErrorClass); //// Функция, которая удаляет класс с ошибкой
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) { // проверяем на валидность поля  inputElement
        showInputError(formElement, inputElement, inputElement.validationMessage, options); // // Если поле не проходит валидацию, покажем ошибку    через функцию showInputError
    } else {
        hideInputError(formElement, inputElement, options); // Если проходит, скроем
    }
};

const toggleButtonState = (inputList, buttonElement, options) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, options) => { // 
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector)); //помещаем в переменную inputList массив значений с (*.popup__input) из обрабатываемого formElement
    const buttonElement = formElement.querySelector(options.submitButtonSelector); //помещаем в переменную buttonElement   (*.submit-button) из обрабатываемого formElement

    inputList.forEach((inputElement) => { // перебираем inputList
        inputElement.addEventListener('input', function() { //// Вызовем функцию  на каждый ввод символа в элемент inputList
            toggleButtonState(inputList, buttonElement, options);
            checkInputValidity(formElement, inputElement, options); // отправляем в checkInputValidity  обрабатываемый элемент formElement, formList и настройки  при вызове

        });
    });
};

const hasInvalidInput = (inputList) => { //проверяем на наличие хотябы одного невалидного инпута
    return inputList.some((inputElement) => { // проходим по этому массиву методом some
        return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true , // Обход массива прекратится и вся фунцкция // hasInvalidInput вернёт true
    })
};

const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector)); //помещаем массив с (*.popup__container) в переменную formList
    formList.forEach((formElement) => { // перебираем formList
        formElement.addEventListener('submit', function(evt) { //вешаем слушатель submit на каждый элемент formList
            evt.preventDefault(); // Отменим стандартное поведение по сабмиту
        });
        setEventListeners(formElement, options); // отправляем в setEventListeners  обрабатываемый элемент formList и настройки  при вызове 
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__form', // (popup__form) 
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button', //(popup__button)
    inactiveButtonClass: 'submit-button_disabled', //(popup__button_disabled)
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});