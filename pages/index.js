const formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('input[name=name]'); 
let jobInput = formElement.querySelector('input[name=job]'); 
let firstName = document.querySelector('.forma__name');
let profession = document.querySelector('.forma__profession');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeIcon = document.querySelector('.close-icon');
let forma = document.querySelector('.popup__forma');

function popupOpened () {
popup.classList.add('popup_opened'); 
nameInput.value = firstName.textContent;
jobInput.value = profession.textContent;
}

function formCloseHandler () {
popup.classList.remove('popup_opened'); 
}
    
function formSubmitHandler (evt) {
evt.preventDefault();
firstName.textContent = nameInput.value;
profession.textContent = jobInput.value;
popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupOpened);
closeIcon.addEventListener('click', formCloseHandler);
forma.addEventListener('submit', formSubmitHandler);