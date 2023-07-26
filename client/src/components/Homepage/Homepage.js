import React, {useState, useEffect} from 'react';
import NavBar from '../NavBar/Navbar.js'
import SideSearch from '../SideSearch/SideSearch.js';

const HomePage = ({ userToken, isModerator }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('localhost:8080/posts', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error('Error fetching posts', err))
    })

    return(
        <div>
            <NavBar />
            <SideSearch />
            <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </div>
          ))}
        </div>
        </div>
    )
}

