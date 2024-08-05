class RoomHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

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

            const roomBedId = req.params.id

            const { status } = req.body

            await this._service.editRoom(roomBedId, status)

            const response = {
                error: false,
                status: 200,
                message: "success"
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoomHandler