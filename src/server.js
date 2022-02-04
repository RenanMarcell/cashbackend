require('dotenv').config()

const express = require('express')
const { ValidationError } = require('express-validation')

const { connect: connectDB } = require('./db')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    connectDB()
    this.middlewares()
    this.routes()
    this.exception()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
      }

      console.log(err)
      return res.status(err.status || 500).json({
        error: 'Internal Server Error'
      })
    })
  }
}

module.exports = new App().express
