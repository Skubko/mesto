const firstName = document.querySelector('.forma__name');
const profession = document.querySelector('.forma__profession');
const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');


const popupProfile = document.querySelector('#popupProfile');
const formElementProfile = popupProfile.querySelector('.popup__container');
const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
const nameInput = popupProfile.querySelector('input[name=name]');
const jobInput = popupProfile.querySelector('input[name=job]');
const closeIconProfile = popupProfile.querySelector('.close-icon');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupCard = document.querySelector('#popupCard');
const formElementCard = popupCard.querySelector('.popup__container');
const popupCardForm = popupCard.querySelector('#popupCardForm');
const nameCard = popupCard.querySelector('input[name=nameCard]');
const linkCard = popupCard.querySelector('input[name=linkCard]');
const closeIconCard = popupCard.querySelector('.close-icon');

const popupPicture = document.querySelector('#popupPicture');
const formElementPicture = popupPicture.querySelector('.popup__figure');
const popupImage = popupPicture.querySelector('.popup__image');
const popupCaption = popupPicture.querySelector('.popup__caption');
const closeIconPicture = popupPicture.querySelector('.close-icon');
const popup = "";

function formSubmitHandler(evt) { // обработчик закрытия редактора профиля
    evt.preventDefault();
    firstName.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    popupProfile.classList.toggle('popup_opened');
}

function formSubmitCard(evt) { // обработчик закрытия редактора карточки
    evt.preventDefault();
    const card = {
        name: nameCard.value,
        link: linkCard.value
    }
    const newCard = createNewCard(card);
    renderCard(newCard);
    popupCard.classList.toggle('popup_opened');
}



function popupEditProfileOpened() { // открытие попапа редактирования профайла
    popupProfile.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    nameInput.value = firstName.textContent;
    jobInput.value = profession.textContent;
}

function popupAddCardOpened() { // открытие попапа редактирования карточки с новой картинкой
    popupCard.classList.add('popup_opened'); //добавляем к popup класс popup_opened
}

function popupPictureOpen(name, link) { //Открываем попап с картинкой на весь экран
    popupPicture.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}

function handleLikeCard(evt) { //Функция лайка карточки
    evt.target.classList.toggle('element__heart_active');
}

function handleDeleteCard(evt) { //Функция удаления карточки
    evt.target.closest('.element').remove();
}

function createNewCard(card) { //Функция рендера отдельной карточки
    const cloneOfCard = elementTemplate.cloneNode(true); //Клонируем шаблон
    cloneOfCard.querySelector('.element__name').innerText = card.name; //Присваиваем имя карточки
    const cardImage = cloneOfCard.querySelector('.element__img'); //Записываем элемент фото карточки
    cardImage.setAttribute('src', card.link); //Присваиваем ссылку на карточку
    cardImage.setAttribute('alt', card.name); //Присваиваем атрибуту alt значение названия картинки
    cloneOfCard.querySelector('.element__button-delete').addEventListener('click', handleDeleteCard); //Выбираем кнопку удалить карточку и сразу вешаем слушатель
    cloneOfCard.querySelector('.element__heart').addEventListener('click', handleLikeCard); //Выбираем кнопку сердечко и сразу вешаем слушатель
    cardImage.addEventListener('click', () => popupPictureOpen(card.name, card.link)); //Выбираем картинку и сразу вешаем слушатель
    return cloneOfCard;
};

function renderCard(elem) { //Функция добавления карточки на страницу
    elements.prepend(elem);
};


initialCards.forEach((card) => { //Отрисовка  стандартных карточек
    const newCard = createNewCard(card);
    renderCard(newCard);
});


editButton.addEventListener('click', popupEditProfileOpened); //   вешаем слушатель на кнопку редактирования профайла
addButton.addEventListener('click', popupAddCardOpened); //   вешаем слушатель на кнопку добавления новой карточки
closeIconProfile.addEventListener('click', () => popupProfile.classList.remove('popup_opened')); //   вешаем слушатель на крестик закрытия попапа профайла
closeIconCard.addEventListener('click', () => popupCard.classList.remove('popup_opened')); //   вешаем слушатель на крестик закрытия попапа новой карточки
closeIconPicture.addEventListener('click', () => popupPicture.classList.remove('popup_opened')); //   вешаем слушатель на крестик закрытия попапа кардинки на весь экран
popupProfileForm.addEventListener('submit', formSubmitHandler); //   вешаем слушатель на кнопку =Cохранить= редактирования профайла
popupCardForm.addEventListener('submit', formSubmitCard); //   вешаем слушатель на кнопку =Создать= добавления новой карточки