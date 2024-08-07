require('dotenv').config()
const pool = require('mysql2/promise')
const bcrypt = require('bcryptjs')
const AuthenticationError = require('../exceptions/AuthenticationError')

class UsersService {
    constructor() {
        this._pool = pool.createPool({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASS,
            database: process.env.MYSQLDB,
            port: process.env.MYSQLPORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }


    async verifyCredential(username, password) {
        const result = await this._pool.query("select id, user, name, password, edit, type from user where user = ?", [username])

        if (result[0].length < 1) {
            throw new AuthenticationError("Kredensial  yang anda berikan salah")
        }

        const { id: userId, user: userName, name: userFullName, edit: userEdit, type: userType, password: hashedPassword } = result[0][0]

        const match = await bcrypt.compare(password, hashedPassword)

        if (!match) {
            throw new AuthenticationError("Kredensial  yang anda berikan salah")
        }

        return { userId, userName, userFullName, userEdit, userType }
    }
}

module.exports = UsersService