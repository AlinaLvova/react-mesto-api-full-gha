class Api{
    constructor(config){
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
        this.token = config.token;
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
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
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
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
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
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
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
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
              },
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
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,  
                'Content-Type': 'application/json'
              },
            method: 'PUT'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о добавлении лайка карточке от попользователе не были успешно обновлены на сервере")
        });
    }

    //убрать лайк с карточки
    deleteLike(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,  
                'Content-Type': 'application/json'
              },
            method: 'DELETE'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные об удалении лайка карточке от попользователе не были успешно обновлены на сервере")
        });    
    }

    //удалить карточку по id
    deleteCard(cardId){
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,  
                'Content-Type': 'application/json'
              },
            method: 'DELETE'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о карточке попользователе не были успешно удалены на сервере")
        });
    }

    //получить список карточек
    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,  
                'Content-Type': 'application/json'
              },
            method: 'GET'
        })
        .then((response) => {
            return this._handleResponse(response, "Данные о списке карт не были успешно получены")
        });    
    }
}   

const apiConfig = {
    // ЗДЕСЬ!
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://api.malina.nomoredomains.rocks',
    token: `Bearer ${localStorage.getItem('token')}`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }

const api = new Api(apiConfig);

export default api;