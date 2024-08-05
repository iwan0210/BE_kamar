class UsersHandler {
    constructor(service, validator, tokenManager) {
        this._service = service
        this._validator = validator
        this._tokenManager = tokenManager

        this.login = this.login.bind(this)
    }

    async login(req, res,  next) {
        try {
            this._validator(req.body)

            const {username, password} = req.body

            const userCred = await this._service.verifyCredential(username, password)

            const accessToken = this._tokenManager({
                userId: userCred.userId,
                userName: userCred.userName,
                userFullName: userCred.userFullName,
                userEdit: userCred.userEdit
            })

            const response = {
                error: false,
                status: 200,
                message: "success",
                data: {
                    ...userCred,
                    accessToken
                }
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersHandler