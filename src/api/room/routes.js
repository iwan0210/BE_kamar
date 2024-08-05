const router = require('express').Router()
const RoomService = require('../../services/RoomService')
const RoomValidator = require('../../validator/RoomValidator')
const RoomHandler = require('./controller')
const { verifyToken, verifyEditToken } = require('../../middleware/AuthHandler')

const roomService = new RoomService()
const roomHandler = new RoomHandler(roomService, RoomValidator)

router.get('/rooms', verifyToken, roomHandler.getRoom)
router.post('/rooms/:id', verifyEditToken, roomHandler.editRoom)


module.exports = router