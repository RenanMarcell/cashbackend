const { expect } = require('chai')
const request = require('supertest')

const app = require('../../../server')
const conn = require('../../../db')

describe('SellerController', () => {
  afterEach(async () => {
    conn.close()
  })

  it('should return 200 for valid request', async () => {
    const response = await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })
    expect(response.status).to.equal(200)
  })

  it('should return seller properties', async () => {
    const response = await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })
    expect(response.body).to.contain.property('name')
    expect(response.body).to.contain.property('email')
    expect(response.body).to.contain.property('cpf')
    expect(response.body).to.contain.property('password')
    expect(response.body).to.contain.property('createdAt')
  })

  it('should return 400 for invalid request', async () => {
    const response = await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: 'invalidCPF',
        email: 'teste@admin.com'
      })
    expect(response.status).to.equal(400)
    expect(response.body.name).to.equal('ValidationError')
  })

  it('should return 400 for already registered seller', async () => {
    await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })
    const response = await request(app).post('/sellers/')
      .send({
        name: 'John Doe',
        password: 'notpassword',
        cpf: '77686062058',
        email: 'teste@admin.com'
      })
    expect(response.status).to.equal(400)
  })
})
