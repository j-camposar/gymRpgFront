import { Exercise, ExerciseReponse } from '@/types/exercise';
import { apiFetch } from '@/lib/api';


export async function getExercises(character_id:string): Promise<ExerciseReponse> {
  return await apiFetch(`/exercise/${character_id}`,  {method: 'GET',  cache: 'no-store'});
}
