
const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

    const Content = (props) => {
      return (
        <>
        <p>{props.parts[0].name} {props.parts[0].exercises}</p>
        <p>{props.parts[1].name} {props.parts[1].exercises}</p>
        <p>{props.parts[2].name} {props.parts[2].exercises}</p>
        </>
      )
    }

    const Total = (calc) => {
      return (
      <div>
      Number of exercises {calc.parts[0].exercises + calc.parts[1].exercises + calc.parts[2].exercises}
      </div>
      )
    } 

    const App = () => {

      const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/> 
    </div>
  )
}

export default App
