const { assert, expect } = require('chai')

const Seller = require('../../models/Seller')

describe('SellerModel', function () {
  it('should be invalid if missing required params', async () => {
    const seller = new Seller()

    seller.validate((err) => {
      expect(err.errors).to.have.property('name')
      expect(err.errors).to.have.property('email')
      expect(err.errors).to.have.property('password')
      expect(err.errors).to.have.property('cpf')
    })
  })

  it('should add createdAt by default', async () => {
    const seller = new Seller({
      name: 'John Doe',
      password: 'notpassword',
      cpf: '77686062058',
      email: 'teste@admin.com'
    })

    expect(seller).to.contain.property('createdAt')
  })

  it('should encrypt password', async () => {
    const unencryptedPassword = 'easytocrack'
    const seller = await Seller.create({
      name: 'John Doe',
      password: unencryptedPassword,
      cpf: '09295195078',
      email: 'teste@admin.com'
    })

    assert.notEqual(seller.password, unencryptedPassword)
  })

  it('should be able to compare encrypted password', async () => {
    const unencryptedPassword = 'easytocrack'
    const seller = await Seller.create({
      name: 'John Doe',
      password: unencryptedPassword,
      cpf: '09295195078',
      email: 'teste@admin.com'
    })
    assert.isTrue(await seller.compareHash(unencryptedPassword, seller.password))
  })
})
