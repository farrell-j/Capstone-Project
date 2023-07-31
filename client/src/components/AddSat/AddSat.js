import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { TokenContext } from '../../App';
import './AddSat.css'
import Space_Monkey from '../../images/Space_Monkey_No_Background.svg';

const AddSat = ({userToken, username}) => {
    const [satcat, setSATCAT] = useState('');
    const [createdBy, setCreatedBy] = useState(() => {
        if(username !== undefined){
            return username;
        } else {
            return userToken?.DoD_id || ''; 
        }
    })
    const [launchDate, setLaunchDate] = useState('');
    const [inclination, setInclination] = useState('');
    const [raan, setRAAN] = useState('');
    const [eccentricity, setEccentricity] = useState('');
    const [argumentOfPerigee, setArgumentOfPerigee] = useState('');
    const [meanAnomaly, setMeanAnomaly] = useState('');
    const [image, setImage] = useState('');
    const {token} = useContext(TokenContext)

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {

        try {
            const response = await fetch('http://localhost:8080/satellite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    "SATCAT": satcat,
                    "created_by_id": createdBy,
                    "launch_date": launchDate,
                    "inclination": inclination,
                    "raan": raan,
                    "eccentricity": eccentricity,
                    "argument_of_perigee": argumentOfPerigee,
                    "mean_anomaly": meanAnomaly,
                    "image": image
                }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Satellite added:', data);
                    const { DoD_id } = data;
                    navigate(`/homepage/${DoD_id}`)
                }
            } catch (error) {
                console.log('Error:', error)
            }
        };



        return (
            <>
            <div className="alert alert-warning alert-dismissible fade show" role="alert"></div>
            <div className="auth-form-container"> 
                <h2 className='AddSatTitle'>Add Satellite</h2>
                <form className="AddSatForm" onSubmit={handleSubmit}>
                    <label htmlFor="satcat">SATCAT</label>
                    <input className='SCinput'value={satcat} onChange={(e) => setSATCAT(e.target.value)} id="satcat" name="satcat" placeholder="SATCAT" />
                    <label htmlFor="createdBy">Created By</label>
                    <input className='CBinput' value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} id="createdBy" name="createdBy" placeholder={token.DoD_id} />
                    <label htmlFor="launchDate">Launch Date</label>
                    <input className='LDinput' value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} id="launchDate" name="launchDate" placeholder="YYYY/MM/DD" />
                    <label htmlFor="inclination">Inclination</label>
                    <input className='INCinput' value={inclination} onChange={(e) => setInclination(e.target.value)} id="inclination" name="inclination" placeholder="Inclination"  />
                    <label htmlFor="raan">RAAN</label>
                    <input className='RAANinput' value={raan} onChange={(e) => setRAAN(e.target.value)} id="raan" name="raan" placeholder="RAAN" />
                    <label htmlFor="eccentricity">Eccentricity</label>
                    <input className='ECCinput' value={eccentricity} onChange={(e) => setEccentricity(e.target.value)} id="eccentricity" name="eccentricity" placeholder="Eccentricity"  />
                    <label htmlFor="meanAnomaly">Mean Anomaly</label>
                    <input className='MAinput' value={meanAnomaly} onChange={(e) => setMeanAnomaly(e.target.value)} id="meanAnomaly" name="meanAnomaly" placeholder="Mean Anomaly"    />
                    <label htmlFor="image">Image URL</label>
                    <input className='IMinput' value={image} onChange={(e) => setImage(e.target.value)} type="text" id="image" name="image" placeholder='https://example.com/image.jpg'   /> 
                    <button className='satsubmitbutton' type="Submit">Submit</button>
                </form>
            </div>
            </>
        );
    }
    



export default AddSat