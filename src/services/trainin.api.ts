import { apiFetch } from '@/lib/api';

export function registerTraining(body: {
        exerciseId: string;
        reps: number;
        weight: number;
        difficulty: number;
        characterId:string
    }) {
    return apiFetch(`/training`, {
        method: 'POST',
        body: JSON.stringify(body ),
    });
}
export function registerDescanso(body: {
        characterId:string;
        restSeconds:number;
    }) {
    return apiFetch(`/training/descanso`, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}