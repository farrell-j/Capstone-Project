import React, { useEffect, useState } from 'react';
import monkey_img from '../../images/Space_Monkey.svg'
import './Fetch_TLE.css'

function Fetch_TLE() {
  const [data, setData] = useState ([])

  const submitSearch = async e => {
    e.preventDefault();
    let inputs = document.getElementById('searchSATCATs').value
    let arrayOfInputs = inputs.split(/\s*,\s*/);

    const PromiseArray = Promise.all(
      arrayOfInputs.map((input) => 
        fetch(`https://tle.ivanstanojevic.me/api/tle/${input}`)
        .then( res => res.json())
      )
    )

    setData(await PromiseArray);
    console.log(data);
    }

  return (

    <body className="fetch_tle_body">

      <img
        id='monkey_img'
        src= {monkey_img}
        alt="monkey_img"
        // className="hover-effect"
      />

      <div className='button'>

        <input type="text" id="searchSATCATs"/> 
        <button id='submit_button' onClick={submitSearch}>Search</button>

      </div>



      <div className="fetch_tle_return">

        <div id='SCC_return'>

        <h2>Twoline Elsets with SCC</h2>

          {data.map((item) => 

            <>

            <p> {item.satelliteId}</p>
            <p> {item.line1}</p>
            <p> {item.line2}</p>

            </>
          )}
        </div>

        <div id='NO_SCC_return'>

        <h2>NO SCC</h2>

          {data.map((item) => 

            <>

            <p>{item.line1}</p>
            <p>{item.line2}</p>

            </>
          )}
        </div>

        <div id='NO_SCC_Line_return'>

        <h2>NO Line Number</h2>

          {data.map((item) => 

            <>

            <p>{item.line1.substring(2)}</p>
            <p>{item.line2.substring(2)}</p>

            </>
          )}
        </div>



      
      </div>
    </body>
  );

}


export default Fetch_TLE;


// #SCC_return {
//   background-color: blue;

// }
// #NO_SCC_return {
//   background-color: blue;
  
// }

{/* <div id='SCC_return'>
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
</div> */}
