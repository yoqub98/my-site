import React from 'react';
import './Ripple.css';

const Ripple = ({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
}) => {
  return (
    <div className="ripple-container">
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 80;
        const opacity = Math.max(0.1, mainCircleOpacity - i * 0.03);
        const animationDelay = `${i * 0.3}s`;  // Stagger each circle's animation

        return (
          <div
            key={i}
            className="ripple-circle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,  // Each circle starts animating at different time
            }}
          />
        );
      })}
    </div>
  );
};

export default Ripple;
