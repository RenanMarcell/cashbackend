const { assert, expect } = require('chai')

const Purchase = require('../../models/Purchase')

describe('PurchaseModel', function () {
  it('should be invalid if missing required params', async () => {
    const purchase = new Purchase()

    purchase.validate((err) => {
      expect(err.errors).to.have.property('productCode')
      expect(err.errors).to.have.property('seller')
      expect(err.errors).to.have.property('price')
    })
  })

  it('should add soldAt and status by default', async () => {
    const purchase = new Purchase({
      productCode: 'Bicycle',
      price: 9.99,
      seller: '77686062058'
    })

    expect(purchase).to.contain.property('soldAt')
    expect(purchase).to.contain.property('status')
  })

  it('should set status as for approval', async () => {
    const purchase = new Purchase({
      productCode: 'Bicycle',
      price: 9.99,
      seller: '77686062058'
    })

    assert.equal(purchase.status, 'For approval')
  })
})
