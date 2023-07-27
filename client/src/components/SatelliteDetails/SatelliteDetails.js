import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function SatelliteDetails () {
    const { SATCAT } = useParams();

    const[ sateData, setSateData ] = useState(null)
    const[ satePosts, setSatePosts ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/satellite/${SATCAT}`)
        .then(res => res.json())
        .then(data => setSateData(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/posts/${SATCAT}`)
        .then(res => res.json())
        .then(data => setSatePosts(data))
    }, [])

    console.log(sateData);
    console.log(satePosts)

    return (
        <>  
        </>
    )
}

export default SatelliteDetails;

const SatelliteInfo = styled.div`

`

const SatellitePosts = styled.div`

`