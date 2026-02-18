import { CharacterGoal } from '@/types/character';
import * as z from 'zod';

export const registerSchema = z.object({
  nick: z.string().min(3, 'Nick muy corto'),
  edad: z.number().min(10).max(100),
  peso: z.number().min(30).max(300),
  estatura: z.number().min(100).max(250),
  objetivo: z.nativeEnum(CharacterGoal),
});
