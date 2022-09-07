import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = parseFloat(((1 * good) + (0 * neutral) + (-1 * bad)) / all).toFixed(1);
  const positive = parseFloat(good / all * 100).toFixed(1);

  if (all === 0 ) {
    return <div>No feedback given</div>
  }

  return ( 
    <table>
      <tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )

}

  const StatisticLine = ({text, value}) => (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text="good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
    <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
    <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App;