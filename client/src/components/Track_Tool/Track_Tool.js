import React, { useEffect, useState } from 'react';
import './Track_Tool.css'
import monkey_img from '../../images/Space_Monkey.svg'
// import SCC_Search from './SCC_Search'

const Track_Tool = () => {
  const [data, setData] = useState([]);
  const [satelliteIds, setSatelliteIds] = useState('');

  const fetchTLEs = async () => {
    try {
      let idsArray = satelliteIds.split(',').map((id) => id.trim());
      if (idsArray.length === 1 && idsArray[0] === '') {
        // If the input is empty, do nothing
        return; 
      }
  
      const response = await fetch(`http://localhost:8080/proxy-tle?ids=${idsArray.join(',')}`);
      const data = await response.json();
      console.log('Response:', response);
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(data);

  const handleSearch = () => {
    fetchTLEs();
  };

  return (
    <div className="track_tool_body">

    {/* <img
        id='monkey_img'
        src= {monkey_img}
        alt="monkey_img"
        // className="hover-effect"
    /> */}

    <div className='seach_box'>

      <input type="text" value={satelliteIds} onChange={(e) => setSatelliteIds(e.target.value)} /> <button onClick={handleSearch}>Search SCC</button>
      
    </div>

        {/* <SCC_Search /> */}

      {data.length > 0 && (
        <div className="Track_Tool_return">

            <div id='SCC_return'>
                <h2>Twoline Elsets with SCC</h2>
                <ul>
                {data.map((response, index) => (
                    <li key={index}>
                    <p> {response.satelliteId}</p>
                    <p> {response.line1}</p>
                    <p> {response.line2}</p>
                    </li>
                ))}
                </ul>
            </div>

            <div id='NO_SCC_return'>
                <h2>Without</h2>
                <ul>
                {data.map((response, index) => (
                    <li key={index}>
                    <p> {response.line1}</p>
                    <p> {response.line2}</p>
                 </li>
                ))}
                </ul>
            </div>
    </div>
      )}
    </div>
  );
}

export default Track_Tool;













{/* //OLD IDEAS

// import React, { useEffect, useState } from 'react';

// function Track_Tool() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/proxy-tle?id=57166');
//         console.log('Response:', response);
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(data);

//   return (
//     <div className="fetch">
//       <p>Testing</p>
//       <div className="ss_cover_container">    
//         <img id="img" src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg" alt="Sword_Slinger_Cover" className="hover-effect" />
//       </div>
//     </div>
//   );
// }

// export default Track_Tool; */}
















































