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
export type ListaExerciseProps = {
  setSelectedExercise: (exercise: Exercise) => void;
}; 