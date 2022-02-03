const { validator } = require('cpf-cnpj-validator')
const Joi = require('joi').extend(validator)

module.exports = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    cpf: Joi.document().cpf().required()
  })
}
