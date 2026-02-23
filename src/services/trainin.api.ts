import { apiFetch } from '@/lib/api';

export function registerTraining(body: {
        exerciseId: string;
        reps: number;
        weight: number;
        difficulty: number;
        characterId:string;
        sessionId:string
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
export function createTraining(
        characterId:string
        ) {
    return apiFetch(`/training/crearEntrenamiento`, {
        method: 'POST',
        body: JSON.stringify({"characterId":characterId}),
    });
}
export function finishWorkOut(
        characterId:string,
        sessionId:string
    ) {
    return apiFetch(`/training/terminarEntrenamiento`, {
        method: 'POST',
        body: JSON.stringify({"characterId":characterId,"sessionId":sessionId}),
    });
}