import './index.css'; // добавьте импорт главного файла стилей и прописать новые стили из этого файла
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import {
    settings,
    editButton,
    addButton,
    profileFoto,
    popupProfile,
    popupProfileSubmit,
    nameInput,
    jobInput,
    elementTemplate,
    popupDelCard,
    popupDelCardSubmit,
    popupAvatar,
    popupAvatarSubmit,
    popupCard,
    popupCardSubmit,
    nameCard,
    linkCard,
    popupPicture,
    popupCaption
} from "../utils/constants.js";


const api = new Api({ //Создаем экземпляр класса Api для скачивания с сервера карточек
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '0e068af8-88a5-4ce4-b9ce-65414eeaa755',
        'Content-Type': 'application/json'
    }
});



const userInfo = new UserInfo('.forma__name', '.forma__profession', '.profile__foto'); //Экземпляр инфо пользователя из профайла

let initialUserInfo = {}; // объявляем объект куда сложим всю информацию о пользователе с сервера
let userId; // объявляем переменную куда сложим ID пользователя с сервера

const cardSection = new Section( //Создаем экземпляр класса Section для секции с карточками
    { renderer: (elem, user_id) => renderCard(elem, user_id) }, '.elements');


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(values => {
        userId = values[1]._id;
        initialUserInfo = values[1];
        cardSection.renderItems(values[0], userId);
        userInfo.setUserInfo(values[1]);;
    })
    .catch(err => console.log(err));

function renderCard(elem, userId) {
    const element = createCard(elem, userId);
    cardSection.addItem(element); //  добавление карточки на страницу
};

function createCard(elem, userId) { // создаем экземпляр класса Card для очередной карточки из массива карточек с сервера
    const cardStandart = new Card(elem, elementTemplate, handleCardClick, userId, handleDeleteCard, handleChangeLike);
    const cardElement = cardStandart.generateCard();
    return cardElement;
};

function handleChangeLike(id, check, card) {
    if (check) {
        api.deleteLike(id)
            .then(res => {
                card.updateLikes(res.likes.length);
            })
            .catch(err => catchError(err))
    } else {
        api.addLike(id)
            .then(res => {
                card.updateLikes(res.likes.length);
            })
            .catch(err => catchError(err))
    };
};


const popupImage = new PopupWithImage('#popupPicture'); //Экземпляр попапа картинки карточки
popupImage.setEventListeners();

function handleCardClick(name, link) {
    const elem = {
        name: name,
        link: link
    };
    popupImage.open(elem);
};




//---------------------------------------------------------------------
const popupEditAvatar = new PopupWithForm('#popupAvatar', (link) => submitAvatarForm(link));
//Экземпляр попапа профиля
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
    popupEditAvatar.open();
    popupAvatarFormFormValidator.disableSubmitButton();
    popupAvatarFormFormValidator.resetValidation();
};

function submitAvatarForm(src) { //Функция сохранения аватара
    popupAvatarSubmit.textContent = 'Сохранение...';
    api.recordAvatar(src) // Отправляем измененные данные аватара на сервер
        .then((data) => {
            initialUserInfo.avatar = src.linkAvatar;
            userInfo.setUserInfo(initialUserInfo); // записываем измененные данные аватара на экран
            popupAvatarSubmit.textContent = 'Сохранить';
        })
        .catch(err => console.log(err));
    popupEditAvatar.close();
};


//--------------------------------------------------------------------------------------------------------

const popupEditProfile = new PopupWithForm('#popupProfile', (formValues) => submitProfileForm(formValues));
//Экземпляр попапа профиля
popupEditProfile.setEventListeners();

function submitProfileForm(formValues) { //Функция сохранения профиля
    popupProfileSubmit.textContent = 'Сохранение...';
    api.recordProfile(formValues.name, formValues.job)
        .then((data) => { //  // Отправляем измененные данные профайла на сервер
            userInfo.setUserInfo(data); //  отправляем массив с данными пользователя ответ с сервера для вывода на страницу
            popupProfileSubmit.textContent = 'Сохранить';
            popupEditProfile.close();
        })
        .catch(err => console.log(err));
};

function openPopupEditProfile() { // открытие попапа редактирования профайла
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.name;
    jobInput.value = userInfoData.about;
    popupProfileFormValidator.disableSubmitButton();
    popupProfileFormValidator.resetValidation();
    popupEditProfile.open() //добавляем к popup класс popup_opened
};
//--------------------------------------------------------------------------------------------------------------
const popupAddCard = new PopupWithForm('#popupCard', (formValues) => { //Экземпляр попапа добавления карточки
    submitAddCardForm(formValues)
});
popupAddCard.setEventListeners();

function openPopupAddCard() { // открытие попапа редактирования карточки с новой картинкой
    popupAddCard.open(); //добавляем к popup класс popup_opened
    nameCard.value = ''; //очищаем поля для новой карточки
    linkCard.value = '';
    popupCardFormFormValidator.disableSubmitButton();
    popupCardFormFormValidator.resetValidation();
};

function submitAddCardForm(formValues) { //Функция сохранения карточки
    popupCardSubmit.textContent = 'Сохранение...';
    api.recordNewCard(formValues.nameCard, formValues.linkCard)
        .then((data) => { //  // Отправляем измененные данные карточки на сервер
            renderCard(data, userId);
            popupCardSubmit.textContent = 'Создать';
            popupAddCard.close();
            popupCardFormFormValidator.resetValidation();
        })
        .catch(err => console.log(err));
};

//---------------------------------------------------------------------------------------------

const popupDeleteCard = new PopupWithSubmit('#popupDeleteCard', (id, card) => { //Экземпляр попапа подтверждения удаления карточки
    popupDelCardSubmit.textContent = 'Удаление...';
    api.deleteCard(id)
        .then(() => {
            popupDeleteCard.close();
            card.deleteCard(); // удаляем карточку по ее this. (в данном случае card.) 
            popupDelCardSubmit.textContent = 'Удалить';
        }) // после подтверждения от сервера удаления карточки, удаляем карточку.
        .catch(err => console.log(err))
});

popupDeleteCard.setEventListeners();

function handleDeleteCard(id, card) {
    popupDeleteCard.open(id, card); //передаем в класс popupDeleteCard id удаляемой карточки и ее this.
};
//------------------------------------------------------------------------------------------------




const popupProfileFormValidator = new FormValidator(settings, '#popupProfileForm');
popupProfileFormValidator.enableValidation();

const popupCardFormFormValidator = new FormValidator(settings, '#popupCardForm');
popupCardFormFormValidator.enableValidation();

const popupAvatarFormFormValidator = new FormValidator(settings, '#popupAvatar');
popupAvatarFormFormValidator.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', openPopupAddCard); //   вешаем слушатель на кнопку добавления новой карточки
profileFoto.addEventListener('click', openPopupEditAvatar); //   вешаем слушатель на фото аватара