'use client';

import RestTimer from '@/component/training/RestTimer';
import TrainingForm from '@/component/training/TrainingForm';
import { registerDescanso } from '@/services/trainin.api';

import {  useState } from 'react';

import { useSelector } from "react-redux";
import { RootState } from '@/store/store';
import MuscleStats from '@/component/character/MuscleStats';
import WorkoutSummary from '@/component/statBar/workResult';
import { StatsResume } from '@/types/statBar';
import BodyMapFront from '@/component/statBar/bodyMapFront';

export default function TrainingPage() {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    const [isStatsOpen, setIsStatsOpen] = useState(true);
    const handleRefresh = () => {
        setRefreshTrigger(prev => !prev);
    };
    const [workoutResult, setWorkoutResult] =useState<StatsResume | null>(null);
    return (
        <main className="h-screen bg-[#0a0a0a] text-white flex overflow-hidden font-sans">
            
            {/* SIDEBAR: STATS (Compacta y vertical) */}
           <aside className={`${isStatsOpen ? 'w-[450px]' : 'w-12'} border-r border-gray-800 flex flex-col bg-[#0d0d0d] transition-all duration-300 relative`}>
                
                {/* Botón de cierre/apertura */}
                <button 
                    onClick={() => setIsStatsOpen(!isStatsOpen)}
                    className="absolute -right-3 top-10 z-20 bg-blue-600 rounded-full p-1 border border-blue-400 hover:scale-110 transition-transform"
                >
                    {isStatsOpen ? '✕' : '☰'}
                </button>

                <div className={`${isStatsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 flex flex-col h-full`}>
                    <div className="p-4 border-b border-gray-800 bg-[#111] flex justify-between items-center">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">
                                Status
                            </h2>
                            <p className="text-[10px] text-gray-600 font-mono">ID: {character_id.slice(0,8)}</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <MuscleStats character_id={character_id} refreshTrigger={refreshTrigger}/>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT: ACTIONS */}
            <section className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
                
                {/* Header Superior Minimalista */}
                <header className="w-full p-4 flex justify-between items-center border-b border-gray-800/50">
                    <span className="text-[10px] text-gray-500 tracking-widest uppercase">System_Active // Session_v2</span>
                    <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-1/3 animate-pulse"></div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    {/* Título más pequeño para ganar espacio */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">
                            Gym<span className="text-blue-600">Terminal</span>
                        </h1>
                        <div className="h-[2px] w-12 bg-blue-600 mx-auto mt-2"></div>
                    </div>

                    {/* Botonera y Timer en un layout más apretado */}
                    <div className="w-full max-w-sm space-y-4">
                        <button 
                            onClick={() => setOpen(true)}
                            className="w-full group relative py-5 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl font-black text-lg shadow-lg active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🏋️ INICIAR ENTRENAMIENTO
                            </span>
                            {/* Brillo dinámico */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        </button>

                        <div className="bg-[#111] p-4 rounded-xl border border-gray-800 shadow-2xl">
                             <h3 className="text-[10px] uppercase text-gray-500 mb-3 text-center tracking-widest">Protocolo de Recuperación</h3>
                             <RestTimer
                                onFinish={async (seconds) => {
                                    await registerDescanso({"characterId":character_id, "restSeconds":seconds});
                                    handleRefresh();
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer simple para cerrar el diseño */}
                <footer className="p-4 text-center">
                    <p className="text-[9px] text-gray-700 uppercase tracking-[0.3em]">Neural_Link_Established</p>
                </footer>

                {/* MODAL */}
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                        <div className="w-full max-w-md animate-in zoom-in-95 duration-200">
                            <TrainingForm 
                                setRefreshTrigger={handleRefresh} 
                                character_id={character_id} 
                                onClose={() => setOpen(false)} 
                                onSuccess={StatsResume => {
                                    setWorkoutResult(StatsResume);
                                    setOpen(false); 
                                }}
                            />
                        </div>
                    </div>
                )}
                {workoutResult && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xl p-4">
                    <WorkoutSummary 
                        data={workoutResult.data} 
                        onClose={() => {
                            setWorkoutResult(null);
                            handleRefresh(); // Refrescamos las barras después de ver el resumen
                        }} 
                    />
                </div>
            )}
            </section>
        </main>
    );
}