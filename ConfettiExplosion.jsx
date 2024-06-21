import React, { useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const ConfettiExplosionComponent = ({ explode }) => {
    const [explode, setExplode] = useState(false);
   useEffect(() => {
    if (explode) {
      // Trigger the confetti explosion when explode prop is true
      setTimeout(() => setExplode(false), 3000); // Turn off confetti explosion after 3 seconds
    }
  }, [explode]);

  return (
    <div>
      {explode && <ConfettiExplosion />} {/* Render ConfettiExplosion when explode prop is true */}
    </div>
  );
};

export default ConfettiExplosionComponent;
