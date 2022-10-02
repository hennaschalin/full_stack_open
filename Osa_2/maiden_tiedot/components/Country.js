
const Country = (props) => {

    return (
        <div>
          <h1>{props.name}</h1>
          <p>capital {props.capital}</p>
          <p>area {props.area}</p>
          <h3>Languages:</h3>
          {Object.keys(props.languages).map((key)=>
          <li>{props.languages[key]}</li>)}
          <img src={props.flags.png} />
        </div>
    )
  }

  
  export default Country