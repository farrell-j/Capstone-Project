// import React from 'react'; 
// import { useEffect, useState } from 'react';
// import { useRef } from 'react';
// import './Dancing.css';
// import monkey_no_background_img from '../../images/Space_Monkey_No_Background.svg';

// const Dancing = () => {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [xDirection_Hor, setXDirection] = useState(1);
//   const [yDirection_Ver, setYDirection] = useState(1);

//   const imageRef = useRef(null);

//   const animate = () => {
//     const containerWidth = window.innerWidth;
//     const containerHeight = window.innerHeight;
//     const monkeyWidth = imageRef.current.width;
//     const monkeyHeight = imageRef.current.height;
//     const speed = 4;
  
//     setX((prevX) => {
//         const nextX = prevX + xDirection_Hor * speed;
//         return Math.max(0, Math.min(nextX, containerWidth - monkeyWidth));
//     });
    
//     setY((prevY) => {
//         const nextY = prevY + yDirection_Ver * speed;
//         return Math.max(0, Math.min(nextY, containerHeight - monkeyHeight));
//     });
    
//     if (x >= containerWidth - monkeyWidth || x <= 0) {
//         setXDirection((prevDirection) => prevDirection * -1);
//     }
    
//     if (y >= containerHeight - monkeyHeight || y <= 0) {
//         setYDirection((prevDirection) => prevDirection * -1);
//     }
//   };

//   useEffect(() => {
//     const animationFrameId = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrameId);
//   });
    

//     return (


//         <div 
//             className='dancing_monkey_container' 
//             style={{ transform: `translate(${x}px, ${y}px)` }}
//         >

//         <img 
//         ref= { imageRef }
//         src={ monkey_no_background_img }
//         alt='dancing_monkey'
//         id='dancing_monkey_img'
//         />

//         </div>

//     );
// };


// export default Dancing