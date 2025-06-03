import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter filter={newFilter} setFilter={setNewFilter}/>
      </div>
      <h2>add a new</h2>
       <PersonForm persons = {persons} setPersons = {setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter = {newFilter} setPersons={setPersons}/>
    </div>
  )
}


export default App;