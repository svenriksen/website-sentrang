const express = require('express')
const router = express.Router()
const index_Controller = require('../controllers/indexController');

module.exports = function (app) {
    router.get('/', index_Controller.home);
    router.post('/contact', index_Controller.sendMail);
    
    router.get('/register', index_Controller.register);
    router.post('/register', index_Controller.register);

    router.get('/login', index_Controller.login);
    router.post('/login', index_Controller.login);
    
    return app.use('/', router)
}