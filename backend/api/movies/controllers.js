const moviesDao = require("../../dao/movies/dao.js");

class moviesController {
    static async apiGetMovies(req, res) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        const response = await moviesDao.getMovies({
            filters: req.query,
            page,
            moviesPerPage
        })

        res.status(200).json(response)
    }
}

module.exports = moviesController