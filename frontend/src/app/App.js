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
import { getCurrentUser } from '../util/APIUtils';

function App() {
  const location = useLocation();
  const [state, setState] = useState(
    {
      authenticated: false,
      currentUser: null,
      loading: true 
    }
  )
  if (localStorage.getItem(ACCESS_TOKEN) && !state.authenticated) {
    setState(prevState => ({
      ...prevState,
      [state.authenticated]: true
    }))
  }
  
  // function loadCurrentlyLoggedInUser() {
  //   getCurrentUser()
  //   .then(response => {
  //     this.setState({
  //       currentUser: response,
  //       authenticated: true,
  //       loading: false
  //     });
  //   }).catch(error => {
  //     this.setState({
  //       loading: false
  //     });  
  //   });    
  // }
    
  return (
    <div className="App">
      { !location.pathname.includes("meetingroom") && 
        <Navbar
          authenticated={state.authenticated}
          setState={setState}
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
