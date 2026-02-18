import { Exercise } from '@/types/exercise';
import { apiFetch } from '@/lib/api';


export async function getExercises(): Promise<Exercise[]> {
  return await apiFetch(`/exercise`,  {method: 'GET',  cache: 'no-store'});
}
