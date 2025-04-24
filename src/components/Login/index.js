import {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './styles.css'

// const fetchConstraints = {
//   intial: 'INITIAL',
//   failure: 'FAILURE',
//   success: 'SUCCESS',
//   in_progress: 'IN_PROGRESS',
// }

const Login = () => {
  const [username, SetUsername] = useState('')
  const [password, SetPassword] = useState('')
  const [viewPass, SetViewPass] = useState(false)
  const [errorMsg, SetErrorMsg] = useState('')
  const history = useHistory()
  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken !== undefined) {
    return <Redirect to="" />
  }

  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const res = await fetch('https://apis.ccbp.in/login', options)
    const data = await res.json()
    if (res.ok) {
      SetErrorMsg('')
      onSuccess(data.jwt_token)
    } else {
      SetErrorMsg(data.error_msg)
    }
  }

  const togglePass = () => {
    SetViewPass(!viewPass)
  }

  const readUserInput = e => {
    SetUsername(e.target.value)
  }

  const readPassInput = e => {
    SetPassword(e.target.value)
  }

  return (
    <div className="main-bg">
      <div className="bg">
        <img
          src="https://res.cloudinary.com/ddlwx2lmy/image/upload/v1739550612/t5vybnsltvlshkjitfvs.png"
          alt="login website logo"
          className="logo"
        />
        <form className="form" onSubmit={onSubmitForm}>
          <div className="input-div">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={readUserInput}
            />
          </div>

          <div className="input-div">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type={viewPass ? 'text' : 'password'}
              id="password"
              className="input"
              value={password}
              onChange={readPassInput}
            />
          </div>

          <div className="checkbox-div">
            <input
              type="checkbox"
              id="showpassword"
              className="checkbox-input"
              onChange={togglePass}
            />
            <label htmlFor="showpassword" className="checkbox-label">
              Show Password
            </label>
          </div>

          <button className="login-btn" type="submit" onClick={onSubmitForm}>
            Login
          </button>

          {errorMsg === '' ? null : <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
