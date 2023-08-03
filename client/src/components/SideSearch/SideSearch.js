import React, {useEffect, useState} from "react"
import './SideSearch.css'

const SideSearch = () => {
    const [searchTerm, setSearchTerm]  = useState(false);
    const [satlist, setSatlist] = useState([])
    const [displayList, setDisplayList] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/satellites')
            .then(res => res.json())
            .then(data => setSatlist(data))
    }, [])

    useEffect(() => {
        if(satlist.length > 0) {
            if(searchTerm.length > 0) {
                setDisplayList(satlist.filter(satellite => {
                    Object.values(satellite).filter(value => value.includes(searchTerm))
                }))
            } else {
                setDisplayList(satlist)
            }
        }
    }, [searchTerm, satlist])

    if(displayList.length > 0) {
        return (
            <div id="sideSearchContainer">
                <input id="sidesearchbar" type="text" placeholder="Search..." onChange={()=>{
                    setSearchTerm(document.getElementById('sidesearchbar').value)
                }}/>
                <div id="displaySearchContainer">

                </div>
            </div>
        )
    } else {
        return (
            <div id="sideSearchContainer">
                <div id="filterContainer">
testtest
                </div>
            </div>
        )
    }
}

export default SideSearch