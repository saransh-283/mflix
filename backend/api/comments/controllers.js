const commentsDao = require('../../dao/comments/dao.js')
class commentsControllers {
    static async apiGetComments(req, res) {
        const movie_id = req.params.movie_id

        let comments = await commentsDao.getComments(movie_id)

        res.status(200).json(comments)
    }

    static async apiPostComment(req, res) {
        const body = req.body
        body['movie_id'] = req.params.movie_id
        let message = await commentsDao.postComment(body)
        res.status(200).json(message)
    }

    static async apiPutComment(req, res) {
        const body = req.body
        let message = await commentsDao.putComment(body)
        res.status(200).json(message)
    }

    static async apiDeleteComment(req, res) {
        const comment_id = req.body.comment_id
        let message = await commentsDao.deleteComment(comment_id)
        res.status(200).json(message)
    }
}

module.exports = commentsControllers