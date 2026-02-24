'use client';

import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { createTraining, finishWorkOut, getSessionLogs, registerDescanso } from '@/services/trainin.api';
import { Log } from '@/types/training';
import { StatResumeData, StatsResume } from '@/types/statBar';

// Componentes
import RestTimer from '@/component/training/RestTimer';
import TrainingForm from '@/component/training/TrainingForm';
import WorkoutSummary from '@/component/statBar/workResult';
import PlnatillaState from '@/component/statBar/PlantillaState';
import MissionList from '@/component/mision/MisionList';
import RecentSeriesLogs from '@/component/training/RecentSeriesLogs';

export default function TrainingPage() {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
    const [activeTrainingId, setActiveTrainingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [sessionLogs, setSessionLogs] = useState<Log[]>([]);

    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    
    // Estados de menús (Burbujas)
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isMissionsOpen, setIsMissionsOpen] = useState(false);
    const [workoutResult, setWorkoutResult] = useState<StatResumeData | null>(null);

    const handleRefresh = () => setRefreshTrigger(prev => !prev);

    // Fetch de logs
    useEffect(() => {
        const fetchLogs = async () => {
            if (activeTrainingId) {
                const data = await getSessionLogs(activeTrainingId) as Log[];
                setSessionLogs(data);
            }
        };
        fetchLogs();
    }, [activeTrainingId, refreshTrigger]);

    const handleStartTraining = async () => {
        setLoading(true);
        try {
            const res = await createTraining(character_id) as { trainingId: string };
            setActiveTrainingId(res.trainingId);
            handleRefresh();
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const handleFinishTraining = async () => {
        if (!activeTrainingId) return;
        setLoading(true);
        try {
            const res = await finishWorkOut(character_id, activeTrainingId) as StatsResume;
            setWorkoutResult(res.data);
            setActiveTrainingId(null);
            handleRefresh();
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    return (
        <main className="h-screen bg-[#060606] text-white flex relative overflow-hidden font-sans">
            
            {/* --- BURBUJA DE ESTADÍSTICAS (IZQUIERDA) --- */}
            <div className="fixed left-6 top-10 z-50">
                <button 
                    onClick={() => setIsStatsOpen(!isStatsOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)]
                        ${isStatsOpen ? 'bg-red-600 border-red-400 rotate-90' : 'bg-blue-600 border-blue-400 hover:scale-110'}`}
                >
                    {isStatsOpen ? '✕' : '📊'}
                </button>
            </div>

            {/* PANEL IZQUIERDO DESPLEGABLE */}
            <aside className={`fixed left-0 top-0 h-full z-40 bg-[#0d0d0d]/98 backdrop-blur-2xl transition-all duration-500 ease-in-out
                ${isStatsOpen 
                    ? 'w-full md:w-[450px] translate-x-0 border-r border-blue-500/30' 
                    : 'w-0 -translate-x-full border-none'}`}>
                <div className={`${isStatsOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 p-8 pt-24 h-full overflow-y-auto custom-scrollbar`}>
                    <h2 className="text-blue-500 font-black tracking-widest uppercase mb-6 border-b border-blue-500/20 pb-2 italic">Biometría_Link</h2>
                    <PlnatillaState refreshTrigger={refreshTrigger} character_id={character_id}/>
                </div>
            </aside>

            {/* --- BURBUJA DE MISIONES (DERECHA) --- */}
            <div className="fixed right-6 top-10 z-50">
                <button 
                    onClick={() => setIsMissionsOpen(!isMissionsOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-[0_0_15px_rgba(202,138,4,0.3)]
                        ${isMissionsOpen ? 'bg-red-600 border-red-400 rotate-90' : 'bg-yellow-600 border-yellow-400 hover:scale-110'}`}
                >
                    {isMissionsOpen ? '✕' : '📜'}
                </button>
            </div>

            {/* PANEL DERECHO DESPLEGABLE */}
            <aside className={`fixed right-0 top-0 h-full z-40 bg-[#0d0d0d]/95 backdrop-blur-2xl border-l border-gray-800 transition-all duration-500 ease-in-out
                ${isMissionsOpen ? 'w-full md:w-[450px] translate-x-0' : 'w-0 translate-x-full'}`}>
                <div className="p-8 pt-24 h-full overflow-y-auto custom-scrollbar">
                    <h2 className="text-yellow-500 font-black tracking-widest uppercase mb-6 border-b border-yellow-500/20 pb-2">Objetivos del Arca</h2>
                    <MissionList character_id={character_id} refreshTrigger={refreshTrigger} setRefreshTrigger={handleRefresh} />
                </div>
            </aside>

            {/* --- CONTENIDO CENTRAL --- */}
            <section className="flex-1 flex flex-col items-center justify-center relative p-6">
                
                {/* Header Superior Minimalista */}
                <div className="absolute top-6 flex flex-col items-center gap-1 opacity-40">
                    <span className="text-[10px] tracking-[0.5em] uppercase text-gray-400">GymTerminal v3.7</span>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>

                <div className="w-full max-w-[340px] flex flex-col items-center gap-8">
                    {/* Logotipo Central */}
                    <div className="text-center group">
                        <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
                            Gym<span className="text-blue-600 drop-shadow-[0_0_10px_rgba(37,99,235,0.8)]">Terminal</span>
                        </h1>
                        <div className="h-[2px] w-16 bg-blue-600 mx-auto mt-2 scale-x-100 group-hover:scale-x-150 transition-transform"></div>
                    </div>

                    {/* Acciones Principales */}
                    <div className="w-full space-y-5">
                        {!activeTrainingId ? (
                            <button 
                                onClick={handleStartTraining}
                                disabled={loading}
                                className="w-full py-8 bg-white text-black hover:bg-blue-600 hover:text-white transition-all rounded-3xl font-black text-2xl shadow-2xl active:scale-95"
                            >
                                {loading ? 'Sincronizando...' : '⚡ INICIAR'}
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => setOpen(true)}
                                    className="w-full py-8 bg-blue-600 hover:bg-blue-500 transition-all rounded-3xl font-black text-2xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] border border-blue-400 active:scale-95"
                                >
                                    🏋️ REGISTRAR
                                </button>

                                <div className="bg-[#111]/80 backdrop-blur border border-gray-800 p-4 rounded-3xl shadow-xl">
                                     <RestTimer onFinish={async (s) => {
                                         await registerDescanso({"characterId":character_id, "restSeconds":s});
                                         handleRefresh();
                                     }} />
                                </div>

                                <button 
                                    onClick={handleFinishTraining}
                                    disabled={loading}
                                    className="w-full py-3 bg-red-950/30 hover:bg-red-600 border border-red-500/40 text-red-500 hover:text-white transition-all rounded-xl font-bold text-[11px] tracking-[0.4em] uppercase"
                                >
                                    ✖ FINALIZAR INCURSIÓN
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Listado de Logs (Solo aparece si hay sesión activa) */}
                {activeTrainingId && <RecentSeriesLogs logs={sessionLogs} />}
            </section>

            {/* Modales */}
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
                    <div className="w-full max-w-md">
                        <TrainingForm 
                            setRefreshTrigger={handleRefresh} character_id={character_id} 
                            sessionId={activeTrainingId!} onClose={() => setOpen(false)} 
                            onSuccess={(s) => { handleRefresh(); setWorkoutResult(s.data); setOpen(false); }}
                        />
                    </div>
                </div>
            )}

            {workoutResult && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-3xl p-4">
                    <WorkoutSummary data={workoutResult} onClose={() => { setWorkoutResult(null); handleRefresh(); }} />
                </div>
            )}
        </main>
    );
}