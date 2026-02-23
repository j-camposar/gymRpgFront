import { Stats } from '@/types/character';
import React from 'react';



export default function AvatarDashboard({ stats }: { stats: Stats }) {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden font-mono text-cyan-400">
      
      {/* 1. Fondo con efecto de profundidad (Gimnasio desenfocado) */}
      <div className="absolute inset-0 opacity-20 grayscale scale-110 blur-sm bg-[url('/gym-bg.jpg')] bg-cover" />

      {/* 2. El Avatar Central (Tu imagen generada) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Círculo de base neón */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-cyan-500/20 blur-xl rounded-[100%]" />
          <img 
            src="/avatar-render.png" 
            alt="Neural Avatar" 
            className="h-[600px] object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          />
        </div>
      </div>

      {/* 3. Panel Flotante Izquierdo (HUD Holográfico) */}
      <div className="absolute left-10 top-1/4 z-20 w-80 p-6 bg-cyan-950/20 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.1)] skew-y-1">
        <h3 className="text-xs tracking-widest uppercase opacity-60 mb-4">Neural Scan Results</h3>
        
        <div className="space-y-4">
          <StatLine label="BODY FAT" value={`${stats.bodyFat}%`} />
          <StatLine label="MUSCLE MASS" value={`${stats.muscleMass}%`} />
          <StatLine label="EST. WEIGHT" value={`${stats.estWeight} lbs`} />
        </div>

        {/* Círculo de Energía */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center border-4 border-cyan-500/20 rounded-full">
             <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin" />
             <div className="text-center">
               <span className="block text-2xl font-bold">{stats.energy}%</span>
               <span className="text-[10px] opacity-60 uppercase">Energy</span>
             </div>
          </div>
        </div>

        {/* Barra de XP */}
        <div className="mt-8">
          <div className="flex justify-between text-[10px] mb-1 uppercase tracking-tighter">
            <span>XP to Level Up</span>
            <span>{stats.xp} / {stats.nextLevelXp}</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" 
              style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-cyan-500/10 pb-1">
      <span className="text-sm opacity-80 uppercase tracking-tighter">{label}</span>
      <span className="text-sm font-bold text-white tracking-widest">{value}</span>
    </div>
  );
}