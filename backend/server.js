const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mainRouter = require('./api/mainRoute.js');

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/api/v1/movies', mainRouter)
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found'
    })
})

module.exports = app