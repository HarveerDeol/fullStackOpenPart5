require('dotenv').config()//dotenv must be imported before person model
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person.js')

const app = express()



app.use(express.json())
app.use(express.static('dist'))

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })//forgot JSON stringify
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req,res)
  ].join(' ')
}))




app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
  date = new Date();
  response.end(`Phonebook has info for ${Person.length} people\n ${date.toString()}`)
})


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (Object.entries(Person).reduce((acc, person) =>{
    if (body.name === person.name){
      return acc + 1}})) {//filter function wont work on models just arrays
    return response.status(400).json({
      error: 'name already taken',
    }) 
    } 

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  //persons= persons.concat(person) <- old way
  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
}) 

app.delete('/api/persons/:id', async (request, response) => {
  try{
    await Person.deleteOne({_id: request.params.id});//used id instead of id
    response.status(204).end()
  } catch {
    res.sendStatus(404);
    console.log('No delete occured');
  }
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})