import React, { useEffect, useState } from "react";
import { getStat } from "@/services/state.api";
import { StatsMuscle } from "@/types/statBar";
import StatBar from "../statBar/statBar";
import BodyMapFront from "../statBar/bodyMapFront";
import BodyMapBack from "../statBar/bodyMapBack";

const MuscleStats = ({ character_id, refreshTrigger }: { character_id: string, refreshTrigger: boolean }) => {
  const [stats, setStats] = useState<StatsMuscle[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Lista expandida para cubrir toda la cadena posterior
  const POSTERIOR_MUSCLES = ["espalda"];
  
  const fetchData = async () => {
    if (!character_id) return;
    setLoading(true);
    try {
      const data = await getStat({ character_id }) as StatsMuscle[];
      setStats(data);
    } catch (error) {
      console.error("Error al obtener stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [character_id, refreshTrigger]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-500 font-mono text-sm tracking-[0.3em] animate-pulse">BIO_SCANNING...</p>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full divide-y divide-gray-800/80 overflow-y-auto custom-scrollbar bg-[#050505]">
      {stats?.map((musculo, index) => {
        // La lógica debe ir aquí, antes del return del map
        const labelLimpio = musculo.label.toLowerCase().trim();
        const isPosterior = POSTERIOR_MUSCLES.includes(labelLimpio);
        const highlightColor = musculo.fatiga < 50 ? "#3b82f6" : musculo.fatiga < 80 ? "#f1c40f" : "#ef4444";
        return (
          <div 
            key={index} 
            className="flex flex-col p-6 w-full hover:bg-blue-600/[0.03] transition-all group border-l-4 border-transparent hover:border-blue-500"
          >
            {/* HEADER PRINCIPAL */}
            <div className="flex justify-between items-end mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-500 font-black tracking-[0.3em] uppercase mb-1">Muscle_Group</span>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter transition-colors group-hover:text-blue-400">
                  {musculo.label}
                </h3>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-gray-600 font-mono font-bold uppercase">Rank_Status</span>
                <span className="text-4xl font-mono font-black text-blue-500 italic leading-none drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  {musculo.level}
                </span>
              </div>
            </div>

            {/* CUERPO DE LA TARJETA */}
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 bg-black/40 p-6 rounded-3xl border border-gray-800 shadow-2xl group-hover:border-blue-500/50 transition-all duration-500 hover:scale-110">
                {/* Lógica de selección de vista corregida */}
                {isPosterior ? (
                  <BodyMapBack 
                    activeMuscles={[labelLimpio]} 
                    className="w-32 h-auto" 
                    highlightColor={highlightColor} 
                  />
                ) : (
                  <BodyMapFront 
                    activeMuscles={[labelLimpio]} 
                    className="w-32 h-auto" 
                    highlightColor={highlightColor} 
                  />
                )}
                
                <div className="mt-4 flex flex-col items-center gap-1">
                  <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${
                    musculo.fatiga > 80 ? 'bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]' : 
                    musculo.fatiga > 50 ? 'bg-yellow-500' : 'bg-blue-600'
                  }`}></div>
                  <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest mt-1">Scanner_Active</span>
                </div>
              </div>

              {/* CONTENIDO DE STATS */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <StatBar
                    label="Fatiga (FTG)" 
                    value={musculo.fatiga}
                    max={100} 
                    color={musculo.fatiga < 50 ? "#2ecc71" : musculo.fatiga < 80 ? "#f1c40f" : "#ef4444"}
                  />
                  <StatBar
                    label="Progreso (EXP)"
                    value={musculo.xp}
                    max={musculo.xpNeeded}
                    color="#3b82f6"
                  />
                  <StatBar
                    label="Hipertrofia (HPT)"
                    value={musculo.hipertrofia}
                    max={100}
                    color="#8b5cf6"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gray-800"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MuscleStats;