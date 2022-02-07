import './Navbar.css';
import { GOOGLE_AUTH_URL } from '../constants';
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleIcon from '@mui/icons-material/Google';

export const Navbar = () => {
  const [logged, setLogged] = useState(true)
  
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      { logged ? (
        <div className='nav-div'>
          <NavLink to='profile'>Profile</NavLink>
          <NavLink to='teamlist'>Team</NavLink>
          <LogoutIcon onClick={() => setLogged(!logged)}>Logout</LogoutIcon>
        </div>
        ): (
        <div className='nav-div'>
          <a href={GOOGLE_AUTH_URL}>login</a>
          <LoginIcon onClick={() => setLogged(!logged)}/>
          <GoogleIcon onClick={() => setLogged(!logged)}/>
        </div>
      )}
    </nav>
  );
};
