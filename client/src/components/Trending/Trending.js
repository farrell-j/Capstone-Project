import React, {useEffect, useState} from 'react'

const Trending = () => {
    const [satlist, setSatlist] = useState([])
    const [postlist, setPostlist] = useState([])

    useEffect(()=> {
        fetch('http://localhost:8080/satellites')
            .then(res => res.json())
            .then(data => setSatlist(data))
    }, [])

    useEffect(() => {
        if(satlist.length > 0) {
            for (let satellite of satlist) {
                let temp = 0;
                let tempArr = [];
                fetch(`http://localhost:8080/posts/${satellite.SATCAT}`)
                    .then(res => res.json())
                    .then(data => {
                        tempArr.push(data)
                        for (let t of tempArr[0]) {
                            temp += t.up_votes;
                        }
                        postlist.push({"satellite": satellite, "up_votes": temp})
                    })                
            }
            setPostlist(postlist)
        }
        if(postlist.length > 5) {
            console.log('hello?')
            postlist.sort((a, b) => b.up_votes - a.up_votes)
            setPostlist(postlist.slice(0, 5));
        }
    }, [satlist, postlist])

    return (
        <div>
            {postlist.map(post => {
                return <div>
                    <p>SATCAT: {post.SATCAT_id}</p>
                    <p>Post: {}</p>
                    <button></button>
                    <button></button>
                </div>
            })}
        </div>
    )
}

export default Trending