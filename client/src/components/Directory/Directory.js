import React, { useState, useEffect } from "react";
import "./Directory.css"
import {useNavigate } from "react-router-dom";

const Directory = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const data = await response.json(); 

            if (!response.ok) {
                throw new Error(data.message || 'Cannot fetch users');
            }

            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div id="Directory_page">
            <h1 className="direct_title">User Directory</h1>
            <table id="table">
                <thead>
                    <tr>
                        <th>DoD_id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                        <th>Moderator</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr onClick={()=>{
                            navigate(`/profile/${user.DoD_id}`)
                        }} key={user.DoD_id}>
                            <td>{user.DoD_id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.organization}</td>
                            <td>{user.moderator ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Directory; 