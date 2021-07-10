import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';

// ----------------------------------------------------------------------------------------------------//

export const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button', //(popup__button)
    inactiveButtonClass: 'submit-button_disabled', //(popup__button_disabled)
    inputErrorClass: 'popup__input_type_error'
};

const firstName = document.querySelector('.forma__name');
const profession = document.querySelector('.forma__profession');
const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popupProfile');
const formElementProfile = popupProfile.querySelector('.popup__container');
const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
const nameInput = popupProfile.querySelector('#name');
const jobInput = popupProfile.querySelector('#job');
const closeIconProfile = popupProfile.querySelector('.close-icon');

const elements = document.querySelector('.elements'); // используется в отрисовке стандартных карточек
const elementTemplate = document.querySelector('#element-template').content;

const popupCard = document.querySelector('#popupCard');
const formElementCard = popupCard.querySelector('.popup__container');
const popupCardForm = popupCard.querySelector('#popupCardForm');
const nameCard = popupCard.querySelector('#nameCard');
const linkCard = popupCard.querySelector('#linkCard');
const closeIconCard = popupCard.querySelector('.close-icon');
const submitButtonCard = popupCard.querySelector('#submit-buttonCard');

export const popupPicture = document.querySelector('#popupPicture');
const formElementPicture = popupPicture.querySelector('.popup__figure');
export const popupImage = popupPicture.querySelector('.popup__image');
export const popupCaption = popupPicture.querySelector('.popup__caption');
const closeIconPicture = popupPicture.querySelector('.close-icon');
export const characteristics = {
    name: '',
    link: ''
};

function keyEscapeHandler(evt) { // обработчик закрытия  по "Escape"
    if (evt.key === "Escape") {
        const popupActiv = document.querySelector(".popup_opened");
        popupActiv.classList.remove("popup_opened");
    }
};

function popupOverlayHandler(evt) { // обработчик закрытия по клику на попап
    if (!(evt.target === formElementProfile)) {
        removePopup(evt.target);
    }
};

export function addPopup(popup) { // обработчик открытия попапа
    popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    document.addEventListener("keyup", keyEscapeHandler); // вешаем слушатель на клавиатуру для закрытия по "Escape"
    popup.addEventListener("click", popupOverlayHandler); // вешаем слушатель на область вокруг попапа для закрытия по клику

};


function removePopup(popup) { // обработчик закрытия попапа 
    popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", keyEscapeHandler); // удаляем слушатель на клавиатуру для закрытия по "Escape"
    popup.removeEventListener("click", popupOverlayHandler); // удаляем слушатель на область вокруг попапа для закрытия по клику
};

function formSubmitHandler(evt) { // обработчик закрытия редактора профиля
    evt.preventDefault();
    firstName.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    removePopup(popupProfile);
};

function formSubmitCard(evt) { // обработчик закрытия редактора карточки
    evt.preventDefault();


    characteristics.name = nameCard.value;
    characteristics.link = linkCard.value;
    renderCard(characteristics);
    removePopup(popupCard);
};

function openPopupEditProfile() { // открытие попапа редактирования профайла
    addPopup(popupProfile); //добавляем к popup класс popup_opened
    nameInput.value = firstName.textContent;
    jobInput.value = profession.textContent;
    popupProfileFormValidator.disableSubmitButton();
};

function openPopupAddCard() { // открытие попапа редактирования карточки с новой картинкой
    addPopup(popupCard); //добавляем к popup класс popup_opened
    nameCard.value = ''; //очищаем поля для новой карточки
    linkCard.value = '';
    popupCardFormFormValidator.disableSubmitButton();
};

function renderCard(elem) {
    characteristics.name = elem.name;
    characteristics.link = elem.link;
    const cardStandart = new Card(characteristics, '#element-template');
    const cardElement = cardStandart.generateCard();
    elements.prepend(cardElement); //  добавление карточки на страницу
};

initialCards.forEach((elem) => { //Отрисовка  стандартных карточек
    renderCard(elem);
});

const popupProfileFormValidator = new FormValidator(settings, '#popupProfileForm');
popupProfileFormValidator.enableValidation();
const popupCardFormFormValidator = new FormValidator(settings, '#popupCardForm');
popupCardFormFormValidator.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', openPopupAddCard); //   вешаем слушатель на кнопку добавления новой карточки
closeIconProfile.addEventListener('click', () => removePopup(popupProfile)); //   вешаем слушатель на крестик закрытия попапа профайла
closeIconCard.addEventListener('click', () => removePopup(popupCard)); //   вешаем слушатель на крестик закрытия попапа новой карточки
closeIconPicture.addEventListener('click', () => removePopup(popupPicture)); //   вешаем слушатель на крестик закрытия попапа картинки на весь экран
popupProfileForm.addEventListener('submit', formSubmitHandler); //   вешаем слушатель на кнопку =Cохранить= редактирования профайла
popupCardForm.addEventListener('submit', formSubmitCard); //   вешаем слушатель на кнопку =Создать= добавления новой карточки