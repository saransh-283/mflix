const usersDao = require("../../dao/users/dao.js");

class usersController {
    static async apiGetUser(req, res) {
        // let loginStatus = await usersDao.getUser(req.body)
        // if (req.body.random == 'true') {
        //     res.status(200).json(loginStatus)
        //     return
        // }
        // if (loginStatus) res.status(200).json({
        //     message: 'success'
        // })
        // else res.status(401).json({
        //     message: 'failed'
        // })
        res.status(200).json(await usersDao.getUser(req.body))
    }

    static async apiPostuser(req, res) {
        res.status(200).json(await usersDao.postUser(req.body))
    }

    static async apiDeleteUser(req, res) {
        let deleteStatus = await usersDao.deleteUser(req.body)
        if (deleteStatus) res.status(200).json({
            message: 'delete success'
        })
        else res.status(401).json({
            message: 'delete failed'
        })
    }
}

module.exports = usersController