const axios = require('axios')
const sinon = require('sinon')
const { assert, expect } = require('chai')
const request = require('supertest')

const app = require('../../../server')

describe('CashbackController', () => {
  let token
  let stub
  before(async () => {
    await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })

    const response = await request(app).post('/sessions/')
      .send({
        password: 'notpassword',
        email: 'teste@admin.com'
      })

    token = response.body.token
  })

  beforeEach(async () => {
    stub = sinon.stub(axios, 'get').returns({ status: 200, data: { credit: '1000' } })
  })

  afterEach(async () => {
    sinon.restore()
  })

  it('should return 200 for valid request', async () => {
    const response = await request(app).get('/cashback/')
      .set({ Authorization: `Bearer ${token}` })
    expect(response.status).to.equal(200)
  })

  it('should return a object with credit info', async () => {
    const response = await request(app).get('/cashback/')
      .set({ Authorization: `Bearer ${token}` })
    expect(response.body).to.contain.property('credit')
  })

  it('should have called axios get', async () => {
    await request(app).get('/cashback/')
      .set({ Authorization: `Bearer ${token}` })
    assert.strictEqual(stub.callCount, 1)
  })
})
