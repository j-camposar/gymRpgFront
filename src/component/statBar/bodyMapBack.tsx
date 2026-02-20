import { BodyMapProps } from '@/types/statBar';
import React from 'react';

const BodyMapBack = ({ 
  activeMuscles, 
  highlightColor = '#3b82f6', 
  className = "w-full max-w-[320px]" 
}: BodyMapProps) => {

  const getMuscleStyle = (muscleId: string) => {
    const isActive = activeMuscles.includes(muscleId.toLowerCase());
    return {
      fill: isActive ? highlightColor : '#1f2937',
      // Reduje el blur del shadow porque en móvil consume mucha GPU
      filter: isActive ? `drop-shadow(0 0 6px ${highlightColor})` : 'none',
      transition: 'all 0.3s ease-in-out',
    };
  };

  return (
    /* Quitamos p-8, border-2 y bg pesado para que quepa en la lista */
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 200 450"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* SILUETA BASE (Reducimos stroke para que no se vea tosco en pequeño) */}
        <path
          d="M100 20 C 110 20 125 35 125 50 C 125 65 115 75 100 75 C 85 75 75 65 75 50 C 75 35 90 20 100 20 M75 80 L 125 80 L 145 100 L 160 160 L 145 170 L 135 130 L 135 210 L 125 410 L 105 410 L 100 240 L 95 410 L 75 410 L 65 210 L 65 130 L 55 170 L 40 160 L 55 100 Z"
          fill="#111"
          stroke="#333"
          strokeWidth="1.5" 
        />

        {/* MÚSCULOS */}
        <g id="back-muscles">
          <path style={getMuscleStyle('espalda')} d="M100 80 L 80 95 L 100 110 L 120 95 Z" />
          <path style={getMuscleStyle('espalda')} d="M98 115 L 75 110 Q 65 140 75 190 L 98 170 Z" />
          <path style={getMuscleStyle('espalda')} d="M102 115 L 125 110 Q 135 140 125 190 L 102 170 Z" />
        </g>

        <path id="delts-l" style={getMuscleStyle('hombros')} d="M62 100 Q 55 105 65 130 L 78 135 L 75 100 Z" />
        <path id="delts-r" style={getMuscleStyle('hombros')} d="M138 100 Q 145 105 135 130 L 122 135 L 125 100 Z" />

        <path id="triceps-l" style={getMuscleStyle('brazos')} d="M55 140 L 68 145 L 65 190 L 50 185 Z" />
        <path id="triceps-r" style={getMuscleStyle('brazos')} d="M145 140 L 132 145 L 135 190 L 150 185 Z" />

        <g id="glutes">
          <path style={getMuscleStyle('glúteos')} d="M72 215 Q 85 205 100 215 Q 115 205 128 215 L 125 260 Q 100 275 75 260 Z" />
          <line x1="100" y1="215" x2="100" y2="268" stroke="#080808" strokeWidth="2" />
        </g>

        <path id="ham-l" style={getMuscleStyle('piernas')} d="M72 275 L 96 275 L 92 380 L 72 380 Z" />
        <path id="ham-r" style={getMuscleStyle('piernas')} d="M128 275 L 104 275 L 108 380 L 128 380 Z" />
      </svg>
    </div>
  );
};

export default BodyMapBack;