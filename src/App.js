import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/Quiz Game'

// Replace your code here
const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/quiz-game" component={QuizGame} />
  </Switch>
)

export default App
