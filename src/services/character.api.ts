import { CreateCharacterDto } from '../types/character';
import { apiFetch } from '@/lib/api';

export async function createCharacter(data: CreateCharacterDto) {
  return await apiFetch(`/characters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

}
export async function viewMucleCharacter(idUser:string){
    return await apiFetch(`/characters/muscle/${idUser}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

}
