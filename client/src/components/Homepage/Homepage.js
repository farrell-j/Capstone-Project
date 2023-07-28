import React, {useState, useEffect, useRef} from 'react';
import './Homepage.css';
// import NavBar from '../NavBar/Navbar.js';
import SideSearch from '../SideSearch/SideSearch.js';
import Trending from '../Trending/Trending';

const HomePage = ({ userToken, isModerator }) => {
    const [satlist, setSatlist] = useState([]);
    

    useEffect(()=> {
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
    }, [])

    if (satlist.length > 0) {
      return(
        <div>
            <SideSearch />
            <Trending satlist={satlist}/>
        </div>
      )
    }
}

export default HomePage;

