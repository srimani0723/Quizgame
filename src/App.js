import {Switch, Route} from 'react-router-dom'
import './App.css'
import {useState} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/Quiz Game'
import QuestionsContext from './Context/QuestionsContext'
import TimerContext from './Context/TimerContext'

const App = () => {
  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)
  const [unattemptedAns, setUnattemptedAns] = useState([])

  // timer
  const [timer, setTimer] = useState(15)
  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const startTimer = () => {
    if (!isRunning && timer > 0) {
      setIsRunning(true)
      const id = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(id)
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setIntervalId(id)
    }
  }

  const resetTimer = () => {
    stopTimer()
    setTimer(15)
    setIsRunning(false)
  }

  const correctAnsIncrement = () => {
    setCorrectAns(prev => prev + 1)
  }

  const wrongAnsIncrement = () => {
    setWrongAns(prev => prev + 1)
  }

  const unattemptedAnsIncrement = index => {
    setUnattemptedAns(...unattemptedAns, index)
  }

  return (
    <QuestionsContext.Provider
      value={{
        correctAns,
        wrongAns,
        unattemptedAns,
        correctAnsIncrement,
        wrongAnsIncrement,
        unattemptedAnsIncrement,
      }}
    >
      <TimerContext.Provider
        value={{
          timer,
          intervalId,
          startTimer,
          stopTimer,
          resetTimer,
          isRunning,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/quiz-game" component={QuizGame} />
        </Switch>
      </TimerContext.Provider>
    </QuestionsContext.Provider>
  )
}

export default App
