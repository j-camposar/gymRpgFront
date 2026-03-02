import { StatsResume } from "./statBar";
import {Exercise} from '@/types/exercise'
 
export type TrainingFormProps = {
  onClose: () => void;
  character_id: string;
  sessionId:string
  setRefreshTrigger: () => void;
  // Ahora onSuccess espera recibir los datos del entrenamiento
  onSuccess: (data: StatsResume) => void;
};
export interface Log {
  _id: string;
  exerciseName: string; // Asegúrate de traer el nombre desde el backend
  weight: number;
  reps: number;
  totalXp: number;
  createdAt: string;
  difficulty:number;
  calories:number;
}
export interface HistorySeries {
    weight: number; 
    reps: number;
    id:string;
    progreso:string;
    exerciseId:string;
    difficulty:number
}

export interface HistoryExercise {
    nombre: string;
    cargaMax: number;
    descanso: number;
    estimate1RM:number;
    seriesCount: number; // Array dinámico de series
    calorias:number;
    faigaAcumulada:number;
    TotalXp:number;
    exercise_id:string;
    id:string;
    musculos: {
            nombre:string, 
        }[]
}

export interface HistoryTraining {
    id: string;
    nombre: string;
    fecha: string; // Formato ISO recomendado para date-fns
    calorias: number;
    pesoTotal: number;
    horaInicio: string;
    horaFin: string;
    fatiga: number;
    ejercicios: HistoryExercise[]; // Array dinámico de ejercicios
}

