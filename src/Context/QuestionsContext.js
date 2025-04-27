import React from 'react'

const QuestionsContext = React.createContext({
  correctAns: 0,
  wrongAns: 0,
  unattemptedAns: [],
  correctAnsIncrement: () => {},
  wrongAnsIncrement: () => {},
  unattemptedAnsIncrement: () => {},
})

export default QuestionsContext
