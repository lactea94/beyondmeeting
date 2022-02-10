import './Navbar.css';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL } from '../constants';
import { NavLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleIcon from '@mui/icons-material/Google';

export function Navbar (props) {

  return (
    <nav>
      <NavLink to='/'>
        <img className='navLogoImage' src={require("./img/보라로고시안.png")} alt="logo"></img>
      </NavLink>
      { props.logged ? (
        <div className='nav-div'>
          <NavLink className='nav-decoration' to='profile' style={{ textDecoration : 'none' }}>Profile</NavLink>
          <NavLink className='nav-decoration' to='teamlist' style={{ textDecoration : 'none' }}>Team</NavLink>
          <NavLink className='nav-decoration' to='' style={{ textDecoration : 'none' }} onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>Meetingroom</NavLink>
          <LogoutIcon
            onClick={() => {
              props.setLogged(false)
              localStorage.removeItem(ACCESS_TOKEN)
          }}>
            Logout
          </LogoutIcon>
        </div>
        ): (
        <div className='nav-div'>
          <a className='nav-decoration' href={GOOGLE_AUTH_URL} style={{ textDecoration : 'none' }}>login</a>
          <LoginIcon/>
          <GoogleIcon/>
        </div>
      )}
    </nav>
  );
};
