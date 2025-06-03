import {useState, useEffect, useContext} from 'react'
import './styles.css'
import QuestionsContext from '../../Context/QuestionsContext'

const optionType = ['DEFAULT', 'SINGLE_SELECT', 'IMAGE']

const Question = props => {
  const {question, onAnswer, timer, isRunning, setIsRunning} = props
  const {
    correctAnsIncrement,
    wrongAnsIncrement,
    unattemptedAnsIncrement,
  } = useContext(QuestionsContext)

  useEffect(() => {
    const run = () => {
      if (timer === 0) {
        setIsRunning(false)
        unattemptedAnsIncrement(question)
      }
    }
    run()
  }, [timer, unattemptedAnsIncrement, question, setIsRunning])

  // Handle option click
  const handleOptionClick = isCorrect => {
    if (isRunning) {
      setIsRunning(false)
      const isCorrectBool = isCorrect === 'true' // Convert string to boolean
      if (isCorrectBool) {
        correctAnsIncrement()
      } else {
        wrongAnsIncrement()
      }
      onAnswer()
    }
  }

  const defaultOptionRender = () =>
    question.options.length > 2 ? (
      <ol className="mcq-box-ordered">
        {question.options.map(option => (
          <li
            key={option.id}
            className="ans"
            onClick={() => handleOptionClick(option.is_correct)}
          >
            <span>{option.text}</span>
          </li>
        ))}
      </ol>
    ) : (
      <ul className="mcq-box">
        {question.options.map(option => (
          <li
            key={option.id}
            className="ans"
            onClick={() => handleOptionClick(option.is_correct)}
          >
            <span>{option.text}</span>
          </li>
        ))}
      </ul>
    )

  return (
    <div className="ques-container">
      <p className="ques">{question.questionText}</p>
      {defaultOptionRender()}
    </div>
  )
}

export default Question
