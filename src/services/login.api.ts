import { apiFetch } from '@/lib/api';


export async function login(data: {email:string; password:string;}){
  return await apiFetch(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
