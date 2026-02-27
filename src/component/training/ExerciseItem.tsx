'use client';
import { useSelector } from "react-redux";
import { useState } from "react";
import { HistoryExercise,HistorySeries} from '@/types/training'
import {getEjercicios} from '@/services/trainin.api';
import { RootState } from '@/store/store';
// Componente para cada ejercicio dentro de la sesión
const ExerciseItem = ({ ex , trainingId}: { ex: HistoryExercise , trainingId:string }) => {
    const [isExOpen, setIsExOpen] = useState(false);
    const [series, setSeries] =  useState<HistorySeries[]>([]);

    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    
    const fetchHistoryData = async (ex:HistoryExercise) => {
        const  exercise = await getEjercicios(trainingId, ex.id, character_id) as HistorySeries[]; 
        setSeries(exercise);
    }
    return (
        <div className="border-b border-gray-900 last:border-0 pb-2">
            <div 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExOpen(!isExOpen);
                    if (!isExOpen ) {
                        fetchHistoryData(ex);
                    }
                }}
                className="flex justify-between items-start text-xs cursor-pointer py-2"
            >
                <div className="flex-1">
                    <p className={`font-bold transition-all flex items-center ${isExOpen ? 'text-blue-400' : 'text-gray-200'}`}>
                        <span className="mr-2 text-[10px]">{isExOpen ? '▼' : '▶'}</span>
                        {ex.nombre}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono mt-1 tracking-tighter">
                        {ex.seriesCount} SERIES REGISTRADAS
                    </p>
                </div>

                {/* COL 3: Carga Máxima */}
                <div className="flex-1 text-right">
                    <div className="inline-block bg-blue-500/5 border border-blue-500/20 rounded px-2 py-1">
                        <p className="text-[9px] text-blue-400/60 uppercase font-mono leading-none mb-1">1RM Estimado</p>
                        <p className="text-[14px] font-black text-blue-300 font-mono leading-none">
                            {Number(ex.estimate1RM).toFixed(1)}<span className="text-[10px] ml-0.5">kg</span>
                        </p>
                    </div>
                    <div className="inline-block bg-blue-500/5 border border-blue-500/20 rounded px-2 py-1">
                        <span className="text-[9px] text-gray-600 block uppercase font-mono leading-none mb-1">Carga Max</span>
                        <span className="text-[14px] font-mono text-white font-bold tracking-tight">
                            {ex.cargaMax}<span className="text-[10px] text-gray-500 ml-0.5">kg</span>
                        </span>
                    </div>

                </div>
            </div>

            {/* --- DETALLE DE SERIES CON COMPARATIVA --- */}
            {isExOpen && (
                <div className="mt-2 ml-2 space-y-1 border-l-2 border-blue-600/30 pl-3 animate-in slide-in-from-left-2">
                    <div className="grid grid-cols-4 text-[9px] text-gray-600 uppercase font-black mb-2 tracking-widest">
                        <span>Set</span>
                        <span>Peso</span>
                        <span>Reps</span>
                        <span className="text-right">Progreso</span>
                    </div>
                    
                    {series.map((set: HistorySeries, sIdx: number) => {
                        // Lógica de comparación con la serie anterior
                        const isUp = set.progreso=="SUBISTE"?true:false;
                        const isEqual = set.progreso=="ESTABLE"?true:false;
                        const isInicial= set.progreso=="INICIAL"?true:false;
                        return (
                            <div key={sIdx} className="grid grid-cols-4 text-[13px] font-mono py-1.5 border-b border-white/5 items-center">
                                <span className="text-gray-500 text-[13px]">0{sIdx + 1}</span>
                                <span className="text-white font-bold text-[15px]">{set.peso}kg</span>
                                <span className="text-gray-300 text-[15px]">{set.reps}</span>
                                
                                {/* Indicador Visual de Progreso */}
                                <div className="text-right flex justify-end items-center font-mono">
                                    {isUp ? (
                                        <span className="text-[10px] bg-lime-500/10 text-lime-400 px-1.5 py-0.5 rounded border border-lime-500/20 animate-pulse">
                                            ↑ SUBISTE
                                        </span>
                                    ) : isEqual ? (
                                        <span className="text-[10px] text-gray-500 tracking-tighter">≈ MANTENCIÓN</span>
                                    ) : isInicial ? (
                                        /* Azul más claro (Cian) para que destaque el inicio de la serie */
                                        <span className="text-[10px] text-cyan-400/90 border-b border-cyan-400/30">
                                            INICIAL
                                        </span>
                                    ) : (
                                        /* Naranja en lugar de rojo oscuro para que "salte" a la vista el descenso */
                                        <span className="text-[10px] bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded border border-orange-500/30">
                                            ↓ BAJASTE
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default ExerciseItem;