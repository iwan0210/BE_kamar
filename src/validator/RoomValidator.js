const Joi = require('joi')
const InvariantError = require('../exceptions/InvariantError')


const schema = Joi.object({
    status: Joi.number().required().valid(0,1,2,3,4)
})

const validateRoom = payload => {
    const validationResult = schema.validate(payload)

    if (validationResult.error) {
        throw new InvariantError(validationResult.error.message)
    }
}

module.exports = validateRoom