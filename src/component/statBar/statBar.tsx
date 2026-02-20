import { StatsBarProps } from "@/types/statBar";
import React, { useEffect, useState, useRef } from "react";

const StatBar: React.FC<StatsBarProps> = ({ label, value, max, color }) => {
    const [reduction, setReduction] = useState<number | null>(null);
    const [flash, setFlash] = useState(false);
    const prevValueRef = useRef(value);
    
    const isFatiga = label.includes("Fatiga") || label.includes("FTG");
    const tipo = isFatiga ? 100 : max;
    const percentage = Math.min((value / tipo) * 100, 100);

    useEffect(() => {
        const prev = prevValueRef.current;
        const current = value;

        // 1. Detectar si el valor bajó
        if (prev > current && isFatiga) {
            const diff = Math.round(prev - current);
            
            // Disparar número flotante
            setReduction(diff);
            // Disparar brillo de la barra
            setFlash(true);

            console.log(`Reducción detectada en ${label}: -${diff}`);

            const timer = setTimeout(() => {
                setReduction(null);
                setFlash(false);
            }, 1000);
            
            // IMPORTANTE: Actualizamos la referencia aquí
            prevValueRef.current = current;
            return () => clearTimeout(timer);
        }

        // 2. Si el valor subió (entrenamiento), actualizamos referencia sin efectos
        if (current > prev) {
            prevValueRef.current = current;
        }
    }, [value, isFatiga, label]);

    return (
        <div className="flex items-start gap-3 mb-2 group relative">
            <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1 relative">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {label}
                    </span>
                    
                    <div className="flex items-center gap-2 relative">
                        {reduction !== null && (
                            <span 
                                key={Date.now()} 
                                className="absolute font-black text-[#2ecc71] text-sm z-[999]"
                                style={{
                                    right: '0',
                                    top: '-20px',
                                    textShadow: '0 0 10px rgba(46, 204, 113, 0.5)',
                                    animation: 'floatUp 1s ease-out forwards'
                                }}
                            >
                                -{reduction}
                            </span>
                        )}
                        
                        <span className="text-[14px] font-mono text-gray-500">
                            {Math.round(value)} <span className="text-gray-700">/</span> {tipo}
                        </span>
                    </div>
                </div>

                {/* Barra de Progreso con efecto Flash */}
                <div className="w-full h-[8px] bg-gray-900 rounded-full overflow-hidden border border-gray-800/50">
                    <div
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: color,
                            boxShadow: flash ? `0 0 20px ${color}` : `0 0 10px ${color}44`,
                            filter: flash ? 'brightness(1.5)' : 'none'
                        }}
                        className="h-full transition-all duration-500 ease-out"
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(-30px); opacity: 0; }
                }
            `}} />
        </div>
    );
};
export default StatBar;