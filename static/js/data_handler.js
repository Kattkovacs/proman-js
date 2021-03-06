// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCards: function (callback, board_id) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get(`/get-cards/${board_id}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
    },

    addBoard: function (boardName, callback) {
        fetch(`/boards`, {
            method: 'POST',
            body: `name=${boardName}`,
            headers: {"Content-Type": "application/x-www-form-urlencoded",},
        })
            .then(promise => promise.json())
            .then(data => callback(data))
    },

    addCard: function (newCardContent, newCardStatus, newCardBoardId, callback) {
        this._api_post(`/cards`, {
            name: newCardContent,
            status: newCardStatus,
            board_id: newCardBoardId
        }, callback);
    },

    addStatus: function (newStatusContent,newStatusBoardId,callback) {
        this._api_post(`/new-status`, {
            name: newStatusContent,
            board_id: newStatusBoardId
        },callback);
    },

    deleteBoard: function(boardId,callback) {
        this._api_post(`/delete-board`, {
            board_id: boardId
        }, callback);
    },

    deleteCard: function (cardId, callback) {
        this._api_post(`/delete-card`, {
            card_id: cardId
        }, callback);
    },

    renameCard: function (cardId, newTitle, callback) {
        this._api_post(`/rename-card`, {
            card_id: cardId,
            new_title: newTitle
        }, callback)
    },

    renameBoard: function (boardId, newTitle, callback) {
        this._api_post(`/rename-board`, {
            board_id: boardId,
            new_title: newTitle
        }, callback)
    },

    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    }
    // here comes more features
};
