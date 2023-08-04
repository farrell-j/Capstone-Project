import React from 'react';
import final_slide_img from '../../images/final_slide.svg';
import './Presentation.css'
import { Tooltip } from 'react-tooltip';

const Presentation = () => {

    return (

        <div id='pres'>

            <img
            data-tooltip-id="tletip"
            data-tooltip-content="...is bright"
            id='final_slide'
            src={final_slide_img}
            />
            <Tooltip id="tletip" place="bottom"/>
        </div>

    )
}

export default Presentation; 