'use client';

import { claimMission, getActiveMissions } from '@/services/mision.api';
import { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import { RootState } from '@/store/store';


export default function MissionsPage() {
  const [missions, setMissions] = useState<any[]>([]);

    const user = useSelector((state: RootState) => state.auth.user);
    const CHARACTER_ID = user?.id || "";
    useEffect(() => {
        getActiveMissions(CHARACTER_ID).then(setMissions);
    }, []);

    return (
        <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Misiones</h1>

        {missions.map((m) => (
            <div key={m._id} className="border p-4 mb-3 rounded">
            <h2 className="font-semibold">{m.name}</h2>
            <p>{m.description}</p>
            <p>Progreso: {m.progress}</p>

            {m.completed && !m.claimed && (
                <button
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                onClick={() =>
                    claimMission(m._id, CHARACTER_ID)
                }
                >
                Reclamar recompensa 💰
                </button>
            )}
            </div>
        ))}
        </main>
    );
}
