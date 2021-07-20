import './index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"

export const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button', //(popup__button)
    inactiveButtonClass: 'submit-button_disabled', //(popup__button_disabled)
    inputErrorClass: 'popup__input_type_error'
};

const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popupProfile');
const nameInput = popupProfile.querySelector('#name');
const jobInput = popupProfile.querySelector('#job');

const elementTemplate = '#element-template';

const popupCard = document.querySelector('#popupCard');
const nameCard = popupCard.querySelector('#nameCard');
const linkCard = popupCard.querySelector('#linkCard');

export const popupPicture = document.querySelector('#popupPicture');
export const popupCaption = popupPicture.querySelector('.popup__caption');


const cardSection = new Section( //Создаем экземпляр класса Section для секции с карточками
    { items: initialCards, renderer: (elem) => renderCard(elem) }, '.elements');
cardSection.renderItems();

function renderCard(elem) {
    const Element = createCard(elem);
    cardSection.addItem(Element); //  добавление карточки на страницу
};

function createCard(elem) {
    const cardStandart = new Card(elem, elementTemplate, handleCardClick);
    const cardElement = cardStandart.generateCard();
    return cardElement;
};

function handleCardClick(Name, Link) {
    const elem = {
        name: Name,
        link: Link
    };
    popupImage.open(elem);
};

const popupImage = new PopupWithImage('#popupPicture'); //Экземпляр попапа картинки карточки
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('#popupCard', (formValues) => { //Экземпляр попапа добавления карточки
    submitAddCardForm(formValues);
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('#popupProfile', (formValues) => submitProfileForm(formValues));
//Экземпляр попапа профиля
popupEditProfile.setEventListeners();

const userInfo = new UserInfo('.forma__name', '.forma__profession'); //Экземпляр инфо пользователя из профайла

function submitProfileForm(formValues) { //Функция сохранения профиля
    userInfo.setUserInfo(formValues);
    popupEditProfile.close();
};

function submitAddCardForm(formValues) { //Функция сохранения карточки
    const elem = {
        name: formValues.nameCard,
        link: formValues.linkCard,
        alt: formValues.nameCard //Alt для новых карточек берём из названия фото
    };
    renderCard(elem);
    popupAddCard.close();
    popupCardFormFormValidator.resetValidation();
};

function openPopupEditProfile() { // открытие попапа редактирования профайла
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.userName;
    jobInput.value = userInfoData.userJob;
    popupProfileFormValidator.disableSubmitButton();
    popupProfileFormValidator.resetValidation();
    popupEditProfile.open() //добавляем к popup класс popup_opened
};


function openPopupAddCard() { // открытие попапа редактирования карточки с новой картинкой
    popupAddCard.open(); //добавляем к popup класс popup_opened
    nameCard.value = ''; //очищаем поля для новой карточки
    linkCard.value = '';
    popupCardFormFormValidator.disableSubmitButton();
    popupCardFormFormValidator.resetValidation();
};

const popupProfileFormValidator = new FormValidator(settings, '#popupProfileForm');
popupProfileFormValidator.enableValidation();

const popupCardFormFormValidator = new FormValidator(settings, '#popupCardForm');
popupCardFormFormValidator.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', openPopupAddCard); //   вешаем слушатель на кнопку добавления новой карточки