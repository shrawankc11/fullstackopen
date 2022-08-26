
import { useState } from "react"

const StatisticLine = ({ text, value }) => {
  return (
    
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>    
  )
}

const Button = ({ onClick, text }) => {
  const Button = <button onClick={onClick}>
  {text}
</button>
  return (
    Button
  )
} 

const Statistics = ({good, neutral, bad}) => {
  let totalReview = good + neutral + bad
  if (totalReview === 0) {
    return (
      <p>No Feedback given</p>
    )
  }

  const average = (good - bad) / totalReview;

  return (

    <div>
      <h1>statistics</h1>
      <table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={totalReview}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={good / totalReview * 100}/>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = () => {
    setGood(good + 1)
  }

  const countNeutral = () => {
    setNeutral(neutral + 1)
  }

  const countBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={countGood}/>
      <Button text="neutral" onClick={countNeutral}/>
      <Button text="bad" onClick={countBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

export default App;
