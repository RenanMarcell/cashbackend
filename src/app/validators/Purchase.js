const Joi = require('joi')

module.exports = {
  body: Joi.object({
    productCode: Joi.string().required(),
    price: Joi.number().required()
  })
}
