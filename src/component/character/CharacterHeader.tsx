// component/character/CharacterHeader.tsx

import {  EstadoCharacter } from "@/types/statBar";
import StatBar from "../statBar/statBar";

export default function CharacterHeader({ perfil }: { perfil: EstadoCharacter | null }) {
    if (!perfil) return <div className="p-4 animate-pulse bg-gray-900 h-24 rounded-lg">Cargando enlace neural...</div>;

    return (
      <div className="p-6 border-b border-blue-900/30 bg-gradient-to-b from-blue-950/20 to-transparent">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
              {perfil.nick}
            </h1>
            <span className="text-[15px] text-blue-400 font-mono tracking-[0.3em]">
              RANK: {perfil.level}
            </span>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/50 px-3 py-1 rounded-md flex items-center gap-2">
            <span className="text-yellow-500 text-xs font-bold">COINS:</span>
            <span className="text-white font-mono">{perfil.coins}</span>
          </div>
        </div>

        {/* Barra de XP General */}
        <div className="space-y-1">
         <div className="space-y-2 bg-gray-950/50 p-3 rounded-xl border border-gray-900">
              <StatBar
                label="FTG" 
                value={perfil.fatiga}
                max={100} 
                color={perfil.fatiga < 50 ? "#2ecc71" : perfil.fatiga < 80 ? "#f1c40f" : "#ef4444"}
              />
              <StatBar
                label="EXP"
                value={perfil.xp}
                max={perfil.xpNeeded}
                color="#3b82f6"
              />
              <StatBar
                label="HPT"
                value={perfil.hipertrofia}
                max={100}
                color="#8b5cf6"
              />
            </div>
      </div>
      </div>
    );
}