const { assert } = require('chai')
const { getPurchaseCashback } = require('../../helpers/Cashback')

describe('Cashback helper', () => {
  it('should return 10% of cashback for sum of less than 1000', async () => {
    const cashbackObj = getPurchaseCashback(999)
    assert.equal(cashbackObj.percentage, '10%')
    assert.equal(cashbackObj.multiplier, 0.1)
  })

  it('should return 15% of cashback for sum above 1000 and less than 1500', async () => {
    const cashbackObj = getPurchaseCashback(1499)
    assert.equal(cashbackObj.percentage, '15%')
    assert.equal(cashbackObj.multiplier, 0.15)
  })

  it('should return 20% of cashback for sum above 1500', async () => {
    const cashbackObj = getPurchaseCashback(1500)
    assert.equal(cashbackObj.percentage, '20%')
    assert.equal(cashbackObj.multiplier, 0.2)
  })
})
