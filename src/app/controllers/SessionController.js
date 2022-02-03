const Seller = require('../models/Seller')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const seller = await Seller.findOne({ email })

    if (!seller) {
      return res.status(400).json({ error: 'Seller not found' })
    }

    if (!await seller.compareHash(password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.json({ token: Seller.generateToken(seller) })
  }
}

module.exports = new SessionController()
