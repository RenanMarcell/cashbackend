const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
  product_code: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    ref: 'Seller',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sold_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'For approval'
  }
})

module.exports = mongoose.model('Purchase', PurchaseSchema)
