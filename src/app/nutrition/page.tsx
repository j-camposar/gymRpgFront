'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NutritionLog } from '@/types/nutrition';



export default function NutritionPage() {
    const router = useRouter();
    const [logs, setLogs] = useState<NutritionLog[]>([]);
    const [isScanning, setIsScanning] = useState(false);

    // Simulación de carga de logs (Aquí conectarás con tu API más tarde)
    useEffect(() => {
        // fetchNutritionLogs(character_id)...
    }, []);

    const handleCameraScan = () => {
        setIsScanning(true);
        // Aquí dispararás la lógica de Gemini que preparamos
        setTimeout(() => setIsScanning(false), 3000); // Simulación de proceso
    };

    return (
        <main className="min-h-screen bg-[#060606] text-white flex flex-col font-sans relative overflow-hidden">
            
            {/* BACKGROUND DECOR (Opcional para el look Cyberpunk) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* HEADER HUD */}
            <header className="p-6 border-b border-green-500/20 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-green-400 font-black tracking-[0.3em] uppercase italic text-sm">
                        Analizador de Suministros v4.0
                    </h2>
                    <span className="text-[9px] text-gray-500 font-mono">Neural_Link // Nutri_Chain_Active</span>
                </div>
                <button 
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all group"
                >
                    <span className="group-hover:scale-110 transition-transform">✕</span>
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                
                {/* SECCIÓN 1: ESCANEO POR IA */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-900 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-[#0d0d0d] border border-green-500/20 p-8 rounded-3xl flex flex-col items-center gap-6 transition-all">
                        
                        {/* Indicador de Escaneo Visual */}
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed transition-all duration-700
                            ${isScanning ? 'border-green-400 rotate-180 bg-green-500/20' : 'border-green-500/40 bg-green-500/5'}`}>
                            <span className={`text-4xl transition-transform ${isScanning ? 'scale-125' : 'group-hover:scale-110'}`}>
                                {isScanning ? '⌛' : '📸'}
                            </span>
                        </div>

                        <div className="text-center space-y-1">
                            <h3 className="font-black text-xl tracking-tight">Escaneo Biométrico</h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">
                                Análisis por visión artificial (Gemini Engine)
                            </p>
                        </div>

                        <button 
                            onClick={handleCameraScan}
                            disabled={isScanning}
                            className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-lg
                                ${isScanning ? 'bg-gray-800 text-gray-500' : 'bg-green-600 text-white hover:bg-green-500 active:scale-95 shadow-green-900/20'}`}
                        >
                            {isScanning ? 'Analizando Composición...' : 'Capturar Suministro'}
                        </button>
                    </div>
                </section>

                {/* SECCIÓN 2: CARGA MANUAL */}
                <section 
                    onClick={() => console.log("Abrir Formulario Manual")}
                    className="bg-[#0d0d0d] border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/5 cursor-pointer transition-all active:scale-95"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all">
                            <span className="text-xl group-hover:scale-110 transition-transform">✍️</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold group-hover:text-blue-400 transition-colors">Registro Manual</h4>
                            <p className="text-[9px] text-gray-600 uppercase tracking-tighter">Ingreso de datos tradicional</p>
                        </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-white transition-all mr-2">→</span>
                </section>

                {/* SECCIÓN 3: LOGS RECIENTES */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold italic">
                            Suministros del Ciclo Actual
                        </h3>
                        <div className="h-[1px] flex-1 bg-white/5 ml-4"></div>
                    </div>

                    <div className="space-y-3">
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <div key={log._id} className="bg-[#0f0f0f] border border-gray-900 p-4 rounded-2xl flex justify-between items-center group hover:border-green-500/30 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-gray-200 group-hover:text-white">{log.suministro}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded ${log.source === 'IA' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                {log.source}
                                            </span>
                                            <p className="text-[9px] text-gray-600 font-mono tracking-tighter italic">ID_SCAN_{log._id.substring(0,6)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black font-mono text-green-400 leading-none">{log.bio_marcadores.calorias} <span className="text-[8px] text-gray-600">kcal</span></p>
                                        <p className="text-[9px] text-gray-500 font-mono mt-1">
                                            P:{log.bio_marcadores.proteinas}g | C:{log.bio_marcadores.carbs}g | F:{log.bio_marcadores.fibra}g
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl opacity-30 italic">
                                <span className="text-2xl mb-2">🍽️</span>
                                <p className="text-[10px] uppercase tracking-widest text-center">Esperando sincronización de ingesta...</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* FOOTER DE ESTADO */}
            <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent pointer-events-none">
                <div className="max-w-xs mx-auto text-center">
                    <p className="text-[8px] text-gray-700 uppercase tracking-[0.4em] font-bold">
                        Bio_Sustain_Module // Arca_OS
                    </p>
                </div>
            </footer>
        </main>
    );
}