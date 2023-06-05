class Api{
    constructor(config){
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    // функция обработки результата ответа сервера
    _handleResponse (response, errorMessage) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}. Сообщение об ошибке: ${errorMessage}`));
    };

    sentCard({name, link}){
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((response) => {
            return this._handleResponse(response, "Данные добавленной карты не были успешно получены сервером")
        });
    }

    //обновление данных о пользователе на сервере
    updateUserInfo(name, about){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о пользователе не были успешно обновлены на сервере")
        });
    }

    //обновить аватар
    updateAvatar(avatar){
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then((response) => {
            return this._handleResponse(response, "Фото аватара не было успешно обновлено на сервере")
        });
    }

    //получить информацию о пользователе
    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: 'GET'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о пользователе не были успешно получены")
        });
    }

    //поменять статус лайка на карточке
    changeLikeCardStatus(cardId, isLiked){
        if (!isLiked)
            return this.deleteLike(cardId);
        else
            return this.setLike(cardId);
    }
    
    //поставить лайк карточке
    setLike(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: 'PUT'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о добавлении лайка карточке от попользователе не были успешно обновлены на сервере")
        });
    }

    //убрать лайк с карточки
    deleteLike(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: 'DELETE'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные об удалении лайка карточке от попользователе не были успешно обновлены на сервере")
        });    
    }

    //удалить карточку по id
    deleteCard(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            headers: this.headers,
            method: 'DELETE'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о карточке попользователе не были успешно удалены на сервере")
        });
    }

    //получить список карточек
    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: 'GET'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о списке карт не были успешно получены")
        });    
    }
}   

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      'Authorization': '615ec7c0-c05d-4e3c-8fba-c9ef3b1c5572',
      'Content-Type': 'application/json'
    }
  }

const api = new Api(apiConfig);

export default api;