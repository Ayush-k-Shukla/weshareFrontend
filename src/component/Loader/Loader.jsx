import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div className='main'>
      <div className='loader'>
        <div style={{ animationDelay: '-0.3s' }}></div>
        <div style={{ animationDelay: '-0.6s' }}></div>
        <div style={{ animationDelay: '-0.9s' }}></div>
        <div style={{ animationDelay: '-0.12s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
