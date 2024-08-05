const jwt = require('jsonwebtoken')
const AuthenticationError = require('../exceptions/AuthenticationError')
const AuthorizationError = require('../exceptions/AuthorizationError')
const ClientError = require('../exceptions/ClientError')

const verifyToken = (req, _, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AuthenticationError("Unauthenticated")
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            throw new AuthenticationError("Unauthenticated")
        }

        const decode = jwt.verify(token, process.env.SECRET)
        if (!decode.userId) {
            throw new ClientError("Invalid token")
        }

        req.userId = decode.userId
        req.userName = decode.userName
        req.userFullName = decode.userFullName
        req.userEdit = decode.userEdit

        next()

    } catch (error) {
        next(error)
    }
}

const verifyEditToken = (req, _, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AuthenticationError("Unauthenticated")
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            throw new AuthenticationError("Unauthenticated")
        }

        const decode = jwt.verify(token, process.env.SECRET)
        if (!decode.userId) {
            throw new ClientError("Invalid token")
        }

        if (decode.userEdit !== 1) {
            throw new AuthorizationError("Unauthorized")
        } 

        req.userId = decode.userId
        req.userName = decode.userName
        req.userFullName = decode.userFullName
        req.userEdit = decode.userEdit

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = { verifyToken, verifyEditToken }