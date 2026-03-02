import { HistorySeries } from "./training";

export interface Exercise {
    _id: string;
    name: string;
    muscles: {
        muscleId: {
            name:string, 
            code:string
        };
    multiplier: number;
  }[];
    difficulty: number;
}
export interface ExerciseReponse {
    todos:Exercise[],
    ultimoExerciseId:HistorySeries
}
export type ListaExerciseProps = {
    setSelectedExercise: (exercise: Exercise) => void;
    setUltimoRegistro: (ultimoRegistro: HistorySeries | null) => void
}; 