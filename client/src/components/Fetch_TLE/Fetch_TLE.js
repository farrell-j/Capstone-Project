import React, { useEffect, useState } from 'react';
import './Fetch_TLE.css'

function Fetch_TLE( props ) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/proxy-tle/${props.SATCAT}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="fetch">
      <p>TEST</p>
    </div>
  );
}

export default Fetch_TLE;
