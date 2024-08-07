require('dotenv').config()
const pool = require('mysql2/promise')
const moment = require('moment-timezone')
const NotFoundError = require('../exceptions/NotFoundError')


class RoomService {
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

    async editRoom(roomId, roomBedId, status) {
        const result = await this._pool.query("update kamar_detail set status = ? where id = ?", [status.toString(), roomBedId])

        if(result[0].affectedRows < 1) {
            throw new NotFoundError("Kamar tidak ditemukan")
        }

        this.#updateTime(roomId)
    }

    async getRoom() {
        const result = await this._pool.query("SELECT k.id AS kamar_id, k.name AS kamar_name, k.update as kamar_update, k.type as kamar_type, kd.id AS detail_id, kd.name AS detail_name, kd.status AS detail_status FROM kamar k LEFT JOIN kamar_detail kd ON k.id = kd.kamar_id")

        return this.#formatData(result[0])
    }

    #formatData(rows) {
        const data = {}

        rows.forEach(row => {
            if (!data[row.kamar_id]) {
                data[row.kamar_id] = {
                    id: row.kamar_id,
                    name: row.kamar_name,
                    type: row.kamar_type,
                    lastUpdate: moment.tz(originalDate, 'YYYY-MM-DD HH:mm:ss', 'Asia/Jakarta').toISOString(),
                    detail: []
                }
            }
        
            if (row.detail_id) {
                data[row.kamar_id].detail.push({
                    id: row.detail_id,
                    name: row.detail_name,
                    status: parseInt(row.detail_status)
                })
            }
        })
        
        return Object.values(data)
    }

    async #updateTime(roomId) {
        const result  = await this._pool.query("UPDATE kamar set `update` = NOW() WHERE id = ?", [roomId])

        if(result[0].affectedRows < 1) {
            throw new NotFoundError("Kamar tidak ditemukan")
        }
    }
}

module.exports = RoomService