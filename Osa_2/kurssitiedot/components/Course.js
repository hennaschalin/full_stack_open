import React from 'react'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
    return (
      <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exersice={part.exercises}/>)}
      </div>
    )
  }

const Part = ({name,exercise}) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Total = ({parts}) => {
    return (
        <p style={{fontWeight: 'bold'}}>total of {parts.reduce((sum,part) => sum + part.exercises,0)} exercises</p>
    )
}

const Course = ({course}) => {
  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

export default Course