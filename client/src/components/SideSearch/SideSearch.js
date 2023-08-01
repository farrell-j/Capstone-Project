import React, {useEffect, useState, useContext} from "react"
import './SideSearch.css'
import styled from 'styled-components'
import { useNavigate} from "react-router-dom"
import { TokenContext } from "../../App"

const SideSearch = () => {
    const [searchTerm, setSearchTerm]  = useState('');
    const [satlist, setSatlist] = useState([]);
    const navigate = useNavigate();
    const {token} = useContext(TokenContext);


    useEffect(() => {
        if (searchTerm === '') {
            fetch('http://localhost:8080/search')
                .then(res => res.json())
                .then(data => setSatlist(data))
        } else {
            fetch(`http://localhost:8080/search/${searchTerm}`)
                .then(res => res.json())
                .then(data => setSatlist(data))
        }
    }, [searchTerm])

    if(satlist.length > 0) {
        return (
            <div id="sideSearchContainer">
                <input id="sidesearchbar" type="text" placeholder="Search..." onChange={()=>{
                    setSearchTerm(document.getElementById('sidesearchbar').value)
                }}/>
                <div id="displaySearchContainer">
                    {satlist.map(satellite => {
                        return <div key={satellite.SATCAT} id="slistwrap"><div className="satCon" onClick={()=>{
                            navigate(`/satellite/${satellite.SATCAT}`)
                        }}>
                            <p>SATCAT: {satellite.SATCAT}</p>
                            <p>Created By: {satellite.created_by_id}</p>
                            <p>Launch Year: {satellite.launch_date}</p>
                        </div>
                        {token.moderator ? <button id="deleteBtn" onClick={()=>{
                            fetch(`http://localhost:8080/satellite/${satellite.SATCAT}`, {method: 'DELETE'})
                                .then(res => res.json())
                                .then(data => setSatlist(data))
                        }}>Delete</button> : <></>}</div>
                    })}
                </div>
            </div>
        )
    } else if (satlist.length === 0) {
        return (
            <div id="sideSearchContainer">
                <input id="sidesearchbar" type="text" placeholder="Search..." onChange={()=>{
                    setSearchTerm(document.getElementById('sidesearchbar').value)
                }}/>
                <div id="filterContainer">
                    No results found.
                </div>
            </div>
        )
    }
}

export default SideSearch
