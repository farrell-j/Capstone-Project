import React, {useEffect, useState, useRef} from 'react'
import './Trending.css'
import { useNavigate } from 'react-router-dom'

const Trending = ({satlist}) => {
    const didMount = useRef(false);
    const [curIndex, setCurIndex] = useState(0);
    const [activeEvent, setActiveEvent] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        satlist.sort((a, b) => b.up_votes - a.up_votes)
        if (!didMount.current) {
            didMount.current = true;
        }
    }, [satlist])

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            if(curIndex < 4) {
                setActiveEvent(satlist[curIndex]);
                setCurIndex(curIndex + 1);
            } else {
                setActiveEvent(satlist[curIndex]);
                setCurIndex(0);
            }
        }, 5000);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [satlist, curIndex]);

    if (activeEvent.SATCAT) {
        return (
            <div key={activeEvent.SATCAT} id="trendCon" onClick={()=>{}}>
                <button onClick={()=>{
                    if(curIndex > 0) {
                        setActiveEvent(satlist[curIndex - 1]);
                        setCurIndex(curIndex - 1)
                    } else {
                        setCurIndex(4)
                    }
                }}>Previous</button>
                    <div onClick={()=>{
                        navigate(`/satellite/${activeEvent.SATCAT}`)
                    }} id='satItem'>
                        <p>SATCAT: {activeEvent.SATCAT}</p>
                        <p>Launch Date: {activeEvent.launch_date}</p>
                        <p>Up Votes: {activeEvent.up_votes}</p>
                    </div>
                <button onClick={()=>{
                    if(curIndex < 4) {
                        setActiveEvent(satlist[curIndex + 1]);
                        setCurIndex(curIndex + 1)
                    } else {
                        setCurIndex(0)
                    }
                }}>Next</button>
            </div>
        )
    } else {
        return (
            <div id="trendCon">
                <h1>Satellite Loading...</h1>
            </div>
        )
    }
}

export default Trending