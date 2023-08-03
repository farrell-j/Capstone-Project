import React, {useState, useEffect, useRef, useContext} from 'react';
import './Homepage.css';
// import NavBar from '../NavBar/Navbar.js';
import SideSearch from '../SideSearch/SideSearch.js';
import Trending from '../Trending/Trending';
import { TokenContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Space_Monkey from '../../images/Space_Monkey_No_Background.svg';

const HomePage = () => {
    const [satlist, setSatlist] = useState([]);
    const {userLoggedIn} = useContext(TokenContext);
    const navigate = useNavigate()

    useEffect(()=> {
      if(!userLoggedIn) {
        navigate('/login');
      } else {
        fetch('http://localhost:8080/satellites')
          .then(res => res.json())
          .then(async data => {
            for (let satellite of data) {
              let temp = 0;
              let tempArr = [];
              await fetch(`http://localhost:8080/posts/${satellite.SATCAT}`)
                  .then(res => res.json())
                  .then(data => {
                      tempArr.push(data)
                      for (let t of tempArr[0]) {
                          temp += t.up_votes;
                      }
                      satellite['up_votes'] = temp
                  })                
            }
            setSatlist(data)
          })
      }
    }, [])

    if (satlist.length > 0) {
      return(
        <div>
            <SideSearch />
            <Trending satlist={satlist}/>
        </div>
      )
    } else {
      return <img id="monkeyspin" src={Space_Monkey} alt="Loading..." width="350rem"/>
    }
}

export default HomePage;