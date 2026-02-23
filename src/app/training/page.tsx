'use client';

import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';
import RestTimer from '@/component/training/RestTimer';
import TrainingForm from '@/component/training/TrainingForm';
import { registerDescanso,createTraining, finishWorkOut } from '@/services/trainin.api';
import WorkoutSummary from '@/component/statBar/workResult';
import { StatResumeData, StatsResume } from '@/types/statBar';
import PlnatillaState from '@/component/statBar/PlantillaState';
import MissionList from '@/component/mision/MisionList';

export default function TrainingPage() {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
    const [activeTrainingId, setActiveTrainingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isMissionsOpen, setIsMissionsOpen] = useState(false);
    const [workoutResult, setWorkoutResult] = useState<StatResumeData | null>(null);

    const handleRefresh = () => setRefreshTrigger(prev => !prev);

    // Función para iniciar sesión
    const handleStartTraining = async () => {
        setLoading(true);
        try {
            const res = await createTraining(character_id) as { trainingId:string };
            setActiveTrainingId(res.trainingId);
            handleRefresh();
        } catch (error) {
            console.error("Error al iniciar incursión:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para finalizar y resetear fatiga
    const handleFinishTraining = async () => {
        if (!activeTrainingId) return;
        setLoading(true);
        try {
            const res = await finishWorkOut(character_id, activeTrainingId) as StatsResume;
            setWorkoutResult(res.data); // Mostramos el resumen
            setActiveTrainingId(null); // Limpiamos la sesión activa
            handleRefresh();
        } catch (error) {
            console.error("Error al cerrar sistemas:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-screen bg-[#0a0a0a] text-white flex overflow-hidden font-sans">
            
            {/* SIDEBAR: STATS */}
            <aside className={`${isStatsOpen ? 'w-[500px]' : 'w-12'} border-r border-gray-800 flex flex-col bg-[#0d0d0d] transition-all duration-300 relative`}>
                <button onClick={() => setIsStatsOpen(!isStatsOpen)} className="absolute -right-3 top-10 z-20 bg-blue-600 rounded-full p-1 border border-blue-400 hover:scale-110 transition-transform">
                    {isStatsOpen ? '✕' : '☰'}
                </button>
                <div className={`${isStatsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 flex flex-col h-full`}>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <PlnatillaState refreshTrigger={refreshTrigger} character_id={character_id}/>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
                
                <header className="w-full p-4 flex justify-between items-center border-b border-gray-800/50">
                    <span className="text-[10px] text-gray-500 tracking-widest uppercase">
                        {activeTrainingId ? `System_Status // Incursion_Active: ${activeTrainingId.substring(0,8)}` : 'System_Status // Standby'}
                    </span>
                    <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-blue-600 ${activeTrainingId ? 'w-full animate-pulse' : 'w-0'}`}></div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">
                            Gym<span className="text-blue-600 text-shadow-neon">Terminal</span>
                        </h1>
                        <div className="h-[2px] w-12 bg-blue-600 mx-auto mt-2 shadow-[0_0_10px_#2563eb]"></div>
                    </div>

                    <div className="w-full max-w-sm space-y-4">
                        
                        {/* LÓGICA DE BOTONES CONDICIONALES */}
                        {!activeTrainingId ? (
                            <button 
                                onClick={handleStartTraining}
                                disabled={loading}
                                className="w-full group relative py-6 bg-white text-black hover:bg-blue-500 hover:text-white transition-all rounded-xl font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? 'CONECTANDO...' : '⚡ INICIAR INCURSIÓN'}
                                </span>
                            </button>
                        ) : (
                            <>
                                {/* Opciones visibles solo si hay entrenamiento activo */}
                                <button 
                                    onClick={() => setOpen(true)}
                                    className="w-full group relative py-5 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl font-black text-lg shadow-lg active:scale-95 overflow-hidden border border-blue-400"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        🏋️ REGISTRAR SERIE
                                    </span>
                                </button>

                                <div className="bg-[#111] p-4 rounded-xl border border-gray-800 shadow-2xl">
                                     <h3 className="text-[10px] uppercase text-gray-500 mb-3 text-center tracking-widest italic font-bold">Protocolo de Recuperación Activo</h3>
                                     <RestTimer
                                         onFinish={async (seconds) => {
                                             await registerDescanso({"characterId":character_id, "restSeconds":seconds});
                                             handleRefresh();
                                         }}
                                    />
                                </div>

                                <button 
                                    onClick={handleFinishTraining}
                                    disabled={loading}
                                    className="w-full py-3 bg-red-900/20 hover:bg-red-600 border border-red-500/50 text-red-500 hover:text-white transition-all rounded-lg font-bold text-sm tracking-widest uppercase shadow-lg"
                                >
                                    {loading ? 'PROCESANDO...' : '✖ FINALIZAR Y SINCRONIZAR'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                <footer className="p-4 text-center">
                    <p className="text-[9px] text-gray-700 uppercase tracking-[0.3em] font-bold">Neural_Link_Established // Arca_OS</p>
                </footer>

                {/* MODAL PARA REGISTRO */}
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                        <div className="w-full max-w-md animate-in zoom-in-95 duration-200">
                            <TrainingForm 
                                setRefreshTrigger={handleRefresh} 
                                character_id={character_id} 
                                sessionId={activeTrainingId!} // Le pasamos el ID de la sesión al form
                                onClose={() => setOpen(false)} 
                                onSuccess={(StatsResume) => {
                                    handleRefresh();
                                    setWorkoutResult(StatsResume.data);
                                    setOpen(false); 

                                }}
                            />
                        </div>
                    </div>
                )}

                {/* RESUMEN DE ENTRENAMIENTO */}
                {workoutResult && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xl p-4">
                        <WorkoutSummary 
                            data={workoutResult} 
                            onClose={() => {
                                setWorkoutResult(null);
                                handleRefresh();
                            }} 
                        />
                    </div>
                )}
            </section>

            {/* ASIDE DE MISIONES */}
            <aside className={`${isMissionsOpen ? 'w-[85vw] md:w-[500px]' : 'w-5'} fixed md:relative right-0 top-0 h-full z-40 border-l border-gray-800 flex flex-col bg-[#0d0d0d] transition-all duration-300 shadow-2xl md:shadow-none`}>
                <button onClick={() => setIsMissionsOpen(!isMissionsOpen)} className="absolute -left-3 top-10 z-20 bg-yellow-600 rounded-full p-1 border border-yellow-400 hover:scale-110 transition-transform font-bold text-xs w-8 h-8 flex items-center justify-center">
                    {isMissionsOpen ? '✕' : 'M'}
                </button>
                <div className={`${isMissionsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 flex flex-col h-full`}>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                        <MissionList character_id={character_id} refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </aside>
        </main>
    );
}