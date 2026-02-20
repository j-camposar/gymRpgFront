'use client'
import { viewMucleCharacter } from '@/services/character.api';
import { useEffect, useState, useCallback } from 'react';
import MuscleCard from '@/component/muscle/MuscleCard'
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';
// Importa la interfaz correcta desde tus types

export default function ViewMuscleCharacter() {
    const [muscles, setMuscles] = useState<Muscle[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Obtenemos el usuario del estado global
    const user = useSelector((state: RootState) => state.auth.user);
    const idUser = user?.id || "";

    // 1. Usamos useCallback para que la función sea estable y no dispare el useEffect infinitamente
    const loadMuscles = useCallback(async () => {
        if (!idUser) return; // Evitamos disparar si no hay ID
        
        try {
            setLoading(true);
            const response = await viewMucleCharacter(idUser) as Muscle[];
            setMuscles(response);
        } catch (err: unknown) { 
            console.error("Error cargando músculos:", err);
            if (err instanceof Error) {
                alert(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [idUser]); // Solo cambia si cambia el idUser

    useEffect(() => {
        loadMuscles();
    }, [loadMuscles]); // Ahora loadMuscles es una dependencia válida y segura

    if (loading) return (
        <div className="flex justify-center p-10 bg-[#0a0a0a]">
            <p className="text-blue-500 font-mono animate-pulse uppercase tracking-widest">Sincronizando Músculos...</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[#0a0a0a]">
            {muscles.map((m) => (
                // Asegúrate de que m._id exista en tu interfaz Muscle
                <MuscleCard key={m._id } muscle={m} />
            ))}
        </div>
    );
}