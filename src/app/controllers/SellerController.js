const Seller = require('../models/Seller')

class SellerController {
  async store (req, res) {
    const { email } = req.body

    if (await Seller.findOne({ email })) {
      return res.status(400).json({ error: 'Seller already exists' })
    }

    const seller = await Seller.create(req.body)

    return res.json(seller)
  }
}

module.exports = new SellerController()
