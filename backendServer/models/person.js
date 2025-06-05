const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
/*
/major blunder: 
/ i defined a connection string 
/ to a different document of collections 
/ and because of how mongodb behaves it 
/ simply created a new database rather
/ than raising an error
*/

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name:{ type: String,
            minLength: 2,
            required: true},
    number:{ type: String,
              minLength: 2,
              required: true},
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Person', personSchema)
  


