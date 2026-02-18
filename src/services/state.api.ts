import { apiFetch } from '@/lib/api';


export async function getStat(data: {character_id:string}){
  return await apiFetch(`/state/${data.character_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
}
