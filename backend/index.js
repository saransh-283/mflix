const app = require("./server.js");
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const commentsDao = require('./dao/comments/dao.js')
const moviesDao = require('./dao/movies/dao.js')
const theatersDao = require('./dao/theaters/dao.js')
const usersDao = require('./dao/users/dao.js')

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

MongoClient.connect(process.env.MFLIX_URI, {
    maxPoolSize: 100,
    wtimeoutMS: 1000,
    useNewUrlParser: true
}).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await commentsDao.injectDB(client)
    await moviesDao.injectDB(client)
    await theatersDao.injectDB(client)
    await usersDao.injectDB(client)
    app.listen(port, (req, res) => {
        console.log(`listening on ${port}`);
    })
})