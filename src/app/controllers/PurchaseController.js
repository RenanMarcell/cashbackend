const Purchase = require('../models/Purchase')
const { getPurchaseCashback } = require('./helpers')

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
        product_code: purchase.product_code,
        price: purchase.price,
        sold_at: purchase.sold_at,
        status: purchase.status
      })
    })

    const cashbackObj = getPurchaseCashback(aggregateSpend)
    purchaseList.forEach(purchase => {
      purchase.cashback_percentage = cashbackObj.percentage
      purchase.cashback_value = (purchase.price * cashbackObj.multiplier).toFixed(2)
    })

    return res.json(purchaseList)
  }

  async store (req, res) {
    const dataObj = { ...req.body, seller: req.userCpf }

    if (String(req.userCpf) === MAIN_CPF) {
      dataObj.status = 'approved'
    }
    const purchase = await Purchase.create(dataObj)

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
