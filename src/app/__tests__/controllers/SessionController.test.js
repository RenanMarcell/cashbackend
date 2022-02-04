const { assert, expect } = require('chai')
const request = require('supertest')

const app = require('../../../server')

describe('SessionController', () => {
  beforeEach(async () => {
    await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })
  })

  it('should return 200 for valid request', async () => {
    const response = await request(app).post('/sessions/')
      .send({
        password: 'notpassword',
        email: 'teste@admin.com'
      })
    expect(response.status).to.equal(200)
  })

  it('should return token on body', async () => {
    const response = await request(app).post('/sessions/')
      .send({
        password: 'notpassword',
        email: 'teste@admin.com'
      })
    expect(response.body).to.contain.property('token')
  })

  it('should return 400 for not found seller', async () => {
    const response = await request(app).post('/sessions/')
      .send({
        password: 'notpassword',
        email: 'someother@admin.com'
      })
    expect(response.status).to.equal(400)
    assert.equal(response.body.error, 'Seller not found')
  })

  it('should return 400 for wrong password', async () => {
    const response = await request(app).post('/sessions/')
      .send({
        password: 'wrongpassword',
        email: 'teste@admin.com'
      })
    expect(response.status).to.equal(400)
    assert.equal(response.body.error, 'Invalid password')
  })
})
