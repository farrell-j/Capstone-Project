import React from 'react';
import SideSearch from '../SideSearch/SideSearch.js';

const ModeratorPage = ({ userToken }) => {
    const [satlist, setSatlist] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8080/satellites')
        .then((res) => res.json())
        .then(async (data) => {
          for (let satellite of data) {
            let temp = 0;
            let tempArr = [];
            await fetch(`http://localhost:8080/posts/${satellite.SATCAT}`)
              .then((res) => res.json())
              .then((data) => {
                tempArr.push(data);
                for (let t of tempArr[0]) {
                  temp += t.up_votes;
                }
                satellite['up_votes'] = temp;
              });
          }
          setSatlist(data);
        });
    }, []);

    const removeSatellite = async () => {
        try{
            const response = await fetch(`http:localhost:8080/satellites/${satellite.SATCAT}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to remove satellite')
            }
        } catch (error) {
            constole.error('An error occurred removing the satellite:', error)
        }
    }
    if (satlist.length > 0) {
      return(
        <div>
            <SideSearch />
        </div>
      )
    }
}

// const handleRemove = async (satelliteId) => {
//   try {
//     const response = await fetch(`http://localhost:8080/satellites/${satelliteId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to remove satellite');
//     }

//     setSatlist((prevSatlist) => prevSatlist.filter((satellite) => satellite.SATCAT !== satelliteId));
//   } catch (error) {
//     console.error('An error occurred while removing the satellite:', error);
//   }
// };