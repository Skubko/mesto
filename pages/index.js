let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector ('.input_textname'); 
let jobInput = formElement.querySelector ('.input_textjob');
let firstName = document.querySelector ('.forma__name');
let profession = document.querySelector ('.forma__profession');
let popup = document.querySelector ('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let submitButton = document.querySelector('.submit-button');
let closeIcon = document.querySelector('.close-icon');


function formSubmitHandler (evt) {
evt.preventDefault();
firstName.textContent = nameInput.value;
profession.textContent = jobInput.value;
popup.classList.toggle('popup_opened');
}

function formCloseHandler () {
popup.classList.toggle('popup_opened');
}

function PopupOpened () {
popup.classList.add('popup_opened');
}

editButton.addEventListener('click', PopupOpened); 
submitButton.addEventListener('click', formSubmitHandler);
closeIcon.addEventListener('click', formCloseHandler); 