import React, { useEffect, useState } from "react";
import { getStat } from "@/services/state.api";
import { StatsMuscle } from "@/types/statBar";
import StatBar from "../statBar/statBar";
import BodyMapFront from "../statBar/bodyMapFront";
import BodyMapBack from "../statBar/bodyMapBack";


const MuscleStats = ({ character_id, refreshTrigger }: { character_id: string, refreshTrigger: boolean }) => {
  const [stats, setStats] = useState<StatsMuscle[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  const POSTERIOR_MUSCLES = ["espalda"];
  
  const fetchData = async () => {
    if (!character_id) return;
    try {
      const data = await getStat({ character_id }) as StatsMuscle[];
      
      setStats([...data.map(item => ({ ...item }))]);
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [character_id, refreshTrigger]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-10 h-full bg-[#050505]">
      <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-500 font-mono text-[10px] tracking-[0.2em] animate-pulse">SCANNING...</p>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full divide-y divide-gray-900 bg-[#050505] overflow-y-auto">
      {stats?.map((musculo, index) => {
        const labelLimpio = musculo.label.toLowerCase().trim();
        const isPosterior = POSTERIOR_MUSCLES.includes(labelLimpio);
        const highlightColor = musculo.fatiga < 50 ? "#3b82f6" : musculo.fatiga < 80 ? "#f1c40f" : "#ef4444";

        return (
          <div key={index} className="flex flex-col p-4 w-full active:bg-blue-600/[0.05] transition-colors">
            
            {/* HEADER COMPACTO: Nombre, Mapa y Nivel en una sola línea */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Mapa Corporal Miniatura */}
                <div className="flex-shrink-0 bg-black/60 p-1.5 rounded-lg border border-gray-800">
                  {isPosterior ? (
                    <BodyMapBack 
                      activeMuscles={[labelLimpio]} 
                      className="w-10 h-auto" 
                      highlightColor={highlightColor} 
                    />
                  ) : (
                    <BodyMapFront 
                      activeMuscles={[labelLimpio]} 
                      className="w-10 h-auto" 
                      highlightColor={highlightColor} 
                    />
                  )}
                </div>
                
                <div>
                  <span className="text-[7px] text-blue-500 font-black tracking-widest uppercase block">Unit_ID</span>
                  <h3 className="text-lg font-black text-white uppercase italic leading-none">
                    {musculo.label}
                  </h3>
                </div>
              </div>

              {/* Nivel Estilo RPG Retro */}
              <div className="flex flex-col items-end">
                <span className="text-[7px] text-gray-500 font-mono font-bold uppercase">Rank</span>
                <span className="text-2xl font-mono font-black text-blue-500 italic leading-none">
                  {musculo.level}
                </span>
              </div>
            </div>

            {/* STATS BARS: Diseño de una sola columna muy limpio */}
            <div className="space-y-2 bg-gray-950/50 p-3 rounded-xl border border-gray-900">
              <StatBar
                label="FTG" 
                value={musculo.fatiga}
                max={100} 
                color={musculo.fatiga < 50 ? "#2ecc71" : musculo.fatiga < 80 ? "#f1c40f" : "#ef4444"}
              />
              <StatBar
                label="EXP"
                value={musculo.xp}
                max={musculo.xpNeeded}
                color="#3b82f6"
              />
              <StatBar
                label="HPT"
                value={musculo.hipertrofia}
                max={100}
                color="#8b5cf6"
              />
            </div>

            {/* Indicador inferior de fatiga (Línea de pulso) */}
            <div className="mt-2 flex items-center gap-2">
              <div className={`h-1 flex-1 rounded-full ${
                musculo.fatiga > 80 ? 'bg-red-600 animate-pulse' : 
                musculo.fatiga > 50 ? 'bg-yellow-500' : 'bg-blue-600/30'
              }`}></div>
              <span className="text-[6px] text-gray-700 font-mono uppercase tracking-[0.2em]">System_Stable</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MuscleStats;