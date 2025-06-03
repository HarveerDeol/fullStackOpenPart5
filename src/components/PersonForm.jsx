import {useState} from 'react';
import axios from 'axios';

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');

    const addPerson = (e) => {
      e.preventDefault()
      const personExists = persons.some(person => person.name === newName);// used some.() instead of filter to avoid uneccessary re-renders
      const numberExists = persons.some(person => person.number === newNumber);
      if (personExists) {

        alert(`${newName} is already added to phonebook`);
      } else if(numberExists && window.confirm(`Phone number already exist, update to new user?`)) {
          const personMatched = persons.find(person => {return person.number === newNumber})//wasnt returning
          const personObject = {
            name: newName, 
            number: newNumber,
          }      

          axios
          .put(`http://localhost:3001/persons/${personMatched.id}`, personObject)//wasny using put, trying to do a get then a post
          .then(response => {
            setPersons(persons.map(person => person.id === personMatched.id ? response.data : person))// was making a simliar mistake in how i was updating setperson
            setNewName('');
            setNewNumber('');})
      } else if (!numberExists) {

          const personObject = {
            name: newName, 
            number: newNumber,
          }
        
          axios
            .post('http://localhost:3001/persons', personObject)
            .then(response => {
              setPersons(persons.concat(response.data));
              setNewName('');
              setNewNumber('');
              console.log(response)
            })
          
      }
      
    }

    
    const handleNameChange = (e) => {
      setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
      setNewNumber(e.target.value)
    }
    
    return (
  
      <form onSubmit={addPerson} id="form1">
              <div>
                <label htmlFor="name">Name </label>
                <input id="name"value={newName} onChange={handleNameChange}/>
              </div>
              <br/>
              <div>
                <label htmlFor="number">Number </label>
                <input id="number" value={newNumber} onChange={handleNumberChange}/>
              </div>
              <button type="submit">add</button>
            </form>
    )
    
  }
  

  export default PersonForm;

  