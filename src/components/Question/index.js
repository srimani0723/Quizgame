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
  const [selectedAnsObj, setSelectedAnsObj] = useState('')

  const ansObj = question.options.filter(each => each.isCorrect === 'true')
  console.log(ansObj)

  useEffect(() => {
    const run = () => {
      if (timer === 0) {
        setIsRunning(false)
        onAnswer()
        unattemptedAnsIncrement(question)
      }
    }
    run()
  }, [timer, unattemptedAnsIncrement, question, setIsRunning])

  // Handle option click
  const handleOptionClick = isCorrect => {
    if (isRunning) {
      setIsRunning(false)
      onAnswer()
      const isCorrectBool = isCorrect === 'true'
      if (isCorrectBool) {
        correctAnsIncrement()
      } else {
        wrongAnsIncrement()
      }
    }
  }

  const renderDefaultOptions = () =>
    question.options.length > 2 ? (
      <ol className="mcq-box">
        {question.options.map((option, index) => (
          <li
            key={option.id}
            className="ans"
            onClick={() => handleOptionClick(option.isCorrect)}
          >
            <span className="ans-alpha">
              {String.fromCharCode(65 + index)}.{' '}
            </span>
            <span> {option.text}</span>
          </li>
        ))}
      </ol>
    ) : (
      <ul className="mcq-box">
        {question.options.map(option => (
          <li
            key={option.id}
            className="ans"
            onClick={() => handleOptionClick(option.isCorrect)}
          >
            <span>{option.text}</span>
          </li>
        ))}
      </ul>
    )

  const renderImageOptions = () => (
    <ul className="mcq-box">
      {question.options.map(option => (
        <li key={option.id} className="img-ans-li" onClick={handleOptionClick}>
          <img src={option.imageUrl} alt={option.text} className="img-ans" />
        </li>
      ))}
    </ul>
  )

  const singleSelectOptions = () => {}

  const renderByQuesType = () => {
    switch (question.optionsType) {
      case optionType[0]:
        return renderDefaultOptions()
      case optionType[1]:
        return 'single_select'
      case optionType[2]:
        return renderImageOptions()
      default:
        return null
    }
  }

  return (
    <div className="ques-container">
      <p className="question">{question.questionText}</p>
      {renderByQuesType()}
    </div>
  )
}

export default Question
