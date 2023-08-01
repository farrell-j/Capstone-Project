import React, { useEffect, useState } from 'react';

const ModeratorPage = ({ userToken }) => {
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    fetchUserAccounts(userToken)
      .then((data) => {
        setUserAccounts(data);
      })
      .catch((error) => {
        console.error('Error fetching user accounts:', error);
      });
  }, [userToken]);

  const fetchUserAccounts = async (token) => {
    try {
      const userData = await fetch('http:localhost:8080/users')
      return userData;
    } catch (error) {
      throw new Error('Error fetching user accounts')
    }
  }


  
}