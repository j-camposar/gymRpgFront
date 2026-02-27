import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Scatter, ScatterChart 
} from 'recharts';
import { format } from 'date-fns';

// Simulación de datos que vendrían de tu API
// Cada objeto es una SERIE (Set) individual
const rawSetData = [
  { date: '2026-02-23', weight: 10, reps: 12, muscle: 'Bíceps' },
  { date: '2026-02-23', weight: 12, reps: 10, muscle: 'Bíceps' },
  { date: '2026-02-23', weight: 14, reps: 8,  muscle: 'Bíceps' },
  { date: '2026-02-25', weight: 12, reps: 12, muscle: 'Bíceps' },
  { date: '2026-02-25', weight: 14, reps: 10, muscle: 'Bíceps' },
  { date: '2026-02-25', weight: 16, reps: 6,  muscle: 'Bíceps' },
];

export const ProgressLineChart = () => {
  const [selectedMuscle, setSelectedMuscle] = useState('Bíceps');

  return (
    <div className="w-full bg-[#0d0d0d] p-6 rounded-3xl border border-gray-900 shadow-2xl mt-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-blue-500 font-black italic text-sm uppercase tracking-widest">
            Análisis de Carga_Proyectada
          </h2>
          <p className="text-[10px] text-gray-500 font-mono">EJE Y: PESO (KG) / EJE X: TIEMPO</p>
        </div>
        
        {/* Selector de Músculo (Filtro) */}
        <select 
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          className="bg-black border border-gray-800 text-blue-400 text-[10px] rounded-lg px-2 py-1 outline-none"
        >
          <option value="Bíceps">BÍCEPS</option>
          <option value="Pecho">PECHO</option>
          <option value="Sentadilla">PIERNA</option>
        </select>
      </header>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rawSetData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(str) => format(new Date(str), 'dd/MM')}
              tick={{ fill: '#4b5563', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#4b5563', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
              itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
              labelStyle={{ color: '#666', fontSize: '10px', marginBottom: '4px' }}
            />
            
            {/* La línea que une los puntos */}
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <footer className="mt-4 flex justify-around">
        <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase">Puntos Totales</p>
            <p className="text-lg font-black text-white">{rawSetData.length}</p>
        </div>
        <div className="text-center border-l border-gray-800 pl-8">
            <p className="text-[9px] text-gray-500 uppercase">Tendencia</p>
            <p className="text-lg font-black text-green-500">↑ 2.5kg</p>
        </div>
      </footer>
    </div>
  );
};