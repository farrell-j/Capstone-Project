import './App.css';
import React, {useState} from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import Navbar from './components/NavBar/NavBar.js';
import {Routes, Route} from 'react-router-dom';
import Register from './components/Register/Register.js';
import SideSearch from './components/SideSearch/SideSearch.js';
import Fetch_TLE from './components/Fetch_TLE/Fetch_TLE.js'
import HomePage from './components/Homepage/Homepage.js'
import Track_Tool from './components/Track_Tool/Track_Tool';
import SatelliteDetails from './components/SatelliteDetails/SatelliteDetails';
import Trending from './components/Trending/Trending';
import AddSat from './components/AddSat/AddSat'
import FAQ_Full from './components/FAQ/FAQ_Full';
import Dancing from './components/Dancing_Monkey/Dancing.js';
import Profile from './components/Profile/Profile.js'
import Directory from './components/Directory/Directory.js';
import Resources_Link from './components/FAQ/Resources_Link.js'
import FAQ_Link from './components/FAQ/FAQ_Link.js'
import Learn_Link from './components/FAQ/Learn_Link.js'
// import login_background from '../images/STARS_background_for_homepage.svg';
import ModeratorPage from './components/Moderator/Moderator.js'
import Presentation from './components/Presentation/Presentation.js'



export const TokenContext = React.createContext()
function App() {
  const [token, setToken] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  return (
    <TokenContext.Provider value={{token, setToken, userLoggedIn, setUserLoggedIn}}>
        <header className="App-header">
          <Navbar/>
        </header>
         <Dancing/>
        <div className='App'>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/test' element={<Trending/>}/>
            <Route path='/TLE' element={<Fetch_TLE />}/>
            {/* <Route path='/track' element={<Track_Tool />} /> */}
            <Route path='/homepage/:DoD_id' element={<HomePage />}/>
            <Route path='/satellite/:SATCAT' element={<SatelliteDetails/>} />
            <Route path='/addsat' element={<AddSat/>} />
            <Route path='/directory' element={<Directory/>} />
            <Route path='/profile/:userid' element={<Profile/>} />
            <Route path='/faq' element={<FAQ_Full/>} />
            <Route path='/resources_link' element={<Resources_Link />} />
            <Route path='/faq_link' element={<FAQ_Link />} />
            <Route path='/learn_link' element={<Learn_Link />} />
            <Route path='/moderator/:DoD_id' element={<ModeratorPage />} />
            <Route path='/presentation' element={<Presentation />} />
          </Routes>
        </div>
    </TokenContext.Provider>
  )
}

export default App;



/* <input id="uname" type="text"/>
<input id="pword" type="text"/>
<button onClick={()=>{
  const loginObj = {
    "DoD_id": document.getElementById('uname').value,
    "password": document.getElementById('pword').value
  }
  const init = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginObj)
  }
  fetch('http://localhost:8080/login', init)
  .then(res => res.json())
  .then(data => {
              console.log(data);
              fetch('http://localhost:8080/user/1234567890', {headers: {"authorization": `bearer ${data.accessToken}`}, credentials: 'include'})
              .then(res=>res.json())
              .then(data=>console.log(data))})
            }}>submit</button> */
            // useEffect(() => {
            //   fetch('http://localhost:8080/user/1234567890', {headers: {"authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEb0RfaWQiOiI0MTE0NTY3ODkwIiwiZmlyc3RuYW1lIjoiSm9uZXMiLCJsYXN0bmFtZSI6IlRvbSIsImVtYWlsIjoiam9uLmFyYnVja2xlQHNwYWNlZm9yY2UubWlsIiwib3JnYW5pemF0aW9uIjoiU1BBQ0VDT00iLCJwYXNzd29yZCI6IiQyYiQxMCRzcG0wVU9xZFBEaGhqYWxRcHlxVWtPSGI0QkxDaC9MTTREUHZJWWJNOG9SalhVOTRBSDAyTyIsIm1vZGVyYXRvciI6ZmFsc2UsImlhdCI6MTY5MDMwMzU5MX0.attL8oL0SvnCrcV3Tgt0lHOAnZghiGUY_0LeHMoRZTw"}, credentials: 'include'})
            //     .then(res=>res.json())
            //     .then(data => console.log(data))
            // }, [])}