const axios = require('axios')

const EXTERNAL_API = 'https://mockbin.org/bin/91584f88-ba1f-45c0-bab1-3bbd37113460'

class CashbackController {
  async list (req, res) {
    const response = await axios.get(EXTERNAL_API)
    return res.json(response.data)
  }
}

module.exports = new CashbackController()
