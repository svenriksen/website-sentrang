const express = require('express')
const router = express.Router()
const index_Controller = require('../controllers/indexController')

module.exports = function (app) {
    router.get('/', index_Controller.home);
    router.post('/contact', index_Controller.sendMail);
    
    return app.use('/', router)
}