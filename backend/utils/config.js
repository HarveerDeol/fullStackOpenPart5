require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('/loger.js')

const PORT = process.env.PORT || 3001
const url = process.env.MONGODB_URI

const connectToDb = async () =>{
    try { 
        console.log('connecting to ', url)
        mongoose.connect(url)
        logger.info('connected to Mongodb')
    } catch (error){
        logger.info('couldnt connect to Mongodb',error.message)
    }
}

const setupPort = async () =>{
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
}

module.exports = { connectToDb, setupPort }