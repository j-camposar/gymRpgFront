import { apiFetch } from '@/lib/api';

// export function getActiveMissions(characterId: string) {
//   return apiFetch<any[]>(`/misions/active?characterId=${characterId}`);
// }

export function claimMission(missionId: string, characterId: string) {
  return apiFetch(`/misions/${missionId}/claim`, {
    method: 'POST',
    body: JSON.stringify({ characterId }),
  });
}