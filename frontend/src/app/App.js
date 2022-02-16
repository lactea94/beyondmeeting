import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '../common/Navbar';
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile';
import { Meetingroom } from '../components/meetingrooms/Meetingroom';
import { Normal } from '../components/meetingrooms/rooms/Normal';
import { SixHat } from '../components/meetingrooms/rooms/SixHat';
import { TeamList } from '../components/team/TeamList';
import { MeetingList } from '../components/team/MeetingList';
import { ManageTeam } from '../components/team/ManageTeam';
import { NotFound } from '../common/NotFound';
import { OAuth2RedirectHandler } from '../users/OAuth2RedirectHandler';
import { useState } from 'react'
import { ACCESS_TOKEN } from '../constants';
import { MeetingResult } from '../components/team/MeetingResult';



export default function App() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false)
  if (localStorage.getItem(ACCESS_TOKEN) && !authenticated) {
    setAuthenticated(true)
  }
  function controlstyle () {
    if(location.pathname.includes("profile")) {
      return (
        { paddingTop: 65 }
      );
    }
    else if (!location.pathname.includes("room")) {
      return(
        { paddingTop: 100 }
      );
    } else {
      return (
        null
      )
    }
  }
    
  return (
    <div className="App" style={controlstyle()}>
      { !location.pathname.includes("room") && 
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      }
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='team' element={<TeamList/>}></Route>
        <Route path='team/:teamId' element={<MeetingList/>}></Route>
        <Route path='team/:teamId/update' element={<ManageTeam/>}></Route>
        <Route path='team/:teamId/:meetingId/room/normal' element={<Normal/>} />
        <Route path='team/:teamId/:meetingId/room/sixhat' element={<SixHat/>} />
        <Route path='team/:teamId/:meetingId/result' element={<MeetingResult/>} />
        <Route path='oauth2/redirect/*' element={<OAuth2RedirectHandler />} />
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}
