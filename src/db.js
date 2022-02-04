const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const DB_URI = process.env.DATABASE_URI

let mongoServer

async function connect () {
  if (process.env.NODE_ENV === 'test') {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    const mongooseOpts = {
      useNewUrlParser: true
    }

    await mongoose.connect(uri, mongooseOpts)
  } else {
    mongoose.connect(DB_URI, { useNewUrlParser: true })
  }
}

async function close () {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.dropDatabase()
  } else {
    return mongoose.disconnect()
  }
}

module.exports = { connect, close }
