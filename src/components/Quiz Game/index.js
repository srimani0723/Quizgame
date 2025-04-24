import './styles.css'
import Header from '../Header'

const QuizGame = () => {
  const count = 15
  return (
    <>
      <Header />
      <div className="quiz-bg">
        <div className="quiz-box">
          <div className="content-section">
            <div className="top-section">
              <div className="ques-count">
                <p className="ques-h">Question</p>
                <p className="ques-p">1/20</p>
              </div>
              <div className="count-box">
                <p className="count-p">{count}</p>
              </div>
            </div>
            <div className="middle-section">
              <div className="ques-container">
                <p className="ques">ques</p>
                <ul className="mcq-box">
                  <li className="ans">hi</li>
                  <li className="ans">hi</li>
                  <li className="ans">hi</li>
                  <li className="ans">hi</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <button type="button" className="next-btn">
              Next Question
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizGame
