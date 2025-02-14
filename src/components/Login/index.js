import './styles.css'

const Login = () => {
  const fetchConstraints = {
    intial: 'INITIAL',
    failure: 'FAILURE',
    success: 'SUCCESS',
    in_progress: 'IN_PROGRESS',
  }

  return (
    <div className="main-bg">
      <div className="bg">
        <img
          src="https://res.cloudinary.com/ddlwx2lmy/image/upload/v1739550612/t5vybnsltvlshkjitfvs.png"
          alt="login website logo"
          className="logo"
        />
        <form className="form">
          <div className="input-div">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input type="text" id="username" className="input" />
          </div>

          <div className="input-div">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input type="text" id="password" className="input" />
          </div>

          <div className="checkbox-div">
            <input
              type="checkbox"
              id="showpassword"
              className="checkbox-input"
            />
            <label htmlFor="showpassword" className="checkbox-label">
              Show Password
            </label>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <p className="error-msg">*error</p>
        </form>
      </div>
    </div>
  )
}

export default Login
