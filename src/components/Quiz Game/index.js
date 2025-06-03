import './styles.css'
import {useEffect, useState, useCallback} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Question from '../Question'

const toCamelCase = str =>
  str.replace(/(_\w)/g, match => match[1].toUpperCase())

const convertKeysToCamelCase = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item))
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = toCamelCase(key)
      acc[camelKey] = convertKeysToCamelCase(obj[key])
      return acc
    }, {})
  }
  return obj
}

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const QuizGame = () => {
  const [list, setList] = useState([])
  const [activeQues, setActiveQues] = useState(0)
  const [timer, setTimer] = useState(15)
  const [isRunning, setIsRunning] = useState(false)
  //   const [disableBtn, setDisableBtn] = useState(true)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getQues = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
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
      const newData = convertKeysToCamelCase(data.questions)
      setList(newData)
      console.log(newData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getQues()
  }, [getQues])

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
    if (apiStatus === apiStatusConstants.success && list.length > 0) {
      setTimer(15)
      setIsRunning(true)
    }
  }, [activeQues, apiStatus, list.length])

  //   useEffect(() => {
  //     if (timer === 0 && list.length > 0) {
  //       setIsRunning(false)
  //       unattemptedAnsIncrement(activeQues)
  //     }
  //   }, [timer, unattemptedAnsIncrement, list.length])

  // Move to next question
  const moveToNextQues = () => {
    if (activeQues < list.length - 1) {
      setActiveQues(prev => prev + 1)
      setTimer(15)
    } else {
      console.log('Quiz completed!') // Replace with navigation or results logic
    }
  }

  const retry = () => {
    setList([])
    setActiveQues(0)
    setApiStatus(apiStatusConstants.initial)
    setIsRunning(false)
    setTimer(15)
    getQues()
  }

  const QuizSection = () => {
    const currentQuestion = list[activeQues]

    return activeQues < list.length - 1 ? (
      <>
        <div className="top-section">
          <div className="ques-count">
            <p className="ques-h">Question</p>
            <p className="ques-p">
              {activeQues + 1}/{list.length}
            </p>
          </div>
          <div className="count-box">
            <p className="count-p">{timer}</p>
          </div>
        </div>
        <div className="middle-section">
          <Question
            question={currentQuestion}
            onAnswer={moveToNextQues}
            timer={timer}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
          <div className="bottom-section">
            <button
              type="button"
              className={timer > 0 ? 'next-btn-disable' : 'next-btn'}
              onClick={moveToNextQues}
              disabled={timer > 0}
            >
              Next Question
            </button>
          </div>
        </div>
      </>
    ) : (
      <p>Completed</p>
    )
  }

  const FailureView = () => (
    <div className="failure-box">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure-view"
        className="failure-img"
      />
      <h1 className="failure-h1">Something went wrong</h1>
      <p className="failure-p">Our server are busy please try again</p>
      <button className="failure-btn" type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderQuizGame = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return QuizSection()
      case apiStatusConstants.failure:
        return FailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <>
        <div className="quiz-bg">
          <div className="quiz-box">{renderQuizGame()}</div>
        </div>
      </>
    </>
  )
}

export default QuizGame
