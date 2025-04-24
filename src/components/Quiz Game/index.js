import './styles.css'
import Header from '../Header'

const QuizGame = () => {
  const game = 'hi'
  return (
    <>
      <Header />
      <div className="quiz-bg">
        <div className="quiz-box">
          <p>{game}</p>

          <div className="top-section">
            <div className="ques-count">
              <p className="ques-h">Question</p>
              <p className="ques-p">1/20</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizGame
