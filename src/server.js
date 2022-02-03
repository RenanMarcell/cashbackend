require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { ValidationError } = require('express-validation')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  database () {
    this.database = mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true
    })
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
