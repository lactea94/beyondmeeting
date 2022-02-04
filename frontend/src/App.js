import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Home } from './components/Home'
import { Profile } from './components/Profile/Profile';
import { TeamList } from './components/team/TeamList';
import { DefaultMeetingList } from './components/team/DefaultMeetingList';
import { MeetingList } from './components/team/MeetingList';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='teamlist' element={<TeamList/>}>
          <Route index element={<DefaultMeetingList/>}></Route>
          <Route path=':teamId' element={<MeetingList/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
