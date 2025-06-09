const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    }, 
    passwordHash: String,
    url: String,
    blogs:[{      
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
  })
  
  userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})


  module.exports = mongoose.model('User', userSchema) 