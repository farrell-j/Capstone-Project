import React from 'react';
import banana_img_3 from '../../images/banana_img_3.svg';
import './GO_BANANAS.css'
import { Tooltip } from 'react-tooltip';

const GoBananas = ({ showClearButton, onGoBananasClick, onClearBananasClick }) => {
  const handleClick = () => {
    if (showClearButton) {
      onClearBananasClick();
    } else {
      onGoBananasClick();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className = 'banana_img_3_container'>
      <img
        data-tooltip-id="tletip"
        data-tooltip-content="GO BANANAS!"
        id='banana_img_3'
        src={banana_img_3}
        alt={showClearButton ? 'Clear Bananas' : 'GO BANANAS!'}
        onClick={handleClick}
        className="pointer-on-hover"
      />
      <Tooltip id="tletip" place="bottom"/>
      </div>
    </div>
  );
};

export default GoBananas;