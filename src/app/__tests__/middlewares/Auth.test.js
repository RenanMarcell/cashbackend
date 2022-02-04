const { assert } = require('chai')
const sinon = require('sinon')

const authMiddleware = require('../../middlewares/Auth')

sinon.assert.expose(assert, { prefix: '' })

describe('authMiddleware', () => {
  it('should return 401 for missing authorization', async () => {
    const mockRequest = {
      headers: {
        authorization: ''
      }
    }
    const mock = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }

    const mockResponse = mock()
    await authMiddleware(mockRequest, mockResponse, sinon.spy())
    assert.strictEqual(mockResponse.status.callCount, 1)
    assert.isTrue(mockResponse.status.calledWith(401))
  })
})
