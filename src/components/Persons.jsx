import axios from 'axios';

const Persons = ({persons, newFilter, setPersons}) => {
  
  const deleteElement = (person)=>{
    if (window.confirm(`Delete ${person.name}?`)){
      axios
      .delete(`/api/persons/${person.id}`)
      .then(response =>{
        console.log(`deleted ${response.data}`);
        setPersons(persons.filter(personList =>(personList.id != person.id)));
      })
    }

  }
    return (
      <ul>
      {persons.map(person => (person.name.toLowerCase().includes(newFilter.toLowerCase())//used && instead of ternary operator
         && <li key = {person.id}>{person.name} - {person.number} <button type="submit" onClick={()=> deleteElement(person)}>delete</button></li>))}
      </ul>
    )
  }
  
  export default Persons;