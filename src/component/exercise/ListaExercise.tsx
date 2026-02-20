'use client';

import { useEffect, useState } from 'react';
import { getExercises } from '@/services/exercise.api';
import { Exercise, ListaExerciseProps } from '@/types/exercise';
import BodyMapFront from '../statBar/bodyMapFront';
import BodyMapBack from '../statBar/bodyMapBack';

export default function ListaExercise({ setSelectedExercise }: ListaExerciseProps) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    const POSTERIOR_LIST = ["espalda", "tríceps", "glúteos", "femorales", "isquiotibiales"];

    useEffect(() => {
        getExercises().then(setExercises).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-blue-500 font-mono animate-pulse">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            BUSCANDO PROTOCOLOS...
        </div>
    );

    return (
        /* Cambié h-[700px] por h-screen o h-[85vh] para que se adapte al alto del celular */
        <div className="w-full flex flex-col h-[82vh] md:h-[700px] bg-[#050505] p-3 md:p-6 rounded-t-3xl md:rounded-3xl border border-blue-500/20">
            
            {/* Header más compacto para móvil */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 px-2">
                <div className="space-y-1">
                    <h2 className="text-blue-500 font-black italic tracking-[0.2em] text-sm md:text-lg uppercase">
                        Seleccionar Protocolo
                    </h2>
                    <div className="h-[1px] w-24 bg-blue-600"></div>
                </div>
                <div className="mt-2 md:mt-0">
                    <span className="text-blue-400 font-black text-[10px] bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/30">
                        {exercises.length} CARGADOS
                    </span>
                </div>
            </div>

            {/* Lista con scroll optimizado para touch */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-10">
                {exercises.map((ex) => {
                    const musclesNames = ex.muscles.map(m => m.muscleId.name.toLowerCase().trim());
                    const showBackView = musclesNames.some(name => POSTERIOR_LIST.includes(name));

                    return (
                        <div
                            key={ex._id}
                            onClick={() => setSelectedExercise(ex)}
                            className="group active:scale-[0.98] transition-all duration-200"
                        >
                            <div className="bg-[#0a0a0a] rounded-2xl p-3 md:p-5 flex gap-4 md:gap-8 items-center border border-white/5 relative overflow-hidden">
                                
                                {/* 1. SVG MINIATURA (Optimizado para móvil) */}
                                <div className="flex-shrink-0 relative">
                                    <div className="relative bg-black p-2 md:p-4 rounded-xl border border-blue-500/20 group-hover:border-blue-400 transition-all">
                                        {showBackView ? (
                                            <BodyMapBack activeMuscles={musclesNames} className="w-14 md:w-28 h-auto" />
                                        ) : (
                                            <BodyMapFront activeMuscles={musclesNames} className="w-14 md:w-28 h-auto" />
                                        )}
                                    </div>
                                </div>

                                {/* 2. INFO DEL EJERCICIO (Tipografía escalable) */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col mb-2">
                                        <h3 className="text-lg md:text-2xl font-black text-white uppercase italic tracking-tighter truncate">
                                            {ex.name}
                                        </h3>
                                        <span className="text-[8px] text-gray-700 font-mono">
                                            CODE_{ex._id.slice(-4).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Músculos en formato Tag compacto */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {ex.muscles.map((musculo, index) => (
                                            <div key={index} className="flex items-center gap-1.5 bg-blue-900/10 px-2 py-1 rounded-md border border-blue-500/10">
                                                <span className="text-[9px] text-gray-400 font-bold uppercase truncate max-w-[60px]">
                                                    {musculo.muscleId.name}
                                                </span>
                                                <span className="text-[10px] text-blue-500 font-black italic">
                                                    x{musculo.multiplier}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Barra de selección lateral */}
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600/20 group-hover:bg-blue-500 transition-all"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}