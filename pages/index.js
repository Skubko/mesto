
const firstName = document.querySelector('.forma__name');
const profession = document.querySelector('.forma__profession');
const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');


const popupProfile = document.querySelector('#popupProfile');
const formElementProfile = popupProfile.querySelector('.popup__container');
const formaProfile = popupProfile.querySelector('#formaProfile');
const nameInput = popupProfile.querySelector('input[name=name]'); 
const jobInput = popupProfile.querySelector('input[name=job]');
const closeIconProfile = popupProfile.querySelector('.close-icon');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupCard = document.querySelector('#popupCard');
const formElementCard = popupCard.querySelector('.popup__container');
const formaCard = popupCard.querySelector('#formaCard');
const nameCard = popupCard.querySelector('input[name=nameCard]'); 
const linkCard = popupCard.querySelector('input[name=linkCard]');
const closeIconCard = popupCard.querySelector('.close-icon');

const popupPicture = document.querySelector('#popupPicture');
const formElementPicture = popupPicture.querySelector('.popup__figure');
const popupImage = popupPicture.querySelector('.popup__image');
const popupCaption = popupPicture.querySelector('.popup__caption');
const closeIconPicture = popupPicture.querySelector('.close-icon');

function formSubmitHandler (evt) {// обработчик закрытия редактора профиля
evt.preventDefault();
firstName.textContent = nameInput.value;
profession.textContent = jobInput.value;
popupProfile.classList.toggle('popup_opened');
}

function formSubmitCard (evt) {// обработчик закрытия редактора карточки
evt.preventDefault();
const card = {
      name: nameCard.value,
      link: linkCard.value
    }
const newCard = createNewCard(card);
renderCard(newCard);
popupCard.classList.toggle('popup_opened');
    }



function popupEditProfileOpened () {// открытие попапа редактирования профайла
popupProfile.classList.add('popup_opened'); 
nameInput.value = firstName.textContent;
jobInput.value = profession.textContent;
formaProfile.addEventListener('submit', formSubmitHandler);
}

function popupAddCardOpened () {// открытие попапа редактирования карточки с новой картинкой
popupCard.classList.add('popup_opened');
formaCard.addEventListener('submit', formSubmitCard);
}

function formCloseHandlerProfile () {// закрываем попап с профайлом по крестику
    popupProfile.classList.remove('popup_opened'); 
}

function formCloseHandlerCard () {// закрываем попап с новой карточкой по крестику
  popupCard.classList.remove('popup_opened'); 
}

function formCloseHandlerPicture () {// закрываем попап с картинкой на весь экран по крестику
  popupPicture.classList.remove('popup_opened'); 
}


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  
  function likeCard(evt) {  //Функция лайка карточки
    evt.target.classList.toggle('element__heart_active');
  }

  function deleteCard(evt) {  //Функция удаления карточки
    evt.target.closest('.element').remove();
  }
  
  function popupPictureOpen(name, link) { //Открываем попап с картинкой на весь экран
    popupPicture.classList.add('popup_opened'); 
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    
  }

  
function createNewCard(card) {  //Функция рендера отдельной карточки
    const cloneOfCard = elementTemplate.cloneNode(true); //Клонируем шаблон
    cloneOfCard.querySelector('.element__name').innerText = card.name; //Присваиваем имя карточки
    const cardImage = cloneOfCard.querySelector('.element__img'); //Записываем элемент фото карточки
    cardImage.setAttribute('src', card.link); //Присваиваем ссылку на карточку
    cloneOfCard.querySelector('.element__button-delete').addEventListener('click', deleteCard); //Выбираем кнопку удалить карточку и сразу вешаем слушатель
    cloneOfCard.querySelector('.element__heart').addEventListener('click', likeCard); //Выбираем кнопку сердечко и сразу вешаем слушатель
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


    editButton.addEventListener('click', popupEditProfileOpened);         //   вешаем слушатель на кнопку редактирования профайла
    addButton.addEventListener('click', popupAddCardOpened);              //   вешаем слушатель на кнопку добавления новой карточки
    closeIconProfile.addEventListener('click', formCloseHandlerProfile);  //   вешаем слушатель на крестик закрытия попапа профайла
    closeIconCard.addEventListener('click', formCloseHandlerCard);        //   вешаем слушатель на крестик закрытия попапа новой карточки
    closeIconPicture.addEventListener('click', formCloseHandlerPicture);  //   вешаем слушатель на крестик закрытия попапа кардинки на весь экран