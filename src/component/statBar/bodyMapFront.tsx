import { BodyMapProps } from '@/types/statBar';
import React from 'react';

const BodyMapFront = ({ 
  activeMuscles, 
  highlightColor = '#3b82f6', 
  className = "w-72" 
}: BodyMapProps) => {

 const getMuscleStyle = (muscleId: string) => {
    const isActive = activeMuscles.includes(muscleId.toLowerCase());
    return {
      fill: isActive ? highlightColor : '#1f2937',
      // Sombra más sutil para no "empastar" el dibujo en pantallas pequeñas
      filter: isActive ? `drop-shadow(0 0 5px ${highlightColor})` : 'none',
      transition: 'all 0.3s ease-in-out',
    };
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 200 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* SILUETA BASE HUMANA - Líneas más finas */}
        <path
          d="M100 20 C 110 20 120 30 120 45 C 120 60 115 70 100 70 C 85 70 80 60 80 45 C 80 30 90 20 100 20 M80 75 L 120 75 L 135 90 L 150 150 L 140 160 L 130 120 L 130 200 L 120 380 L 105 380 L 100 220 L 95 380 L 80 380 L 70 200 L 70 120 L 60 160 L 50 150 L 65 90 Z"
          fill="#111"
          stroke="#333"
          strokeWidth="1.2"
        />

        {/* PECHO */}
        <g id="chest">
          <path style={getMuscleStyle('pecho')} d="M100 90 Q 80 90 75 115 L 100 130 Z" />
          <path style={getMuscleStyle('pecho')} d="M100 90 Q 120 90 125 115 L 100 130 Z" />
        </g>

        {/* HOMBROS */}
        <path id="shoulder-l" style={getMuscleStyle('hombros')} d="M68 95 Q 60 90 72 110 L 80 120 L 80 95 Z" />
        <path id="shoulder-r" style={getMuscleStyle('hombros')} d="M132 95 Q 140 90 128 110 L 120 120 L 120 95 Z" />

        {/* BRAZOS */}
        <path id="arm-l" style={getMuscleStyle('brazos')} d="M65 125 L 75 125 L 75 160 L 60 160 Z" />
        <path id="arm-r" style={getMuscleStyle('brazos')} d="M135 125 L 125 125 L 125 160 L 140 160 Z" />

        {/* ABDOMINALES / CORE */}
        <g id="core">
          <rect style={getMuscleStyle('core')} x="88" y="140" width="24" height="12" rx="2" />
          <rect style={getMuscleStyle('core')} x="88" y="155" width="24" height="12" rx="2" />
          <rect style={getMuscleStyle('core')} x="88" y="170" width="24" height="40" rx="4" />
        </g>

        {/* PIERNAS */}
        <path id="leg-l" style={getMuscleStyle('piernas')} d="M78 220 L 98 220 L 94 320 L 74 320 Z" />
        <path id="leg-r" style={getMuscleStyle('piernas')} d="M122 220 L 102 220 L 106 320 L 126 320 Z" />
      </svg>
    </div>
  );
};

export default BodyMapFront;