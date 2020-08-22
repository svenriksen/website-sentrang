const express = require('express')
const router = express.Router()
const index_Controller = require('../controllers/indexController');

module.exports = function (app) {
    router.get('/', index_Controller.home);
    router.post('/contact', index_Controller.sendMail);
    router.get('/logout', index_Controller.logout);
    
    router.get('/register', index_Controller.register);
    router.post('/register', index_Controller.register);

    router.get('/login', index_Controller.login);
    router.post('/login', index_Controller.login);

    router.get('/profile', index_Controller.profile);
    
    router.get('/changeprofile', index_Controller.update);
    router.post('/changeprofile', index_Controller.update);
    // only for admin
    router.get('/deleteAccount', index_Controller.delete);
    router.post('/deleteAccount', index_Controller.delete);
    
    return app.use('/', router)
}