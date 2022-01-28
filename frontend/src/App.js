import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Home } from './components/Home'
import { Profile } from './components/Profile';
import { Team } from './components/Team';
import { Meetingroom } from './meetingrooms/Meetingroom';
import { NoMatch } from './errorpage/NoMatch';

function App() {
  const location = useLocation();
  
  return (
    <div className="App">
      { !location.pathname.includes("meetingroom") && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='team' element={<Team/>}></Route>
        <Route path='meetingroom' element={<Meetingroom />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>

    </div>
  );
}

export default App;
