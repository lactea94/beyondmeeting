import { NavLink } from 'react-router-dom'
import { useState } from 'react';

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
        <div>
          <NavLink to='profile'>Profile</NavLink>
          <NavLink to='team'>Team</NavLink>
          <button onClick={() => setLogged(!logged)}>Logout</button>
        </div>
        ): (
          <button onClick={() => setLogged(!logged)}>Login</button>
      )}
    </nav>
  );
};
