import './styles.css'
import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import QuestionsContext from '../../Context/QuestionsContext'
import Question from '../Question'

const QuizGame = () => {
  const [list, setList] = useState([])
  const [activeQues, setActiveQues] = useState(0)
  const [timer, setTimer] = useState(15)
  const [isRunning, setIsRunning] = useState(false)
  const {
    correctAnsIncrement,
    wrongAnsIncrement,
    unattemptedAnsIncrement,
  } = useContext(QuestionsContext)

  useEffect(() => {
    const getQues = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/assess/questions'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const fetchedData = await fetch(url, options)
      if (fetchedData.ok) {
        const data = await fetchedData.json()
        setList(data.questions)
        console.log(data)
      }
    }
    getQues()
  }, [])

  useEffect(() => {
    let intervalId
    if (isRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, timer])

  useEffect(() => {
    setTimer(15)
    setIsRunning(true)
  }, [activeQues])

  // Handle timer expiry
  useEffect(() => {
    if (timer === 0 && isRunning) {
      setIsRunning(false)
      unattemptedAnsIncrement(activeQues)
      if (activeQues < list.length - 1) {
        setActiveQues(prev => prev + 1)
      } else {
        console.log('Quiz completed!') // Replace with navigation or results logic
      }
    }
  }, [timer, isRunning, unattemptedAnsIncrement, activeQues, list.length])

  // Move to next question
  const moveToNextQues = () => {
    if (activeQues < list.length - 1) {
      setActiveQues(prev => prev + 1)
    } else {
      console.log('Quiz completed!') // Replace with navigation or results logic
    }
  }

  const currentQuestion = list[activeQues]

  return (
    <>
      <Header />
      <>
        <div className="quiz-bg">
          <div className="quiz-box">
            <div className="top-section">
              <div className="ques-count">
                <p className="ques-h">Question</p>
                <p className="ques-p">
                  {activeQues}/{list.length}
                </p>
              </div>
              <div className="count-box">
                <p className="count-p">{timer}</p>
              </div>
            </div>
            <div className="middle-section">
              {/* <Question
                question={currentQuestion}
                onAnswer={moveToNextQues}
                timer={timer}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              /> */}
              <div className="bottom-section">
                <button
                  type="button"
                  className="next-btn"
                  onClick={moveToNextQues}
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default QuizGame
