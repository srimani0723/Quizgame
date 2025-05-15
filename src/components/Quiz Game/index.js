import './styles.css'
import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TimerContext from '../../Context/TimerContext'
// import QuestionsContext from '../../Context/QuestionsContext'

const QuizGame = () => {
  const [list, setList] = useState([])
  const [activeQues, setActiveQues] = useState(0)
  const [nextQuesTriggered, setnextQuesTriggered] = useState(false)
  const {timer, startTimer, stopTimer, resetTimer, isRunning} = useContext(
    TimerContext,
  )

  const moveToNextQues = () => {
    setActiveQues(prev => prev + 1)
    resetTimer()
  }

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
      }
    }

    getQues()
  }, [timer, isRunning])

  useEffect(() => {
    if (timer === 15 && !isRunning) startTimer()
  }, [timer, isRunning, startTimer])

  useEffect(() => {
    if (timer === 0) {
      setTimeout(() => {
        moveToNextQues()
      }, 1000)
    }
  }, [timer, moveToNextQues])

  return (
    <>
      <Header />
      {/* <QuestionsContext.Consumer>
        {value => {
      return ( */}
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
            <div className="ques-container">
              <p className="ques">ques</p>
              <ul className="mcq-box">
                <li className="ans" onClick={stopTimer}>
                  hi
                </li>
                <li className="ans">hi</li>
                <li className="ans">hi</li>
                <li className="ans">hi</li>
              </ul>
            </div>
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
      {/* )}}
      </QuestionsContext.Consumer> */}
    </>
  )
}

export default QuizGame
