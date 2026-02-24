'use client';
import { Log } from '@/types/training';
import { useState } from 'react';

export default function RecentSeriesLogs({ logs }: { logs: Log[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Tomamos los últimos 4 para la vista colapsada
  const displayLogs = isExpanded ? logs : logs.slice(0, 4);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-blue-500/30 transition-all duration-500 ease-in-out z-30 ${
        isExpanded ? 'h-[70vh]' : 'h-45'
      }`}
    >
      {/* Tirador para expandir */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-6 flex items-center justify-center hover:bg-blue-500/10 transition-colors"
      >
        <div className="w-12 h-1 bg-gray-700 rounded-full relative">
          <div className={`absolute inset-0 bg-blue-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div className="px-6 pb-6 h-full overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
            {isExpanded ? 'Registro Completo de Incursión' : 'Últimas Series'}
          </h3>
          {isExpanded && (
             <span className="text-[10px] text-gray-500 font-mono">Total Series: {logs.length}</span>
          )}
        </div>
       
        <div className={`grid gap-2 overflow-y-auto custom-scrollbar pb-10 ${isExpanded ? 'flex-1' : 'grid-cols-2 md:grid-cols-4'}`}>
          {displayLogs.length > 0 ? (
            displayLogs.map((log) => (
              <div 
                key={log._id} 
                className="bg-blue-900/10 border border-gray-800 p-3 rounded-lg flex flex-col justify-center animate-in slide-in-from-bottom-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-gray-400 truncate uppercase">{log.exerciseName || 'Ejercicio'}</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black text-white">{log.weight}</span>
                  <span className="text-[10px] text-gray-500 uppercase">kg</span>
                  <span className="mx-1 text-blue-600">×</span>
                  <span className="text-xl font-black text-white">{log.reps}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    {/* Contenedor de datos con gap reducido y wrap para móviles */}
                    <div className="flex flex-wrap gap-x-2 gap-y-1"> 
                        {/* Esfuerzo */}
                        <div className="flex gap-1 items-center bg-white/5 px-1.5 py-0.5 rounded">
                            <span className="text-[8px] text-gray-500 uppercase font-bold">RPE:</span>
                            <span className={`text-[10px] font-black font-mono ${log.difficulty > 8 ? 'text-red-500' : 'text-green-400'}`}>
                                {log.difficulty}
                            </span>
                        </div>

                        {/* Calorías */}
                        <div className="flex gap-1 items-center bg-white/5 px-1.5 py-0.5 rounded">
                            <span className="text-[8px] text-gray-500 uppercase font-bold">KCAL:</span>
                            <span className="text-[10px] font-black text-orange-400 font-mono">
                                {log.calories}
                            </span>
                        </div>
                    </div>

                    {/* XP - Le damos un toque de badge para que resalte */}
                    <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30 font-bold italic">
                        +{Math.round(log.totalXp)} XP
                    </span>
                </div>  
              </div>
              
            ))
          ) : (
            <div className="col-span-full text-center py-2 text-gray-600 text-xs italic uppercase tracking-widest">
              Esperando primer registro de combate...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}