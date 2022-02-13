import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '../common/Navbar';
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile';
import { Meetingroom } from '../components/meetingrooms/Meetingroom';
import { TeamList } from '../components/team/TeamList';
import { DefaultMeetingList } from '../components/team/DefaultMeetingList';
import { MeetingList } from '../components/team/MeetingList';
import { NotFound } from '../common/NotFound';
import { OAuth2RedirectHandler } from '../users/OAuth2RedirectHandler';
import { useState } from 'react'
import { ACCESS_TOKEN } from '../constants';

function App() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false)

  if (localStorage.getItem(ACCESS_TOKEN) && !authenticated) {
    setAuthenticated(true)
  }
    
  return (
    <div className="App" style={ !location.pathname.includes("meetingroom") ? { paddingTop: 100 } : null }>
      { !location.pathname.includes("meetingroom") && 
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      }
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='teamlist' element={<TeamList/>}>
          <Route index element={<DefaultMeetingList/>}></Route>
          <Route path=':teamId' element={<MeetingList/>}></Route>
        </Route>
        <Route path='meetingroom' element={<Meetingroom />} />
        <Route path='oauth2/redirect/*' element={<OAuth2RedirectHandler />} />
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
