import { EstadoActual, EstadoCharacter, StatsResponse } from "@/types/statBar";
import CharacterHeader from "../character/CharacterHeader"
import MuscleStats from "../character/MuscleStats"
import { useEffect, useState } from "react";
import { getStat } from "@/services/state.api";

const PlnatillaState=({ character_id, refreshTrigger }: { character_id: string, refreshTrigger: boolean }) => {
      const [perfil, setPerfil] = useState<EstadoCharacter | null>(null);
        const [stats, setStats] = useState<EstadoActual[]>([]);
        const [loading, setLoading] = useState(true);
        
        
        const fetchData = async () => {
            if (!character_id) return;
            try {
            const data = await getStat({ character_id }) as StatsResponse;
            const estadoActual=data.estadoActual;
            setStats([...(estadoActual?.map((item: EstadoActual) => ({ ...item })) || [])]);
            setPerfil(data.estadoCharacter);
            } catch (error) {
            console.error("Error:", error);
            } finally {
            setLoading(false);
            }
        };

        useEffect(() => {
            fetchData();
        }, [character_id, refreshTrigger]);

        if (loading) return (
            <div className="flex flex-col items-center justify-center p-10 h-full bg-[#050505]">
            <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-500 font-mono text-[10px] tracking-[0.2em] animate-pulse">SCANNING...</p>
            </div>
        );

    return (
        <>
            <div className="flex-none">
                <CharacterHeader perfil={perfil} />
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <MuscleStats stats={stats} />
            </div>
        </>
    )
}
export default PlnatillaState;