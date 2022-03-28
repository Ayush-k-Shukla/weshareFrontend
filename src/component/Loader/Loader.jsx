import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div className='main'>
      <div className='loader'>
        <div style={{ style: '--i:1' }}></div>
        <div style={{ style: '--i:2' }}></div>
        <div style={{ style: '--i:3' }}></div>
        <div style={{ style: '--i:4' }}></div>
      </div>
    </div>
  );
};

export default Loader;
