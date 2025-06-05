const config = require('./utils/config')
const express = require('express')




const app = express()
app.use(express.json())


config.connectToDb()




config.setupPort()