const Seller = require('../models/Seller')
const logger = require('../config/logger')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const seller = await Seller.findOne({ email })

    if (!seller) {
      const error = 'Seller not found'
      logger.error(`path: ${req.path} error: ${error}`)
      return res.status(400).json({ error })
    }

    if (!await seller.compareHash(password)) {
      const error = 'Invalid password'
      logger.error(`path: ${req.path} error: ${error}`)
      return res.status(400).json({ error })
    }

    logger.info(`Generated token for seller ${seller.email}`)
    return res.json({ token: Seller.generateToken(seller) })
  }
}

module.exports = new SessionController()
