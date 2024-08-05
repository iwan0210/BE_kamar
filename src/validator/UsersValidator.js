const Joi = require('joi')
const InvariantError = require('../exceptions/InvariantError')


const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const validateUser = payload => {
    const validationResult = schema.validate(payload)

    if (validationResult.error) {
        throw new InvariantError(validationResult.error.message)
    }
}

module.exports = validateUser