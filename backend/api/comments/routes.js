const express = require('express')
const commentsControllers = require('./controllers.js')

const commentsRouter = express.Router()

commentsRouter.route('/movie/:movie_id')
    .get(commentsControllers.apiGetComments)
    .post(commentsControllers.apiPostComment)
    .put(commentsControllers.apiPutComment)
    .delete(commentsControllers.apiDeleteComment)

module.exports = commentsRouter