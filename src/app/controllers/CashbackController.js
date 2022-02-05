const axios = require('axios')

const logger = require('../config/logger')

const EXTERNAL_API = 'https://mockbin.org/bin/91584f88-ba1f-45c0-bab1-3bbd37113460'

class CashbackController {
  async list (req, res) {
    const response = await axios.get(EXTERNAL_API)
    const logResponse = JSON.stringify(response.data)
    logger.info(`path: ${req.path} response: ${logResponse}`)
    return res.json(response.data)
  }
}

module.exports = new CashbackController()
