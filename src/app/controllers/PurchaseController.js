const Purchase = require('../models/Purchase')
const { getPurchaseCashback } = require('../helpers/Cashback')
const logger = require('../config/logger')
const removeSensitiveData = require('../helpers/SensitiveData')

const MAIN_CPF = '15350946056'

class PurchaseController {
  async list (req, res) {
    const purchases = await Purchase.find({
      seller: req.userCpf
    })

    const purchaseList = []
    let aggregateSpend = 0

    purchases.forEach(purchase => {
      aggregateSpend += purchase.price
      purchaseList.push({
        productCode: purchase.productCode,
        price: purchase.price,
        soldAt: purchase.soldAt,
        status: purchase.status,
        seller: req.userCpf
      })
    })

    const cashbackObj = getPurchaseCashback(aggregateSpend)
    purchaseList.forEach(purchase => {
      purchase.cashbackPercentage = cashbackObj.percentage
      purchase.cashbackValue = (purchase.price * cashbackObj.multiplier).toFixed(2)
    })

    const purchaseListCopy = JSON.parse(JSON.stringify(purchaseList))
    const logResponse = JSON.stringify(removeSensitiveData(purchaseListCopy, true))
    logger.info(`path: ${req.path} response: ${logResponse}`)
    return res.json(purchaseList)
  }

  async store (req, res) {
    const dataObj = { ...req.body, seller: req.userCpf }

    if (String(req.userCpf) === MAIN_CPF) {
      dataObj.status = 'approved'
    }
    const purchase = await Purchase.create(dataObj)

    const logResponse = JSON.stringify(removeSensitiveData(purchase.toObject()))
    logger.info(`path: ${req.path} response: ${logResponse}`)
    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
