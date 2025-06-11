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
  const [isAnswered, setIsAnswered] = useState(false)

  const ansObj = question.options.filter(each => each.isCorrect === 'true')
  console.log(ansObj, selectedAnsObj, isAnswered)

  useEffect(() => {
    const run = () => {
      if (timer === 0) {
        setIsRunning(false)
        onAnswer()
        setIsAnswered(true)
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
      setIsAnswered(true)
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
            className={`ans `}
            onClick={() => {
              setSelectedAnsObj(option)
              handleOptionClick(option.isCorrect)
            }}
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
            onClick={() => {
              setSelectedAnsObj(option)
              handleOptionClick(option.isCorrect)
            }}
          >
            <span>{option.text}</span>
          </li>
        ))}
      </ul>
    )

  const renderImageOptions = () => (
    <ul className="mcq-box">
      {question.options.map(option => (
        <li
          key={option.id}
          className="img-ans-li"
          onClick={() => {
            setSelectedAnsObj(option)
            handleOptionClick(option.isCorrect)
          }}
        >
          <img src={option.imageUrl} alt={option.text} className="img-ans" />
        </li>
      ))}
    </ul>
  )

  const renderSingleSelectOptions = () => (
    <ul className="mcq">
      {question.options.map((option, index) => (
        <li
          key={option.id}
          style={{listStyle: 'none', display: 'flex', alignItems: 'center'}}
        >
          <input
            type="radio"
            name={option.id}
            value={option.text}
            onClick={() => {
              setSelectedAnsObj(option)
              handleOptionClick(option.isCorrect)
            }}
            disabled={!isRunning}
            style={{marginRight: '5px'}}
          />
          <p style={{marginBottom: '5px'}}>{option.text}</p>
        </li>
      ))}
    </ul>
  )

  const renderByQuesType = () => {
    switch (question.optionsType) {
      case optionType[0]:
        return renderDefaultOptions()
      case optionType[1]:
        return renderSingleSelectOptions()
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
