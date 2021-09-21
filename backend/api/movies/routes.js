const express = require('express')
const moviesController = require('../movies/controllers.js')

const moviesRouter = express.Router()

moviesRouter.get('/', moviesController.apiGetMovies)

module.exports = moviesRouter