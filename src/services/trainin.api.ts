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

export function getSessionLogs(  sessionId:string){
    return apiFetch(`/training/session-logs/${sessionId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}
export function buscarEntrenamientos(start:string, end:string,character_id:string){
    return apiFetch(`/training/history/${start}/${end}/${character_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}       

export function getSessionsHistroy(session_id:string){
    return apiFetch(`/training/history/sessions/${session_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

export function getEjercicios(trainingId:string, exercise_id:string, character_id:string){
    return apiFetch(`/training/history/exercise/${character_id}/${exercise_id}/${trainingId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}