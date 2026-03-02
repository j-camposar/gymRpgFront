'use client';

import { useEffect, useState, useMemo } from 'react'; // Añadido useMemo
import { getExercises } from '@/services/exercise.api';
import { Exercise, ExerciseReponse, ListaExerciseProps } from '@/types/exercise';
import BodyMapFront from '../statBar/bodyMapFront';
import BodyMapBack from '../statBar/bodyMapBack';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { HistorySeries } from '@/types/training';

// Definimos los grupos musculares clave para los botones de arriba
const GRUPOS_FILTRO = [
    { id: 'pecho', label: 'PECHO' },
    { id: 'espalda', label: 'ESPALDA' }, // Mapeará a "espalda alta" y "dorsales"
    { id: 'brazo', label: 'BRAZOS' },   // Mapeará a biceps, triceps, antebrazo
    { id: 'pierna', label: 'PIERNAS' }  // Mapeará a cuádriceps, femorales, glúteos
];

export default function ListaExercise({ setSelectedExercise, setUltimoRegistro}: ListaExerciseProps ) {
    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    const [data, setData] = useState<HistorySeries>();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtrosActivos, setFiltrosActivos] = useState<string[]>([]);

    const POSTERIOR_LIST = ["espalda alta", "glúteos", "femorales", "gemelos", "dorsales"];

    useEffect(() => {
        async function getExercise() {
            const response = await getExercises(character_id);
            if(response.todos){
                setExercises(response.todos)
            }
            if(response.ultimoExerciseId){
                setData(response.ultimoExerciseId); 
            }
            setLoading(false);
        }
        getExercise();
    }, [character_id]);

    // LÓGICA DE FILTRADO Y PRIORIZACIÓN
    const ejerciciosFiltradosYOrdenados = useMemo(() => {
        let filtrados = exercises.filter(ex => {
            if (filtrosActivos.length === 0) return true;
            
            // Mapeo lógico: Si el usuario pulsa "brazo", buscamos bíceps o tríceps
            const musclesInExercise = ex.muscles.map(m => m.muscleId.name.toLowerCase());
            
            return filtrosActivos.some(filtro => {
                if (filtro === 'brazo') return musclesInExercise.some(m => m.includes('biceps') || m.includes('triceps') || m.includes('antebrazo'));
                if (filtro === 'pierna') return musclesInExercise.some(m => m.includes('pierna') || m.includes('femorales') || m.includes('glúteos') || m.includes('cuádriceps'));
                if (filtro === 'espalda') return musclesInExercise.some(m => m.includes('espalda') || m.includes('dorsales'));
                return musclesInExercise.some(m => m.includes(filtro));
            });
        });

        // Ordenar: El último ejercicio siempre arriba
        return [...filtrados].sort((a, b) => {
            if (a._id === data?.exerciseId) return -1;
            if (b._id === data?.exerciseId) return 1;
            return 0; // Mantener orden original o alfabético si prefieres
        });
    }, [exercises, filtrosActivos]);

    const toggleFiltro = (id: string) => {
        setFiltrosActivos(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-blue-500 font-mono animate-pulse">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            BUSCANDO PROTOCOLOS...
        </div>
    );

    return (
        <div className="w-full flex flex-col h-[82vh] md:h-[700px] bg-[#050505] p-3 md:p-6 rounded-t-3xl md:rounded-3xl border border-blue-500/20">
            {/* HEADER CON FILTROS TÁCTICOS */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-blue-500 font-black italic tracking-[0.2em] text-xs uppercase">Filtrar por Grupo</h2>
                    <button 
                        onClick={() => setFiltrosActivos([])}
                        className="text-[10px] text-gray-500 hover:text-white transition-colors"
                    >
                        LIMPIAR
                    </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {GRUPOS_FILTRO.map((grupo) => (
                        <button
                            key={grupo.id}
                            onClick={() => toggleFiltro(grupo.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl border text-[10px] font-black transition-all duration-300 ${
                                filtrosActivos.includes(grupo.id)
                                    ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                    : 'bg-black border-white/10 text-gray-400'
                            }`}
                        >
                            {grupo.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-10">
                {ejerciciosFiltradosYOrdenados.map((ex) => {
                    const musclesNames = ex.muscles.map(m => m.muscleId.name.toLowerCase().trim());
                    const showBackView = musclesNames.some(name => POSTERIOR_LIST.includes(name));
                    const isLast = ex._id === data?.exerciseId;

                    return (
                        <div
                            key={ex._id}
                            onClick={() => {
                                // 1. Seteamos el ejercicio base
                                setSelectedExercise(ex);

                                // 2. Si es el último, mandamos el objeto 'data' (que tiene weight, reps, etc.)
                                if (isLast) {
                                    setUltimoRegistro(data);
                                } else {
                                    // Opcional: limpiar el registro si eligen otro para no confundir
                                    setUltimoRegistro(null); 
                                }
                            }}
                            className={`group active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                                isLast ? 'ring-2 ring-blue-500/50 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)]' : ''
                            }`}
                        >
                            <div className="bg-[#0a0a0a] rounded-2xl p-3 md:p-5 flex gap-4 md:gap-8 items-center border border-white/5 relative overflow-hidden">
                                {isLast && (
                                    <div className="absolute top-2 right-4 bg-blue-600 text-[8px] font-black px-2 py-0.5 rounded italic animate-pulse">
                                        ÚLTIMO REGISTRO
                                    </div>
                                )}
                                
                                <div className="flex-shrink-0 relative">
                                    <div className="relative bg-black p-2 md:p-4 rounded-xl border border-blue-500/20 group-hover:border-blue-400 transition-all">
                                        {showBackView ? (
                                            <BodyMapBack activeMuscles={musclesNames} className="w-14 md:w-28 h-auto" />
                                        ) : (
                                            <BodyMapFront activeMuscles={musclesNames} className="w-14 md:w-28 h-auto" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg md:text-2xl font-black text-white uppercase italic tracking-tighter">
                                        {ex.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {ex.muscles.map((musculo, index) => (
                                            <div key={index} className="flex items-center gap-1.5 bg-blue-900/10 px-2 py-1 rounded-md border border-blue-500/10">
                                                <span className="text-[9px] text-gray-400 font-bold uppercase">
                                                    {musculo.muscleId.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}