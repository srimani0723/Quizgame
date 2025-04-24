import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import './styles.css'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const history = useHistory()
  const [warnMsg, setWarnMsg] = useState(false)

  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const onStartGame = () => {
    setWarnMsg(true)
    setTimeout(() => {
      history.replace('/quiz-game')
    }, 2000)
  }

  return (
    <>
      <Header />
      <div className="home-bg">
        <div className="home">
          <div className="content">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png "
              alt="start quiz game"
              className="home-img"
            />
            <p className="text-1">
              How Many Of These Questions Do You Actually Know?
            </p>
            <p className="text-2">
              Test yourself with these easy quiz questions and answers
            </p>
            <button
              onClick={onStartGame}
              type="button"
              className="start-quiz-btn"
            >
              Start Quiz
            </button>
          </div>
          {warnMsg && (
            <div className="warning">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                alt="warning icon"
                className="warning-img"
              />
              <p className="warning-txt">
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
