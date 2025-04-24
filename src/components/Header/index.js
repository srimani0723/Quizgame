import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import './styles.css'

const Header = () => {
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <div className="header-content">
        <img
          src="https://res.cloudinary.com/ddlwx2lmy/image/upload/v1739550612/t5vybnsltvlshkjitfvs.png"
          alt="website logo"
          className="header-logo"
        />
        <button onClick={onClickLogout} className="custom-btn" type="button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
