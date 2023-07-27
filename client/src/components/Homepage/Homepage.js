import React, {useState, useEffect} from 'react';
import './Homepage.css';
// import NavBar from '../NavBar/Navbar.js';
import SideSearch from '../SideSearch/SideSearch.js';

const HomePage = ({ userToken, isModerator }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error('Error fetching posts', err))
    }, [userToken])

    return(
        <div>
        {/*      <NavBar /> */}
            <SideSearch />
            <div>
          {posts.map((post) => (
            <div key={post.SATCAT_id}>
              {/* <h2>{post.title}</h2> */}
              <p>{post.text}</p>
            </div>
          ))}
            </div>
        </div>
    )
}

export default HomePage;

