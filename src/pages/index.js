import './index.css'; // добавьте импорт главного файла стилей

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initialCards.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const popupCard = document.querySelector('#popupCard');
const nameCard = popupCard.querySelector('#nameCard');
const linkCard = popupCard.querySelector('#linkCard');

export const popupPicture = document.querySelector('#popupPicture');
export const popupImage = popupPicture.querySelector('.popup__image');
export const popupCaption = popupPicture.querySelector('.popup__caption');
export const characteristics = { name: '', link: '' };


const cardSection = new Section( //Создаем экземпляр класса Section для секции с карточками
    { items: initialCards, renderer: (elem) => renderCard(elem) }, '.elements');
cardSection.renderItems();

function renderCard(elem) {
    const cardStandart = new Card(elem, '#element-template', handleCardClick);
    const cardElement = cardStandart.generateCard();
    cardSection.addItem(cardElement); //  добавление карточки на страницу
};

function handleCardClick(Name, Link) {
    const elem = {
        name: Name,
        link: Link
    };
    imagePopup.open(elem);
};

const imagePopup = new PopupWithImage('#popupPicture'); //Экземпляр попапа картинки карточки
imagePopup.setEventListeners();

const addCardPop = new PopupWithForm('#popupCard', (formValues) => { //Экземпляр попапа добавления карточки
    submitAddCardForm(formValues);
});
addCardPop.setEventListeners();

const editProfilePop = new PopupWithForm('#popupProfile', (formValues) => submitProfileForm(formValues));
//Экземпляр попапа профиля
editProfilePop.setEventListeners();

const userInfo = new UserInfo('.forma__name', '.forma__profession'); //Экземпляр инфо пользователя из профайла

function submitProfileForm(formValues) { //Функция сохранения профиля
    userInfo.setUserInfo(formValues);
    editProfilePop.close();
};

function submitAddCardForm(formValues) { //Функция сохранения карточки
    const elem = {
        name: formValues.nameCard,
        link: formValues.linkCard,
        alt: formValues.nameCard //Alt для новых карточек берём из названия фото
    };
    renderCard(elem);
    addCardPop.close();
    popupCardFormFormValidator.resetValidation();
};

function openPopupEditProfile() { // открытие попапа редактирования профайла
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.userName;
    jobInput.value = userInfoData.userJob;
    popupProfileFormValidator.disableSubmitButton();
    editProfilePop.open() //добавляем к popup класс popup_opened
};


function openPopupAddCard() { // открытие попапа редактирования карточки с новой картинкой
    addCardPop.open(); //добавляем к popup класс popup_opened
    nameCard.value = ''; //очищаем поля для новой карточки
    linkCard.value = '';
    popupCardFormFormValidator.disableSubmitButton();
};

const popupProfileFormValidator = new FormValidator(settings, '#popupProfileForm');
popupProfileFormValidator.enableValidation();

const popupCardFormFormValidator = new FormValidator(settings, '#popupCardForm');
popupCardFormFormValidator.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', openPopupAddCard); //   вешаем слушатель на кнопку добавления новой карточки