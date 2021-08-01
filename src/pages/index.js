import './index.css'; // добавьте импорт главного файла стилей и прописать новые стили из этого файла
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

export const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button', //(popup__button)
    inactiveButtonClass: 'submit-button_disabled', //(popup__button_disabled)
    inputErrorClass: 'popup__input_type_error'
};

const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileFoto = document.querySelector('.profile__foto');

const popupProfile = document.querySelector('#popupProfile');
const popupProfileSubmit = popupProfile.querySelector('#submit-buttonCard');
const nameInput = popupProfile.querySelector('#name');
const jobInput = popupProfile.querySelector('#job');

const elementTemplate = '#element-template';

const popupDelCard = document.querySelector('#popupDeleteCard');
const popupDelCardSubmit = popupDelCard.querySelector('#submit-buttonCard');
const popupAvatar = document.querySelector('#popupAvatar');
const popupAvatarSubmit = popupAvatar.querySelector('#submit-buttonCard');
const popupCard = document.querySelector('#popupCard');
const popupCardSubmit = popupCard.querySelector('#submit-buttonCard');


const nameCard = popupCard.querySelector('#nameCard');
const linkCard = popupCard.querySelector('#linkCard');

export const popupPicture = document.querySelector('#popupPicture');
export const popupCaption = popupPicture.querySelector('.popup__caption');


const api = new Api({ //Создаем экземпляр класса Api для скачивания с сервера карточек
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '0e068af8-88a5-4ce4-b9ce-65414eeaa755',
        'Content-Type': 'application/json'
    }
});

let initialCards = [{ // объявляем массив куда сложим все карточки
    createdAt: "",
    likes: [],
    link: "",
    name: "",
    owner: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
        cohort: ""
    },
    _id: ""
}];

const userInfo = new UserInfo('.forma__name', '.forma__profession', '.profile__foto'); //Экземпляр инфо пользователя из профайла
let initialUserInfo = [{ // объявляем массив куда сложим все данные о пользователе с сервера
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: ""
}];

let user_Id; // объявляем переменную куда сложим ID пользователя с сервера

const cardSection = new Section( //Создаем экземпляр класса Section для секции с карточками
    { renderer: (elem, user_id) => renderCard(elem, user_id) }, '.elements');


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(values => {
        user_Id = values[1]._id;
        initialUserInfo = values[1];
        initialCards = values[0];
        cardSection.renderItems(values[0], user_Id);
        userInfo.setUserInfo(initialUserInfo);
    })
    .catch(err => console.log(err));

function renderCard(elem, user_id) {
    const Element = createCard(elem, user_id);
    cardSection.addItem(Element); //  добавление карточки на страницу
};

function createCard(elem, user_id) { // создаем экземпляр класса Card для очередной карточки из массива карточек с сервера
    const cardStandart = new Card(elem, elementTemplate, handleCardClick, user_id, handleDeleteCard, handleChangeLike);
    const cardElement = cardStandart.generateCard();
    return cardElement;
};

function handleChangeLike(id, check) {
    if (check === 1) {
        api.deleteLike(id).then((data) => { //  // Отправляем измененные данные профайла на сервер
        });
    } else {
        api.addLike(id).then((data) => { //  // Отправляем измененные данные профайла на сервер
        });
    };
};


const popupImage = new PopupWithImage('#popupPicture'); //Экземпляр попапа картинки карточки
popupImage.setEventListeners();

function handleCardClick(Name, Link) {
    const elem = {
        name: Name,
        link: Link
    };
    popupImage.open(elem);
};


//---------------------------------------------------------------------
const popupEditAvatar = new PopupWithForm('#popupAvatar', (link) => submitAvatarForm(link));
//Экземпляр попапа профиля
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
    popupEditAvatar.open();
    popupCardFormFormValidator.disableSubmitButton();
    popupCardFormFormValidator.resetValidation();
};

function submitAvatarForm(src) { //Функция сохранения аватара
    popupAvatarSubmit.textContent = 'Сохранение...';
    profileFoto.src = src.linkAvatar; //записываем измененные данные аватара на экран
    api.recordAvatar(src)
        .then((data) => { //  // Отправляем измененные данные аватара на сервер
        })
        .catch(err => console.log(err))
        .finally(() => { popupAvatarSubmit.textContent = 'Сохранить'; });
    popupEditAvatar.close();
};

//--------------------------------------------------------------------------------------------------------

const popupEditProfile = new PopupWithForm('#popupProfile', (formValues) => submitProfileForm(formValues, user_Id));
//Экземпляр попапа профиля
popupEditProfile.setEventListeners();

function submitProfileForm(formValues) { //Функция сохранения профиля
    popupProfileSubmit.textContent = 'Сохранение...';
    userInfo.setUserInfo(formValues); //записываем измененные данные профайла на экран
    api.recordProfile(nameInput.value, jobInput.value)
        .then((data) => { //  // Отправляем измененные данные профайла на сервер
            userInfo.setUserInfo(data); //  отправляем массив с данными пользователя ответ с сервера для вывода на страницу
        })
        .catch(err => console.log(err))
        .finally(() => { popupProfileSubmit.textContent = 'Сохранить'; });
    popupEditProfile.close();

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
    const elem = {
        name: formValues.nameCard,
        link: formValues.linkCard,
        alt: formValues.nameCard, //Alt для новых карточек берём из названия фото
        owner: {
            _id: user_Id
        },
        likes: []
    };
    renderCard(elem, user_Id);
    api.recordNewCard(elem.name, elem.link)
        .then((data) => { //  // Отправляем измененные данные карточки на сервер
            const initialCards = data; // массив с карточками с сервера помещаем в initialCards
        })
        .catch(err => console.log(err))
        .finally(() => { popupCardSubmit.textContent = 'Создать'; });

    popupAddCard.close();
    popupCardFormFormValidator.resetValidation();

};

//---------------------------------------------------------------------------------------------

const popupDeleteCard = new PopupWithSubmit('#popupDeleteCard', (id) => { //Экземпляр попапа подтверждения удаления карточки
    popupDelCardSubmit.textContent = 'Удаление...';
    api.deleteCard(id)
        .then(() => { popupDeleteCard.close(); }) // после потдверждения от сервера удаления карточки, удаляем карточку.
        .catch(err => console.log(err))
        .finally(() => { popupDelCardSubmit.textContent = 'Удалить'; })
});

popupDeleteCard.setEventListeners();

function handleDeleteCard(id) {
    popupDeleteCard.open(id);
};
//------------------------------------------------------------------------------------------------




const popupProfileFormValidator = new FormValidator(settings, '#popupProfileForm');
popupProfileFormValidator.enableValidation();

const popupCardFormFormValidator = new FormValidator(settings, '#popupCardForm');
popupCardFormFormValidator.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', openPopupAddCard); //   вешаем слушатель на кнопку добавления новой карточки
profileFoto.addEventListener('click', openPopupEditAvatar); //   вешаем слушатель на фото аватара