const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })
  
blogSchema.set('toJson',{
Transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id
    delete returnedObject.__v
    }
})


  module.exports = mongoose.model('Blog', blogSchema) //forgot the s on exports for the second time