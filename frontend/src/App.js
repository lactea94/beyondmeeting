import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Home } from './components/Home'
import { Profile } from './components/Profile';
import { Team } from './components/Team';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='team' element={<Team/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
