let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector ('.input__textname'); 
let jobInput = formElement.querySelector ('.input__textjob');
let Firstname = document.querySelector ('.forma__name');
let profession = document.querySelector ('.forma__profession');
let popup = document.querySelector ('.popup');
let EditButton = document.querySelector('.Profile-Info__EditButton');
let SubmitButton = document.querySelector('.SubmitButton');
let CloseIcon = document.querySelector('.Close-Icon');


function formSubmitHandler (evt) {
evt.preventDefault();
Firstname.textContent = nameInput.value;
profession.textContent = jobInput.value;
popup.classList.toggle('popup_opened');
}

function formCloseHandler () {
popup.classList.toggle('popup_opened');
}

function PopupOpened () {
popup.classList.add('popup_opened');
}

EditButton.addEventListener('click', PopupOpened); 
SubmitButton.addEventListener('click', formSubmitHandler);
CloseIcon.addEventListener('click', formCloseHandler); 