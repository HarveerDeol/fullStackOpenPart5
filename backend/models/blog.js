const config = require('../utils/config.js')

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


  module.export = mongoose.module('Blog', blogSchema)