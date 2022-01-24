import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
export const Navbar = () => {
  const [logged, setLogged] = useState(true)
  

  // if ( logged ) {
  //   return (
  //     <nav>
  //       <NavLink to='/'>Home</NavLink>
  //       <NavLink to='profile'>Profile</NavLink>
  //       <NavLink to='team'>Team</NavLink>
  //       <button>Logout</button>
  //     </nav>
  //   )
  // } else {
  //   return (
  //     <nav>
  //       <NavLink to='/'>Home</NavLink>
  //       <button>Login</button>
  //     </nav>
  //   )
  // }

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      { logged ? (
        <div className='nav-div'>
          <NavLink to='profile'>Profile</NavLink>
          <NavLink to='team'>Team</NavLink>
          <LogoutIcon onClick={() => setLogged(!logged)}>Logout</LogoutIcon>
        </div>
        ): (
        <div className='nav-div'>
          <LoginIcon onClick={() => setLogged(!logged)}>Login</LoginIcon>
        </div>
      )}
    </nav>
  );
};
