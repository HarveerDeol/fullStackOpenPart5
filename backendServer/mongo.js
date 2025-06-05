const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://harveerdeol53:${password}@clusterfso.4rnbv1r.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('person', personSchema)


if (process.argv.length == 3) {
    app.get('/api/persons', (request, response) => {
        Note.find({}).then(notes => {
          response.json(notes)
        })
      })
    } else {
        const inputName = process.argv[3]
        const inputNumber = process.argv[4]


        const person = new Person({
            name: inputName, 
            number: inputNumber
        })


        person.save().then(result => {
        console.log(`added ${inputName} number ${inputNumber} to phonebook`)
        mongoose.connection.close()
        })

    }



