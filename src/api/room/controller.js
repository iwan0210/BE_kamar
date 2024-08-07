class RoomHandler {
    constructor(service, validator, firebase) {
        this._service = service
        this._validator = validator
        this._firebase = firebase

        this.getRoom = this.getRoom.bind(this)
        this.editRoom = this.editRoom.bind(this)
    }

    async getRoom(_, res, next) {
        try {
            const rooms = await this._service.getRoom()

            const response = {
                error: false,
                status: 200,
                message: "success",
                data: rooms
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async editRoom(req, res, next) {
        try {
            this._validator(req.body)

            const { roomId, bedId } = req.params

            const { status } = req.body

            await this._service.editRoom(roomId, bedId, status)

            const response = {
                error: false,
                status: 200,
                message: "success"
            }

            res.status(200).json(response)

            if (status == 0) {
                const roomName = await this._service.getRoomNameById(roomId)

                const message = {
                    notification: {
                      title: 'Kamar Kosong',
                      body: `Kamar ${roomName} baru saja kosong`
                    },
                    topic: 'ruslam'
                }

                await this._firebase.sendNotification(message)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoomHandler