const { expect } = require('chai')
const request = require('supertest')

const app = require('../../../server')
const conn = require('../../../db')

describe('PurchaseController', () => {
  let token
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

  afterEach(async () => {
    conn.close()
  })

  describe('Post requests', () => {
    it('should return 200 for valid request', async () => {
      const response = await request(app).post('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          productCode: 'Bicycle',
          price: 1000
        })
      expect(response.status).to.equal(200)
    })

    it('should return purchase properties', async () => {
      const response = await request(app).post('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          productCode: 'Bicycle',
          price: 1000
        })
      expect(response.body).to.contain.property('productCode')
      expect(response.body).to.contain.property('price')
      expect(response.body).to.contain.property('seller')
      expect(response.body).to.contain.property('soldAt')
      expect(response.body).to.contain.property('status')
    })

    it('should set status as approved for main CPF', async () => {
      await request(app).post('/sellers/')
        .send({
          name: 'John Doe',
          password: 'simplepassword',
          cpf: '15350946056',
          email: 'teste123@admin.com'
        })
      const { body } = await request(app).post('/sessions/')
        .send({
          password: 'simplepassword',
          email: 'teste123@admin.com'
        })
      const response = await request(app).post('/purchase/')
        .set({ Authorization: `Bearer ${body.token}` })
        .send({
          productCode: 'Bicycle',
          price: 1010
        })

      expect(response.body.status).to.equal('approved')
    })

    it('should return 400 for invalid request', async () => {
      const response = await request(app).post('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          productCode: 'Bicycle',
          price: 'for free'
        })
      expect(response.status).to.equal(400)
      expect(response.body.name).to.equal('ValidationError')
    })

    it('should return 401 for missing authentication', async () => {
      const response = await request(app).post('/purchase/')
        .send({
          productCode: 'Bicycle',
          price: 1000.00
        })
      expect(response.status).to.equal(401)
    })
  })

  describe('Get requests', () => {
    beforeEach(async () => {
      await request(app).post('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          productCode: 'Bicycle',
          price: 1000.00
        })
    })

    it('should return 200 for valid request', async () => {
      const response = await request(app).get('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
      expect(response.status).to.equal(200)
    })

    it('should return a array', async () => {
      const response = await request(app).get('/purchase/')
        .set({ Authorization: `Bearer ${token}` })
      expect(response.body).to.be.an('array')
    })

    it('should return purchase properties with cashback percentage and value', async () => {
      const response = await request(app).get('/purchase/')
        .set({ Authorization: `Bearer ${token}` })

      expect(response.body[0]).to.contain.property('productCode')
      expect(response.body[0]).to.contain.property('price')
      expect(response.body[0]).to.contain.property('seller')
      expect(response.body[0]).to.contain.property('soldAt')
      expect(response.body[0]).to.contain.property('status')
      expect(response.body[0]).to.contain.property('cashbackPercentage')
      expect(response.body[0]).to.contain.property('cashbackValue')
    })
  })
})
