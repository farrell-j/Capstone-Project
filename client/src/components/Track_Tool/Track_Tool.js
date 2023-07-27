import React, { useEffect, useState } from 'react';

function Track_Tool() {
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
    <div className="fetch">
      <input type="text" value={satelliteIds} onChange={(e) => setSatelliteIds(e.target.value)} />
      <button onClick={handleSearch}>Search SCC</button>
      <p>Testing</p>
      <img
        id="img"
        src="https://static.displate.com/280x392/displate/2023-01-05/7a928c1eedccc3617b8ca1b9b6f08799_c42bacf826d9d27b6e3dd93afbe2aaec.jpg"
        alt="cat"
        className="hover-effect"
      />

      {/* DISPLAY 2 LINE: */}
      {data.length > 0 && (
        <div>
          <h2>TwoLine Elsets</h2>
          <ul>
            {data.map((response, index) => (
              <li key={index}>
                <p> {response.satelliteId} </p>
                <p> {response.line1} </p>
                <p> {response.line2} </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Track_Tool;


//OLD IDEAS

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

// export default Track_Tool;






