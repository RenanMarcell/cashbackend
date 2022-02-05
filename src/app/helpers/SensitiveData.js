function removeSensitiveData (data, array = false) {
  if (array) {
    data.forEach(obj => {
      if ('cpf' in obj) delete obj.cpf
      if ('password' in obj) delete obj.password
      if ('seller' in obj) delete obj.seller
    })

    return data
  }
  if ('cpf' in data) delete data.cpf
  if ('password' in data) delete data.password
  if ('seller' in data) delete data.seller
  return data
}

module.exports = removeSensitiveData
