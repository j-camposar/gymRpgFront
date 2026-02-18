import { StatsResume } from "./statBar";

export type TrainingFormProps = {
  onClose: () => void;
  character_id: string;
  setRefreshTrigger: () => void;
  // Ahora onSuccess espera recibir los datos del entrenamiento
  onSuccess: (data: StatsResume) => void;
};