const Seller = require('../models/Seller')
const logger = require('../config/logger')
const removeSensitiveData = require('../helpers/SensitiveData')

class SellerController {
  async store (req, res) {
    const { email } = req.body

    if (await Seller.findOne({ email })) {
      const error = 'Seller already exists'
      logger.error(`path: ${req.path} error: ${error}`)
      return res.status(400).json({ error })
    }

    const seller = await Seller.create(req.body)

    const logResponse = JSON.stringify(removeSensitiveData(seller.toObject()))
    logger.info(`path: ${req.path} response: ${logResponse}`)
    return res.json(seller)
  }
}

module.exports = new SellerController()
