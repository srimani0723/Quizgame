import {Switch, Route} from 'react-router-dom'
import './App.css'
import {useState, useCallback} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/Quiz Game'
import QuestionsContext from './Context/QuestionsContext'

const App = () => {
  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)
  const [unattemptedAns, setUnattemptedAns] = useState([])

  const correctAnsIncrement = () => {
    setCorrectAns(prev => prev + 1)
  }

  const wrongAnsIncrement = () => {
    setWrongAns(prev => prev + 1)
  }

  const unattemptedAnsIncrement = useCallback(index => {
    console.log('added')
    setUnattemptedAns(prev => [...prev, index])
  }, [])

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
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz-game" component={QuizGame} />
      </Switch>
    </QuestionsContext.Provider>
  )
}

export default App
