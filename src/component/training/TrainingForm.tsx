'use client';

import { useState } from "react";
import ListaExercise from "../exercise/ListaExercise";
import { Exercise } from "@/types/exercise";
import { registerTraining } from "@/services/trainin.api";
import { TrainingFormProps } from "@/types/training";
import { StatsResume } from "@/types/statBar";

export default function TrainingForm({ onClose, character_id, setRefreshTrigger, onSuccess }: TrainingFormProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(20);
  const [difficulty, setDifficulty] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExercise) return;

    setLoading(true);
    try {
      // 1. Capturamos la respuesta del backend
      const response = await registerTraining({
        exerciseId: selectedExercise._id,
        reps,
        weight,
        difficulty,
        characterId: character_id
      }) as StatsResume;

      // 2. Si existe la prop onSuccess, le enviamos la data del resumen
      if (onSuccess) {
        onSuccess(response); 
      } else {
        // Fallback si no hay onSuccess (comportamiento original)
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
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-6">
                <div className="text-center">
                    <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em]">Ejercicio Seleccionado</span>
                    <h3 className="text-2xl font-bold text-white uppercase italic">
                    {selectedExercise.name}
                    </h3>
                </div>
              {/* Grid de Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase font-semibold">Repeticiones</label>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase font-semibold">Peso (KG)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Slider de Dificultad */}
              <div className="space-y-4 bg-[#111] p-4 rounded-xl border border-gray-800">
                <div className="flex justify-between">
                  <label className="text-xs text-gray-400 uppercase font-semibold">Intensidad Percibida (RPE)</label>
                  <span className="text-blue-500 font-bold">{difficulty}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-gray-500 text-center italic">
                  {difficulty >= 9 ? "🔥 AL FALLO MUSCULAR" : difficulty >= 7 ? "⚡ ALTO IMPACTO" : "🟢 CONTROLADO"}
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                <span className="relative z-10">{loading ? 'Procesando...' : 'Registrar Esfuerzo'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
               {/* Cabecera del Formulario con Botón Volver */}
                <div className="flex items-center justify-between bg-[#111] p-4 rounded-xl border border-gray-800 mb-6">
                    <button 
                    type="button" // Importante: tipo button para que no dispare el submit
                    onClick={() => setSelectedExercise(null)}
                    className="text-[10px] font-black text-gray-500 hover:text-blue-500 transition-colors uppercase tracking-widest flex items-center gap-2"
                    >
                    <span className="text-lg">←</span> VOLVER
                    </button>
                    
                    <div className="text-right">
                    <span className="text-[9px] text-blue-500 uppercase tracking-[0.2em] block">Unidad Seleccionada</span>
                    <h3 className="text-lg font-bold text-white uppercase italic leading-none">
                        {selectedExercise.name}
                    </h3>
                    </div>
                </div>
            </div>
            </form>
          ): (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <ListaExercise setSelectedExercise={setSelectedExercise} />
            </div>

          )}
        </div>
      </div>
    </div>
  );
}