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

    if (loading) return <div className="p-20 text-center text-blue-500 font-mono animate-pulse">Buscando Ejercicios</div>;

    return (
        <div className="w-full flex flex-col h-[700px] bg-[#050505] p-4 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            
            {/* Header Estilo Terminal */}
            <div className="flex items-center justify-between mb-8 px-6">
                <div className="space-y-1">
                    <h2 className="text-blue-500 font-black italic tracking-[0.3em] text-lg uppercase">
                        Registrar Ejercicios
                    </h2>
                    <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-transparent"></div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-blue-400/50 font-mono block uppercase">Ejercicios Cargados</span>
                    <span className="text-blue-400 font-black text-xs bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                        {exercises.length} PROTOCOLOS
                    </span>
                </div>
            </div>

            {/* Contenedor de Lista con Scroll Estilizado */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {exercises.map((ex) => {
                    const musclesNames = ex.muscles.map(m => m.muscleId.name.toLowerCase().trim());
                    const showBackView = musclesNames.some(name => POSTERIOR_LIST.includes(name));

                    return (
                        <div
                            key={ex._id}
                            onClick={() => setSelectedExercise(ex)}
                            className="group relative p-[1px] rounded-[2rem] bg-gradient-to-b from-blue-500/40 to-transparent transition-all duration-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                        >
                            {/* Fondo Interno (Contenedor con Borde Neón) */}
                            <div className="bg-[#0a0a0a] rounded-[2rem] p-6 flex gap-8 items-center border border-white/5 relative overflow-hidden">
                                
                                {/* 1. MARCO DEL SVG (Con borde de luz) */}
                                <div className="flex-shrink-0 relative">
                                    <div className="absolute -inset-1 bg-blue-600/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative bg-black p-4 rounded-2xl border border-blue-500/30 shadow-inner group-hover:border-blue-400 transition-all duration-500">
                                        <div className="text-[8px] text-blue-500/40 mb-2 font-mono text-center tracking-tighter uppercase">
                                            {showBackView ? 'Bio_Map_Back' : 'Bio_Map_Front'}
                                        </div>
                                        {showBackView ? (
                                            <BodyMapBack activeMuscles={musclesNames} className="w-28 h-auto" />
                                        ) : (
                                            <BodyMapFront activeMuscles={musclesNames} className="w-28 h-auto" />
                                        )}
                                        {/* Indicador de "Luz" lateral en el marco del monito */}
                                        <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                    </div>
                                </div>

                                {/* 2. INFO DEL EJERCICIO */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">
                                            {ex.name}
                                        </h3>
                                        <span className="text-[10px] text-gray-700 bg-gray-900 px-2 py-1 rounded font-mono">
                                            ID_{ex._id.slice(-4).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {ex.muscles.map((musculo, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-blue-900/10 px-4 py-2 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-all">
                                                <span className="text-xs text-gray-400 font-bold uppercase">
                                                    {musculo.muscleId.name}
                                                </span>
                                                <div className="w-[1px] h-4 bg-blue-500/30"></div>
                                                <span className="text-sm text-blue-500 font-mono font-black italic">
                                                    x{musculo.multiplier}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decoración de la barra lateral derecha (estilo scrollbar del dibujo) */}
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600/10 group-hover:bg-blue-600/40 transition-all"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}