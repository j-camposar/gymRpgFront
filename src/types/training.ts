import { StatsResume } from "./statBar";

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