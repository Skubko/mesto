export default class Api {
    constructor(config) {
        this._config = config;
        this._url = this._config.baseUrl;
        this._headers = this._config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //загружаем с сервера массив данных по карточкам
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    //-----------------------------------------------------------

    //загружаем с сервера массив данных по пользователю
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    recordProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._checkResponse);
    }

    recordNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    recordAvatar(src) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: src.linkAvatar
                })
            })
            .then(this._checkResponse);
    }

};