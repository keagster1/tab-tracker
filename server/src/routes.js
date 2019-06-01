const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')
const isAuthenticated = require('./policies/IsAuthenticated')

module.exports = (app) => {
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    app.get('/songs', SongsController.index)
    app.get('/songs/:songId', SongsController.show)
    app.put('/songs/:songId', SongsController.put)
    app.post('/songs', SongsController.post)
    
    app.get('/bookmarks', isAuthenticated, BookmarksController.index)
    app.post('/bookmarks', isAuthenticated, BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId', isAuthenticated, BookmarksController.delete)
    
    app.get('/histories/', isAuthenticated, HistoryController.index)
    app.post('/histories/', isAuthenticated, HistoryController.post)
}
