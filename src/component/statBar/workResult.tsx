import { StatsResume } from "@/types/statBar";

// Ejemplo de componente de Resumen
const WorkoutSummary = ({ data, onClose }:StatsResume) => (
  <div className="bg-[#0d0d0d]/95 backdrop-blur-md border border-blue-500/30 p-6 rounded-2xl shadow-[0_0_50px_rgba(30,64,175,0.2)]">
    <h2 className="text-2xl font-black italic text-blue-500 mb-4 uppercase tracking-tighter">
      Sesión Completada
    </h2>
    
    <div className="space-y-3 mb-6">
      <div className="flex justify-between border-b border-gray-800 pb-2">
        <span className="text-gray-400 text-xs uppercase">XP Total Ganada</span>
        <span className="text-white font-mono">+{data.totalXp}</span>
      </div>
      {data.leveledUpMuscles.map(m => (
        <div key={m.name} className="flex justify-between items-center bg-blue-900/20 p-2 rounded border border-blue-400/50">
          <span className="text-blue-300 text-xs font-bold uppercase">{m.name}</span>
          <span className="text-yellow-400 font-black italic tracking-tighter">
            {m.levelUp ==true  ? (
                <span className="animate-pulse bg-yellow-500 text-black px-1 mr-2 rounded-sm text-[10px]">
                ¡LEVEL UP!
                </span>
            ) : null}
            <span className="font-mono">LVL {m.level}</span>
            </span>
        </div>
      ))}
    </div>

    <button 
      onClick={onClose}
      className="w-full py-3 bg-blue-600 text-white font-black uppercase text-sm hover:bg-blue-500 transition-colors rounded-lg"
    >
      Continuar Operación
    </button>
  </div>
);
export default WorkoutSummary;