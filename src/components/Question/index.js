import {useState, useEffect, useContext} from 'react'
import './styles.css'
import QuestionsContext from '../../Context/QuestionsContext'

const Question = () => {
  const {
    correctAnsIncrement,
    wrongAnsIncrement,
    unattemptedAnsIncrement,
  } = useContext(QuestionsContext)
}

export default Question
