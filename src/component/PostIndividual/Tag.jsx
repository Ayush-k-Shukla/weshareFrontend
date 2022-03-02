import { flexbox } from '@mui/system';
import React from 'react';

const tag = ({ value }) => {
  return (
    <div
      style={{
        color: '#91b2e0',
        background: 'hsla(0,0%,100%,.07)',
        marginRight: '5px',
        borderRadius: '10px',
        padding: '3px 10px 3px 10px',
      }}
    >
      {value.substring(1)}
    </div>
  );
};

export default tag;
