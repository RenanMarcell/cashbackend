const { Router } = require('express')
const handle = require('express-async-handler')
const { validate } = require('express-validation')

const validators = require('./app/validators')
const controllers = require('./app/controllers')

const routes = Router()

const authMiddleware = require('./app/middlewares/auth')

routes.post('/sellers/', validate(validators.Seller), handle(controllers.SellerController.store))
routes.post('/sessions/', validate(validators.Session), handle(controllers.SessionController.store))

routes.use(authMiddleware)
routes.get('/purchase/', handle(controllers.PurchaseController.list))
routes.post('/purchase/', validate(validators.Purchase), handle(controllers.PurchaseController.store))
routes.get('/cashback/', handle(controllers.CashbackController.list))

module.exports = routes
