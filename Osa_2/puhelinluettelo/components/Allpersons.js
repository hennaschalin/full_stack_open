import React from 'react'
import Person from './Person'
import Removeperson from './Removeperson'
import axios from 'axios'


const Allpersons = ( {setPersons, setConfirmation, ...rest} ) => {

    console.log(setPersons)

    return (
        <>
        {rest.persons.filter(person => person.name.toUpperCase().includes(rest.filter.toUpperCase())).map(person => (
            <Person setConfirmation={setConfirmation} setPersons={setPersons} persons={rest.persons} key={person.name} name={person.name} number={person.number} id={person.id} /> ))}
        </> 
    ) 
}
  
  export default Allpersons