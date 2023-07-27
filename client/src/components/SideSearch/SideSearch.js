import React, {useEffect, useState} from "react"
import './SideSearch.css'
import styled from 'styled-components'

const SideSearch = () => {
    const [searchTerm, setSearchTerm]  = useState('');
    const [satlist, setSatlist] = useState([]);

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
                        return <ItemContainer>
                            <p>{satellite.SATCAT}</p>
                            <p>{satellite.created_by_id}</p>
                            <p>{satellite.launch_date}</p>
                        </ItemContainer>
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

const ItemContainer = styled.div`
outline-color: #C54B87;
`