'use client';

import { useEffect, useState } from "react";
import ListaExercise from "../exercise/ListaExercise";
import { Exercise } from "@/types/exercise";
import { registerTraining } from "@/services/trainin.api";
import { HistoryExercise, HistorySeries, TrainingFormProps } from "@/types/training";
import { StatsResume } from "@/types/statBar";

export default function TrainingForm({ onClose, character_id, sessionId,setRefreshTrigger, onSuccess }: TrainingFormProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(20);
  const [difficulty, setDifficulty] = useState(5);
  const [loading, setLoading] = useState(false);
  const [ultimoRegistro, setUltimoRegistro] = useState<HistorySeries | null>(null);
    useEffect(() => {
    if (ultimoRegistro) {
        console.log("Cargando marcas de la última incursión:", ultimoRegistro);
        
        // Usamos 'weight' en lugar de 'peso'
        setReps(ultimoRegistro.reps || 10);
        setWeight(ultimoRegistro.weight || 20); 
        
        // Si el log tiene dificultad, la usamos
        setDifficulty(ultimoRegistro.difficulty || 5);
    }
}, [ultimoRegistro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExercise) return;

    setLoading(true);
    try {
      const response = await registerTraining({
        exerciseId: selectedExercise._id,
        reps,
        weight,
        difficulty,
        characterId: character_id,
        sessionId:sessionId
      }) as StatsResume;

      if (onSuccess) {
        onSuccess(response); 
      } else {
        onClose();
      }

    } catch (err) {
      alert('Error en la conexión con la Terminal de Entrenamiento');
    } finally {
      setRefreshTrigger();
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#161616] w-full max-w-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 overflow-hidden">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center bg-[#1f1f1f] p-5 border-b border-gray-800">
          <h2 className="text-xl font-black italic tracking-tighter text-blue-500">
            LOG_SESSION_v1.0
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 min-h-[400px] flex flex-col">
          {selectedExercise ? (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between animate-in fade-in slide-in-from-right-4 duration-300 max-w-md mx-auto w-full">
                {/* 1. HEADER TÁCTICO (Compacto y arriba) */}
                <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-2xl border border-white/5 mb-4 shadow-lg">
                    <button 
                        type="button" 
                        onClick={() => setSelectedExercise(null)}
                        className="h-10 px-4 bg-white/5 rounded-xl text-[10px] font-black text-gray-400 hover:text-blue-400 transition-all uppercase tracking-tighter border border-white/5 active:scale-90"
                    >
                        ← Volver
                    </button>
                    <div className="text-right">
                        <span className="text-[8px] text-blue-500 uppercase tracking-[0.2em] font-black block opacity-70">Protocolo Activo</span>
                        <h3 className="text-sm font-black text-white uppercase italic leading-none truncate max-w-[150px]">
                            {selectedExercise.name}
                        </h3>
                    </div>
                </div>

                {/* 2. PANEL DE CONTROL (Inputs Principales) */}
                <div className="flex-1 space-y-5">
                    {/* SECCIÓN REPETICIONES CORREGIDA */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-blue-500/70 uppercase font-black tracking-widest px-1">Repeticiones</label>
                        <div className="flex items-center justify-between bg-[#0d0d0d] p-1.5 rounded-2xl border border-white/5 w-full">
                            {/* BOTÓN RESTAR - Ancho fijo */}
                            <button 
                                type="button" 
                                onClick={() => setReps(r => Math.max(1, r - 1))} 
                                className="w-14 h-14 flex-shrink-0 bg-white/5 text-white rounded-xl text-xl font-bold active:scale-90 border border-white/5"
                            >
                                -
                            </button>

                            {/* INPUT - Sin ancho mínimo para que no empuje */}
                            <input
                                type="number"
                                value={reps==0?'':reps}
                                onChange={(e) => setReps(Number(e.target.value))}
                                className="w-full min-w-0 bg-transparent text-center text-4xl font-black text-white outline-none appearance-none"
                            />

                            {/* BOTÓN SUMAR - Ancho fijo y flex-shrink-0 para que NO DESAPAREZCA */}
                            <button 
                                type="button" 
                                onClick={() => setReps(r => r + 1)} 
                                className="w-14 h-14 flex-shrink-0 bg-blue-600/20 text-blue-400 rounded-xl text-xl font-bold active:scale-90 border border-blue-500/20"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* SECCIÓN PESO CORREGIDA */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-blue-500/70 uppercase font-black tracking-widest px-1">Carga (KG)</label>
                        <div className="flex items-center justify-between bg-[#0d0d0d] p-1.5 rounded-2xl border border-white/5 w-full">
                            <button 
                                type="button" 
                                onClick={() => setWeight(w => Math.max(0, w - 2.5))} 
                                className="w-16 h-14 flex-shrink-0 bg-white/5 text-red-400/70 rounded-xl font-bold active:scale-90 border border-white/5"
                            >
                                -2.5
                            </button>

                            <input
                                type="number"
                                value={weight==0?'':weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full min-w-0 bg-transparent text-center text-3xl font-black text-white outline-none appearance-none"
                            />

                            <button 
                                type="button" 
                                onClick={() => setWeight(w => w + 2.5)} 
                                className="w-16 h-14 flex-shrink-0 bg-blue-600 text-white rounded-xl font-bold active:scale-90 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                            >
                                +2.5
                            </button>
                        </div>
                    </div>

                    {/* RPE SLIDER (Más estético) */}
                    <div className="space-y-3 bg-[#0d0d0d] p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Intensidad RPE</label>
                            <span className={`text-sm font-black ${difficulty >= 9 ? 'text-red-500' : 'text-blue-500'}`}>{difficulty}/10</span>
                        </div>
                        <input
                            type="range" min={1} max={10} value={difficulty}
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <p className="text-[12px] text-gray-600 text-center font-bold uppercase tracking-tighter">
                            {difficulty >= 9 ? "⚡ Cerca del fallo" : difficulty >= 7 ? "⚔️ Esfuerzo alto" : "🛡️ Calentamiento / Control"}
                        </p>
                    </div>
                </div>

                {/* 3. ACCIÓN PRINCIPAL (Botón gigante abajo) */}
                <div className="mt-6 pt-4 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 relative overflow-hidden bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-500 transition-all disabled:opacity-50 active:scale-[0.98] shadow-2xl shadow-blue-900/20"
                    >
                        <span className="relative z-10">{loading ? 'Sincronizando...' : 'Registrar Incursión'}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </button>
                </div>
            </form>
          ): (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <ListaExercise setSelectedExercise={setSelectedExercise} setUltimoRegistro={setUltimoRegistro} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}