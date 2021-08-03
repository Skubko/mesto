const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button', //(popup__button)
    inactiveButtonClass: 'submit-button_disabled', //(popup__button_disabled)
    inputErrorClass: 'popup__input_type_error'
};
const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileFoto = document.querySelector('.profile__foto');

const popupProfile = document.querySelector('#popupProfile');
const popupProfileSubmit = popupProfile.querySelector('#submit-buttonProfile');
const nameInput = popupProfile.querySelector('#name');
const jobInput = popupProfile.querySelector('#job');

const elementTemplate = '#element-template';

const popupDelCard = document.querySelector('#popupDeleteCard');
const popupDelCardSubmit = popupDelCard.querySelector('#submit-buttonDelCard');
const popupAvatar = document.querySelector('#popupAvatar');
const popupAvatarSubmit = popupAvatar.querySelector('#submit-buttonAvatar');
const popupCard = document.querySelector('#popupCard');
const popupCardSubmit = popupCard.querySelector('#submit-buttonCard');


const nameCard = popupCard.querySelector('#nameCard');
const linkCard = popupCard.querySelector('#linkCard');

const popupPicture = document.querySelector('#popupPicture');
const popupCaption = popupPicture.querySelector('.popup__caption');

export {
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
};