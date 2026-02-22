'use client';

import { getMisionesActivas, reclamarMision } from '@/services/mision.api';
import { Mission } from '@/types/mision';
import { useEffect, useState } from 'react';
import StatBar from '../statBar/statBar';

export default function MissionList({ 
  character_id, 
  refreshTrigger 
}: { 
  character_id: string; 
  refreshTrigger: boolean 
}) {
  const [misiones, setMisiones] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMisiones = async () => {
      try {
        const data = await getMisionesActivas(character_id);
        setMisiones(data);
      } catch (error) {
        console.error("Error cargando misiones:", error);
      } finally {
        setLoading(false);
      }
    };
    if (character_id) fetchMisiones();
  }, [character_id, refreshTrigger]);

  const handleClaim = async (misionId: string) => {
    try {
      await reclamarMision(misionId, character_id);
      setMisiones(prev => prev.map(m => m.id === misionId ? { ...m, claimed: true } : m));
    } catch (error) {
      alert("Error al reclamar recompensa");
    }
  };

  if (loading) return <div className="text-[10px] text-gray-500 animate-pulse font-mono uppercase">Sincronizando misiones...</div>;

  return (
    <div className="space-y-8 p-2">
      {misiones.length === 0 && (
        <p className="text-[10px] text-gray-600 italic uppercase tracking-widest text-center py-10 border border-dashed border-gray-800 rounded-xl">
          // No hay protocolos activos //
        </p>
      )}

      {misiones.map((mision) => (
        <div key={mision.id} className="relative group">
          {/* Header de la Misión */}
          <div className="flex justify-between items-start mb-2">
            <div className="max-w-[70%]">
              <h4 className="text-[11px] font-black uppercase tracking-tighter text-gray-100 group-hover:text-yellow-500 transition-colors">
                {mision.name}
              </h4>
              <p className="text-[9px] text-gray-500 leading-tight uppercase font-medium">
                {mision.description}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-yellow-500 font-black bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                +{mision.rewardCoins}C
              </span>
            </div>
          </div>

          {/* Reutilización de tu StatBar con lógica de incremento */}
          <StatBar 
            label="Progreso Misión" 
            value={mision.progress} 
            max={mision.targetXp || 100} 
            color="#eab308" // Amarillo para misiones
          />

          {/* Acción de Reclamo o Estado Finalizado */}
          <div className="mt-2">
            {mision.completed && !mision.claimed && (
              <button 
                onClick={() => handleClaim(mision.id)}
                className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black text-[10px] font-black uppercase rounded-lg shadow-[0_0_20px_rgba(202,138,4,0.3)] active:scale-95 transition-all animate-pulse"
              >
                📥 RECLAMAR RECOMPENSA_
              </button>
            )}

            {mision.claimed && (
              <div className="flex items-center gap-2 text-[9px] text-green-500 font-mono font-bold uppercase tracking-[0.2em] bg-green-500/5 p-2 rounded-md border border-green-500/20">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Protocolo_Finalizado
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}