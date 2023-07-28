import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AddSat = ({ userToken }) => {
    const [satcat, setSATCAT] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [inclination, setInclination] = useState('');
    const [raan, setRAAN] = useState('');
    const [eccentricity, setEccentricity] = useState('');
    const [argumentOfPerigee, setArgurmentOfPerigee] = useState('');
    const [meanAnomaly, setMeanAnonmaly] = useState('');
    // const [image, setImage] = useState(null);

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {

        try {
            const response = await fetch('http://localhost:8080/satellites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    "satcat": satcat,
                    "createdBy": createdBy,
                    "launchDate": launchDate,
                    "inclination": inclination,
                    "raan": raan,
                    "eccentricity": eccentricity,
                    "argumentOfPerigee": argumentOfPerigee,
                    "meanAnomaly": meanAnomaly
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
        }



        return (
            <>
            <div className="alert alert-warning alert-dismissible fade show" role="alert"></div>
            <div className="auth-form-container">
                <h2>Add Satellite</h2>
                <form className="Add Satellite Form" onSubmit={handleSubmit}>
                    <label htmlFor="satcat">SATCAT</label>
                    <input value={satcat} onChange={(e) => setSATCAT(e.target.value)} id="satcat" placeholder="SATCAT" />
                    <label htmlFor="createdBy">Created By</label>
                    <input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} id="createdBy" placeholder="DoD Id" />
                    <label htmlFor="launchDate">Launch Date</label>
                    <input value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} id="launchDate" placeholder="YYYY/MM/DD" />
                    <label htmlFor="inclination">Inclination</label>
                    <input value={inclination} onChange={(e) => setInclination(e.target.value)} id="inclination" placeholder="Inclination"  />
                    <label htmlFor="raan">RAAN</label>
                    <input value={raan} onChange={(e) => setRAAN(e.target.value)} id="raan" placeholder="RAAN" />
                    <label htmlFor="eccentricity">Eccentricity</label>
                    <input value={eccentricity} onChange={(e) => setEccentricity(e.target.value)} id="eccentricity" placeholder="Eccentricity"  />
                    <label htmlFor="argumentOfPerigee">Argument of Perigee</label>
                    <input value={argumentOfPerigee} onChange={(e) => setArgurmentOfPerigee(e.target.value)} id="argumentOfPerigee" placeholder="Argument of Perigee"    />
                    <label htmlFor="meanAnomaly">Mean Anomaly</label>
                    <input value={meanAnomaly} onChange={(e) => setMeanAnonmaly(e.target.value)} id="meanAnomaly" placeholder="Mean Anomaly"    />
                    {/* <label htmlFor="image">Upload Image</label>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="file" accept="image/*" id="image" name="image"    /> */}
                    <button type="Submit">Submit</button>
                </form>
            </div>
            </>
        );
    }
    



export default AddSat