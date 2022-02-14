import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '../common/Navbar';
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile';
import { Meetingroom } from '../components/meetingrooms/Meetingroom';
import { TeamList } from '../components/team/TeamList';
import { MeetingList } from '../components/team/MeetingList';
import { NotFound } from '../common/NotFound';
import { OAuth2RedirectHandler } from '../users/OAuth2RedirectHandler';
import { useEffect, useState } from 'react'
import { ACCESS_TOKEN } from '../constants';

import {
  getMessages, getMeesagesByMeetingId,
  createMeeting, joinMeeting, finishMeeting,
  getMeetings, getMeetingByMeetingId, getMeetingsByTeamId,
  getAttenders, getAttendersByMeetingId
} from '../util/APIUtils';

function App() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false)

  if (localStorage.getItem(ACCESS_TOKEN) && !authenticated) {
    setAuthenticated(true)
  }

  // 여기에 POST API 요청데이터 선언하기 ==============================

  const requestCreateMeeting = {
    topic: "create meeting 0214 final",
    meetingType: "SIXHAT",
    teamId: 123
  }

  const requestJoinMeeting = {
    meetingId: 182,
    userId: 4, //teamId: 123
    hatColor: "BLACK"
  }

  const requestFinishMeeting = {
    meetingId: 190
  }

  
  function apiTest() {

    // 여기에 APIUtils 함수 테스트 하기 ==============================

    getMessages(); // messages
    getMeesagesByMeetingId(1); // message/{meetingId}
    
    getMeetings(); // meetings
    getMeetingByMeetingId(1); // meeting/{meetingId}
    getMeetingsByTeamId(1); // meeting/team/{teamId}

    getAttenders(); // attenders
    getAttendersByMeetingId(1); // attender/{meetingId}

    // createMeeting(requestCreateMeeting); // meeting/create
    // joinMeeting(requestJoinMeeting); // meeting/join
    // finishMeeting(requestFinishMeeting); // meeting/finish

  }

  useEffect(() => {
    apiTest();
  }, [])


  return (
    <div className="App">
      { !location.pathname.includes("meetingroom") && 
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      }
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='teamlist' element={<TeamList/>}></Route>
        <Route path='teamlist/:teamId' element={<MeetingList/>}></Route>
        <Route path='meetingroom' element={<Meetingroom />} />
        <Route path='oauth2/redirect/*' element={<OAuth2RedirectHandler />} />
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
