import { apiFetch } from '@/lib/api';
import { Mission } from '@/types/mision';

export function getMisionesActivas(characterId: string) {
  return apiFetch<Mission[]>(`/misions/active?characterId=${characterId}`);
}

export function reclamarMision(missionId: string, characterId: string) {
  return apiFetch(`/misions/${missionId}/claim`, {
    method: 'POST',
    body: JSON.stringify({ characterId }),
  });
}
