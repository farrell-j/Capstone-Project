import './App.css';
import React, {useEffect} from 'react';
import './LoginPage.js';

function App() {

  useEffect(() => {
    fetch('http://localhost:8080/user/1234567890', {headers: {"authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEb0RfaWQiOiI0MTE0NTY3ODkwIiwiZmlyc3RuYW1lIjoiSm9uZXMiLCJsYXN0bmFtZSI6IlRvbSIsImVtYWlsIjoiam9uLmFyYnVja2xlQHNwYWNlZm9yY2UubWlsIiwib3JnYW5pemF0aW9uIjoiU1BBQ0VDT00iLCJwYXNzd29yZCI6IiQyYiQxMCRzcG0wVU9xZFBEaGhqYWxRcHlxVWtPSGI0QkxDaC9MTTREUHZJWWJNOG9SalhVOTRBSDAyTyIsIm1vZGVyYXRvciI6ZmFsc2UsImlhdCI6MTY5MDMwMzU5MX0.attL8oL0SvnCrcV3Tgt0lHOAnZghiGUY_0LeHMoRZTw"}, credentials: 'include'})
      .then(res=>res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      <input id="uname" type="text"/>
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
        }}>submit</button>
      </header>
    </div>
  )
}

export default App;
