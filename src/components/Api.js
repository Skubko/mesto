export default class Api {
    constructor(config) {
        this._config = config;
        this._url = this._config.baseUrl;
        this._headers = this._config.headers;
    }

    //загружаем с сервера массив данных по карточкам
    getInitialCards() {
            return fetch(`${this._url}/cards`, {
                    method: "GET",
                    headers: this._headers
                })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    // если ошибка, отклоняем промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        }
        //-----------------------------------------------------------

    //загружаем с сервера массив данных по пользователю
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    recordAvatar(src) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: src.linkAvatar
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
};