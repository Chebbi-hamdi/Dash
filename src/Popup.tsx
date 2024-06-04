import React from 'react';

interface PopupProps {
  comment: string;
  position: { x: number; y: number
  height: number;
width: number };
}

const Popup: React.FC<PopupProps> = ({ comment, position }) => {
  console.log('position', position);
  console.log('comment', comment);
  return (
    <div
      style={{
      
        position: 'absolute',
        top: `${position?.y}px`,
        left: `${position?.x}px`,
        padding: '10px',
        border: '3px solid blue',
        height :`${position?.height}px`,
        width :`${position?.width}px`,
        zIndex: 1000,
      }}
    >
      <p style={{
        textAlign: 'center',
        fontSize: '1.5em',
        color: 'blue',
        
      }}>{comment}</p>
    </div>
  );
};

export default Popup;
