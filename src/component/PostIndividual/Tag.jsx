import React from 'react';

const tag = ({ value }) => {
  return (
    <div
      style={{
        minWidth: '30px',
        color: '#682e27',
        background: '#e5c558',
        marginRight: '5px',
        borderRadius: '10px',
        padding: '3px 10px 3px 10px',
        textAlign: 'center',
      }}
    >
      {value}
    </div>
  );
};

export default tag;
