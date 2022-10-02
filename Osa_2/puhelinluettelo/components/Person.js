import React from "react"
import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'


const Person = ( {setPersons, setConfirmation, ...rest} ) => {

    console.log(setPersons)

    const delPer = ( setPer , id, persons, setConf ) => {
        console.log()
        const choice = window.confirm (`Delete ${id} ?`)
            if(choice) {
                let request = axios.delete(`${baseUrl}/${id}`)
                console.log(request)
                request.then(response => {console.log(response)
                    const newPersons = persons.filter(p => p.id !==id)
                    setPer(newPersons)
                    setConf("Removed succesfully")
                })
        }}

    return (
        <>
            <p>
            {rest.name} {rest.number} 
            <button onClick={() =>delPer(setPersons, rest.id, rest.persons, setConfirmation)}>Delete</button>
            </p>
            
        </>
    )
}

export default Person