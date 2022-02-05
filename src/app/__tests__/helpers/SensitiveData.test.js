const { expect } = require('chai')
const removeSensitiveData = require('../../helpers/SensitiveData')

describe('SensitiveData helper', () => {
  it('should remove cpf and password from data', async () => {
    const dataObj = removeSensitiveData({
      cpf: 'somecpf',
      password: 'somepassword',
      seller: 'someothercpf'
    })
    expect(dataObj).to.deep.equal({})
  })

  it('should not remove other keys from data', async () => {
    const dataObj = removeSensitiveData({
      lorem: 'ipsum'
    })
    expect(dataObj).to.deep.equal({ lorem: 'ipsum' })
  })

  it('should remove cpf and password from all objects from array', async () => {
    const dataObj = removeSensitiveData([
      {
        cpf: 'somecpf',
        password: 'somepassword',
        seller: 'someothercpf'
      },
      {
        cpf: 'somecpf',
        password: 'somepassword',
        seller: 'someothercpf'
      },
      {
        cpf: 'somecpf',
        password: 'somepassword',
        seller: 'someothercpf'
      }
    ],
    true
    )
    expect(dataObj).to.deep.equal([{}, {}, {}])
  })
})
