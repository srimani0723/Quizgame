import {useState, useEffect, useContext} from 'react'
import './styles.css'
import QuestionsContext from '../../Context/QuestionsContext'

const Question = props => {
  const {question, activeQues, onAnswer, timer, isRunning, setIsRunning} = props
  const {
    correctAnsIncrement,
    wrongAnsIncrement,
    unattemptedAnsIncrement,
  } = useContext(QuestionsContext)

  console.log(timer)
  useEffect(() => {
    const run = () => {
      if (timer === 0) {
        setIsRunning(false)
        unattemptedAnsIncrement(activeQues)
      }
    }
    run()
  }, [timer, unattemptedAnsIncrement, activeQues, setIsRunning])

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

  return (
    <div className="ques-container">
      <p className="ques">{question.questionText}</p>
      <ul className="mcq-box">
        {question.options.map(option => (
          <li
            key={option.id}
            className="ans"
            onClick={() => handleOptionClick(option.is_correct)}
          >
            {question.options_type === 'IMAGE' ? (
              <div className="image-option">
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="option-image"
                />
                <span>{option.text}</span>
              </div>
            ) : (
              <span>{option.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Question
