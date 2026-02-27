'use client';

import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { useState, useEffect } from 'react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import TrainingSesionCard from '@/component/training/TrainingSesionCard';
import {buscarEntrenamientos} from '@/services/trainin.api';
import {HistoryTraining} from '@/types/training'


export default function TrainingHistory () {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";

    // 1. Estado para el rango de fechas (Default: últimos 7 días)
    const [dateRange, setDateRange] = useState({
        start: subDays(new Date(), 7),
        end: new Date()
    });
    const objetivo="RECOMPOCICION";
    const [muscleData, setMuscleData] =  useState<HistoryTraining[]>([]);
    const [loading, setLoading] = useState(false);

    // 2. Efecto para buscar datos cuando cambie la fecha
    useEffect(() => {
        fetchHistoryData();
    }, [dateRange]);

    const fetchHistoryData = async () => {
        setLoading(true);
        try {
            const response = await buscarEntrenamientos(format(dateRange.start, 'yyyy-MM-dd'), `${format(dateRange.end, 'yyyy-MM-dd')}`, character_id) as HistoryTraining[];
            setMuscleData(response);
        } catch (error) {
            console.error("Falla en la sincronización:", error);
        } finally {
            setLoading(false);
        }
    };
   
    return (
        <div className="flex flex-col p-6 bg-[#060606] min-h-screen text-white font-sans">
            <header className="mb-6">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500">
                    LISTADO DE ENTRENAMIENTOS
                </h1>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-mono text-[10px]">OPERACIÓN:{objetivo} </p>
                    <span className="text-blue-400 text-[10px] font-mono animate-pulse">
                        {loading ? 'SYNCING...' : 'ONLINE'}
                    </span>
                    
                </div>

            </header>

            {/* --- SELECTOR DE RANGO (FILTRO) --- */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {[
                    { label: '7D', value: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
                    { label: 'MES', value: () => ({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) }) },
                    { label: 'MAX', value: () => ({ start: subDays(new Date(), 90), end: new Date() }) },
                ].map((range) => (
                    <button
                        key={range.label}
                        onClick={() => setDateRange(range.value())}
                        className="px-5 py-1.5 rounded-full border border-gray-800 bg-[#0d0d0d] text-[10px] font-bold hover:border-blue-500 hover:text-blue-400 transition-all uppercase"
                    >
                        {range.label}
                    </button>
                ))}
            </div>

           {/* LISTADO DE SESIONES (CARDS) */}
            <section className="flex-1 mt-6">
                <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-mono">
                    Historial_Cronológico
                </h2>
                
                {/* Mock de datos para probar la visualización */}
                {muscleData.map(session => (
                    <TrainingSesionCard key={session.id} session={session} />
                ))}
            </section>

            <footer className="mt-auto py-4 border-t border-gray-900">
                <p className="text-[9px] text-gray-600 font-mono text-center">
                    PERIODO: {format(dateRange.start, 'dd/MM')} - {format(dateRange.end, 'dd/MM')}
                </p>
            </footer>
        </div>
    );
};