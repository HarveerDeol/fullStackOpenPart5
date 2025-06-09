const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const blogSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    }, 
    passwordHash: String,
    url: String,
    blogs:Array,
  })
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


  module.exports = mongoose.model('Blog', blogSchema) //forgot the s on exports for the second time