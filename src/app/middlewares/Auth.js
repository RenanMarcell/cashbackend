const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const authConfig = require('../config/auth')
const logger = require('../config/logger')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    const error = 'Token not provided'
    logger.error(error)
    return res.status(401).json({ error })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userCpf = decoded.cpf
    return next()
  } catch (err) {
    const error = 'Token invalid'
    logger.error(error)
    return res.status(401).json({ error })
  }
}
