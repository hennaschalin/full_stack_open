import { useState, useEffect } from 'react'
import React from 'react'
import axios, { Axios } from 'axios'
import Filter from './components/Filter'
import Newperson from './components/Newperson'
import Allpersons from './components/Allpersons'
import { Notification, Error } from './Notification'
import './index.css'

const baseUrl = 'http://localhost:3001/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event, id) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === name)
    
    if (existingName) {
      const person = persons.find(person => person.name === name)
      const personId = person.id

      axios.get('http://localhost:3001/persons')
      .then(response => {
        const updatedPersons = (response.data)
        console.log('updated', updatedPersons)
        const choice = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)
        
        if (choice) {
            if (updatedPersons.some(e => e.id === personId)){
              console.log('jess')
              let req = axios.put(`http://localhost:3001/persons/${personId}`, { name: name, number: number })
              console.log('req', req)
              req.then(response => {
                console.log('hello', response.data)
                console.log('updated', updatedPersons)
                axios.get('http://localhost:3001/persons')
                .then(response => {
                  setPersons(response.data)
                })})
            } else {
              console.log('nope')
              setErrorMessage(`Information of ${name} has already been removed from server`)
            }
        setPersons(updatedPersons)
      }})}
      
      else {

      let res = axios.post('http://localhost:3001/persons', {
        name,
        number
      })
      res.then(response => {
        const newPerson = persons.concat(response.data)
        setPersons(newPerson)
        setConfirmation(`Added ${name}`)
      })

    }
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <Newperson
        onSubmit={addPerson}
        nameVal={name}
        onNameChange={handleNameChange}
        numberVal={number}
        onNumberChange={handleNumberChange}
      />
      <Notification message={confirmation} />
      <Error message={errorMessage} />
      <h2>Numbers</h2>
      <Allpersons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setConfirmation={setConfirmation}
      />

    </div>
  )

}

export default App
