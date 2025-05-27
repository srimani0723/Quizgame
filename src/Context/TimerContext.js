import React from 'react'

const TimerContext = React.createContext({
  timer: 15,
  isRunning: false,
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
})

export default TimerContext
