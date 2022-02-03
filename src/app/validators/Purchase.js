const Joi = require('joi')

module.exports = {
  body: Joi.object({
    product_code: Joi.string().required(),
    price: Joi.number().required()
  })
}
