//Monkey is Bouncing
// import React, { useState, useEffect, useRef } from 'react';
// import './Dancing.css';
// import monkey_no_background_img from '../../images/Space_Monkey_No_Background.svg';

// const Dancing = () => {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [xDirection, setXDirection] = useState(1);
//   const [yDirection, setYDirection] = useState(1);

//   const imageRef = useRef(null);
//   const containerRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   useEffect(() => {
//     const animate = () => {
//       const containerWidth = containerRef.current.clientWidth;
//       const containerHeight = containerRef.current.clientHeight;
//       const monkeyWidth = imageRef.current.width;
//       const monkeyHeight = imageRef.current.height;
//       const speed = 2; // Adjust the speed for smoother motion

//       console.log('x:', x);
//       console.log('y:', y);
//       console.log('xDirection:', xDirection);
//       console.log('yDirection:', yDirection);

//       setX((prevX) => {
//         const nextX = prevX + xDirection * speed;
//         if (nextX >= containerWidth - monkeyWidth || nextX <= 0) {
//           setXDirection((prevDirection) => prevDirection * -1);
//         }
//         return nextX;
//       });

//       setY((prevY) => {
//         const nextY = prevY + yDirection * speed;
//         if (nextY >= containerHeight - monkeyHeight || nextY <= 0) {
//           setYDirection((prevDirection) => prevDirection * -1);
//         }
//         return nextY;
//       });

//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     // Start the animation loop on mount
//     animationFrameRef.current = requestAnimationFrame(animate);

//     // Clean up the animation frame when unmount
//     return () => cancelAnimationFrame(animationFrameRef.current);
//   }, [x, y, xDirection, yDirection]);

//   return (
//     <div className='page_body'>
//       <div className='dancing_monkey_container' ref={containerRef}>
//         <img
//           ref={imageRef}
//           src={monkey_no_background_img}
//           alt='dancing_monkey'
//           id='dancing_monkey_img'
//           style={{ transform: `translate(${x}px, ${y}px)` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dancing;





























// ok, now the monkeytravels to the bottom of the container...then, he moves to the right util he exists the container and disappears...please fix that so that the monkey bounces around the container.

// import React, { useState, useEffect, useRef } from 'react';
// import './Dancing.css';
// import monkey_no_background_img from '../images/Space_Monkey_No_Background.png';

// const Dancing = () => {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [xDirection, setXDirection] = useState(1);
//   const [yDirection, setYDirection] = useState(1);

//   const imageRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const animate = () => {
//       const containerWidth = containerRef.current.clientWidth;
//       const containerHeight = containerRef.current.clientHeight;
//       const monkeyWidth = imageRef.current.width;
//       const monkeyHeight = imageRef.current.height;
//       const speed = 1.5; // Adjust the speed for smoother motion

//       setX((prevX) => {
//         const nextX = prevX + xDirection * speed;
//         if (nextX >= containerWidth - monkeyWidth || nextX <= 0) {
//           setXDirection((prevDirection) => prevDirection * -1);
//         }
//         return nextX;
//       });

//       setY((prevY) => {
//         const nextY = prevY + yDirection * speed;
//         if (nextY >= containerHeight - monkeyHeight || nextY <= 0) {
//           setYDirection((prevDirection) => prevDirection * -1);
//         }
//         return nextY;
//       });

//       requestAnimationFrame(animate);
//     };

//     // Start the animation loop when the component mounts
//     const animationFrame = requestAnimationFrame(animate);

//     // Clean up the animation frame when the component unmounts
//     return () => cancelAnimationFrame(animationFrame);
//   }, [xDirection, yDirection]);

//   return (
//     <div className='page_body'>
//       <div className='dancing_monkey_container' ref={containerRef}>
//         <img
//           ref={imageRef}
//           src={monkey_no_background_img}
//           alt='dancing_monkey'
//           id='dancing_monkey_img'
//           style={{ transform: `translate(${x}px, ${y}px)` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dancing;











































// One direction animation
// import React, { useEffect, useState, useRef } from 'react';
// import './Dancing.css';
// import monkey_no_background_img from '../images/Space_Monkey_No_Background.png';

// const Dancing = () => {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [xDirection, setXDirection] = useState(1);
//   const [yDirection, setYDirection] = useState(1);

//   const imageRef = useRef(null);

//   const containerRef = useRef(null); // Reference to the container element

//   const animate = () => {
//     const containerWidth = containerRef.current.clientWidth;
//     const containerHeight = containerRef.current.clientHeight;
//     const monkeyWidth = imageRef.current.width;
//     const monkeyHeight = imageRef.current.height;
//     const speed = 1.5; // Adjust the speed for smoother motion
//     const damping = 0.8; // Adjust the damping for smoother bouncing
  
//     setX((prevX) => {
//       let nextX = prevX + xDirection * speed;
//       if (nextX >= containerWidth - monkeyWidth || nextX <= 0) {
//         setXDirection((prevDirection) => prevDirection * -1 * damping);
//         nextX = prevX + xDirection * speed * damping;
//       }
//       return Math.max(0, Math.min(nextX, containerWidth - monkeyWidth));
//     });
  
//     setY((prevY) => {
//       let nextY = prevY + yDirection * speed;
//       if (nextY >= containerHeight - monkeyHeight || nextY <= 0) {
//         setYDirection((prevDirection) => prevDirection * -1 * damping);
//         nextY = prevY + yDirection * speed * damping;
//       }
//       return Math.max(0, Math.min(nextY, containerHeight - monkeyHeight));
//     });
    
//     requestAnimationFrame(animate);
//   };

//   // Start the animation loop when the component mounts
//   useEffect(() => {
//     requestAnimationFrame(animate);
//   }, []);

//   return (
//     <div className='page_body'>
//       <div className='dancing_monkey_container' ref={containerRef}>
//         <img
//           ref={imageRef}
//           src={monkey_no_background_img}
//           alt='dancing_monkey'
//           id='dancing_monkey_img'
//           style={{ transform: `translate(${x}px, ${y}px)` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dancing;
