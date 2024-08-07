const router = require('express').Router()
const RoomService = require('../../services/RoomService')
const FirebaseService = require('../../services/FirebaseService')
const RoomValidator = require('../../validator/RoomValidator')
const RoomHandler = require('./controller')
const { verifyToken, verifyEditToken } = require('../../middleware/AuthHandler')

const roomService = new RoomService()
const firebaseService = new FirebaseService()
const roomHandler = new RoomHandler(roomService, RoomValidator, firebaseService)

router.get('/rooms', verifyToken, roomHandler.getRoom)
router.post('/rooms/:roomId/:bedId', verifyEditToken, roomHandler.editRoom)


module.exports = router