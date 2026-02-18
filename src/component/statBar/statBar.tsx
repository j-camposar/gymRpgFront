import { StatsBarProps } from "@/types/statBar";
import React from "react";

const StatBar: React.FC<StatsBarProps> = ({
  label,
  value,
  max,
  color,
}) => {
    const tipo= label=="Fatiga"?100:max;
    const percentage = Math.min((value / tipo) * 100, 100);

    return (
        <div className="flex items-start gap-3 mb-4 group">
            {/* Información y Barras */}
            <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[15px] text-gray-400 font-bold uppercase tracking-widest">
                        {label}
                    </span>
                    <span className="text-[20px] font-mono text-gray-500">
                        {Math.round(value)} <span className="text-gray-700">/</span> {tipo}
                    </span>
                </div>

                {/* Barra de Progreso Mini */}
                <div className="w-full h-[12px] bg-gray-900 rounded-full overflow-hidden border border-gray-800/50">
                    <div
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}44`
                        }}
                        className="h-full transition-all duration-500 ease-out"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatBar;
