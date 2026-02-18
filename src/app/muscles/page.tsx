'use client'
import { viewMucleCharacter } from '@/services/character.api';
import { useEffect, useState } from 'react';
import MuscleCard from '@/component/muscle/MuscleCard'
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';



export default function ViewMuscleCharacter() {
    const [muscles, setMuscles] = useState<Muscle[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const idUser = user?.id || "";
    useEffect(() => {
        const loadMuscles = async () => {
            try {
                const response = await viewMucleCharacter(idUser) as Muscle[];
                setMuscles(response);
            } catch (err: any) {
                console.log(err)
                alert(err.message);
            }finally {
                setLoading(false);
            }
        };

        loadMuscles();
    }, []);

    if (loading) return <p>Cargando músculos...</p>;

    return (
        <div className="muscle-grid">
        {muscles.map((m) => (
            <MuscleCard key={m._id} muscle={m} />
        ))}
        </div>
    );
}
