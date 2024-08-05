const router = require('express').Router()
const UsersService = require('../../services/UsersService')
const TokenManager = require('../../tokenize/TokenManager')
const UsersValidator = require('../../validator/UsersValidator')
const UsersHandler = require('./controller')

const usersService = new UsersService()
const usersHandler = new UsersHandler(usersService, UsersValidator, TokenManager)

router.post('/login', usersHandler.login)



module.exports = router