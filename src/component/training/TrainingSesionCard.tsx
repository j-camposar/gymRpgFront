'use client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState, useEffect,useMemo } from "react";
import ExerciseItem from '@/component/training/ExerciseItem';
import {HistoryTraining, HistoryExercise} from '@/types/training'
import MuscleMapFront from '@/component/statBar/bodyMapFront'; // SVG del cuerpo frontal
import MuscleMapBack from '@/component/statBar/bodyMapBack';   // SVG del cuerpo trasero
import {getSessionsHistroy} from '@/services/trainin.api';

const TrainingSesionCard = ({ session }: { session: HistoryTraining }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [historyExerciseData, setHistoryExerciseData] = useState<HistoryExercise[]>([]);
    
    const fetchHistoryData = async (session_id:string) => {
        const  exercise = await getSessionsHistroy(session_id) as HistoryExercise[]; 
        setHistoryExerciseData(exercise);
     }
    return (
        <div 
            onClick={() => {
                // 1. Cambiamos el estado de apertura
                setIsOpen(!isOpen);
                if (!isOpen ) {
                    fetchHistoryData(session.id);
                }
            }}
            className={`mb-4 overflow-hidden transition-all duration-300 border rounded-2xl ${
                isOpen ? 'bg-[#111] border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#0d0d0d] border-gray-900'
            }`}
        >
            {/* --- VISTA RESUMIDA --- */}
            <div className="p-4 flex justify-between items-center cursor-pointer">
                <div>
                    <p className="text-[14px] font-mono text-blue-400 uppercase leading-none mb-1">
                        {format(new Date(session.fecha), "eeee dd, MMMM", { locale: es })}
                    </p>
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tight">
                        {session.nombre}
                    </h3>
                </div>
             
                <div className="text-right">
                    <p className="text-[16px] font-bold text-white">{session.pesoTotal}kg</p>
                    <p className="text-[15px] text-gray-500 uppercase font-mono">{session.calorias} kcal</p>
                </div>
            </div>

            {/* --- VISTA DESPLEGADA --- */}
            {isOpen && (
            <div className="px-4 pb-4 pt-2 border-t border-gray-800 animate-in fade-in slide-in-from-top-2">
                
                {/* --- FILA 1: TIEMPOS (Compacto) --- */}
                <div className="grid grid-cols-2 gap-2 mb-3 bg-black/20 p-2 rounded-xl border border-gray-900">
                    <div className="text-center border-r border-gray-800">
                        <p className="text-[9px] text-gray-500 uppercase font-mono">Inicio</p>
                        <p className="text-xs font-mono text-gray-200">{session.horaInicio}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 uppercase font-mono">Término</p>
                        <p className="text-xs font-mono text-gray-200">{session.horaFin}</p>
                    </div>
                </div>

                {/* --- FILA 2: MAPA BIOMECÁNICO (ANCHO COMPLETO) --- */}
                <div className="mb-6 bg-black/40 p-4 rounded-2xl border border-blue-900/20 shadow-[inner_0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] text-blue-400/60 uppercase font-mono tracking-[0.2em]">Carga Biomecánica Activa</p>
                        <span className="text-[8px] animate-pulse bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 font-mono">
                            SISTEMA_OK
                        </span>
                    </div>
                    
                        {/* Mapa Frontal */}
                    {historyExerciseData[0]?.musculos && (
                        <div className="flex justify-around items-center gap-8 py-2">
                            <div className="flex flex-col items-center flex-1">
                                <div className="h-44 w-full flex justify-center">
                                    <MuscleMapFront 
                                        activeMuscles={historyExerciseData[0]?.musculos as []} 
                                        highlightColor="#22d3ee" 
                                        className="h-full w-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                                    />
                                </div>
                                <span className="text-[8px] text-gray-600 font-mono mt-3 tracking-widest uppercase">Frontal Scan</span>
                            </div>

                            {/* Mapa Trasero */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="h-44 w-full flex justify-center">
                                    <MuscleMapBack 
                                        activeMuscles={historyExerciseData[0]?.musculos as []} 
                                        highlightColor="#22d3ee" 
                                        className="h-full w-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                                    />
                                </div>
                                <span className="text-[8px] text-gray-600 font-mono mt-3 tracking-widest uppercase"> Espalda Scan</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- FILA 3: LISTADO DE EJERCICIOS --- */}
                <div className="space-y-3">
                    <p className="text-[11px] text-blue-400 font-black uppercase tracking-[0.3em] border-b border-blue-900/30 pb-1 mb-4">
                        Análisis de Incursión
                    </p>
                    {historyExerciseData.map((ex: HistoryExercise, idx: number) => (
                        <ExerciseItem key={idx} ex={ex} trainingId={session.id} />
                    ))}
                </div>
            </div>
        )}
        </div>
    );
};
export default TrainingSesionCard;