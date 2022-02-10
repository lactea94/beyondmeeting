import './Navbar.css';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL } from '../constants';
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleIcon from '@mui/icons-material/Google';
import { ReactComponent as NavLogoImage } from './img/로고시안.svg'

export function Navbar () {
  const [logged, setLogged] = useState(false)
  if (localStorage.getItem(ACCESS_TOKEN)) {
    console.log(localStorage.getItem(ACCESS_TOKEN))
  }

  return (
    <nav>
      <NavLink to='/'>
        <NavLogoImage width="60"></NavLogoImage>
      </NavLink>
      { logged ? (
        <div className='nav-div'>
          <NavLink className='nav-decoration' to='profile' style={{ textDecoration : 'none' }}>Profile</NavLink>
          <NavLink className='nav-decoration' to='teamlist' style={{ textDecoration : 'none' }}>Team</NavLink>
          <NavLink className='nav-decoration' to='' style={{ textDecoration : 'none' }} onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>Meetingroom</NavLink>
          <LogoutIcon onClick={() => setLogged(!logged)}>Logout</LogoutIcon>
        </div>
        ): (
        <div className='nav-div'>
          <a className='nav-decoration' href={GOOGLE_AUTH_URL} style={{ textDecoration : 'none' }}>login</a>
          <LoginIcon onClick={() => setLogged(!logged)}/>
          <GoogleIcon onClick={() => setLogged(!logged)}/>
        </div>
      )}
    </nav>
  );
};
