const express = require('express')
const commentsRouter = require('./comments/routes.js')
const moviesRouter = require('./movies/routes.js')
const usersRouter = require('./users/routes.js')

const mainRouter = express.Router()

mainRouter.use(moviesRouter)
mainRouter.use(commentsRouter)
mainRouter.use(usersRouter)

module.exports = mainRouter