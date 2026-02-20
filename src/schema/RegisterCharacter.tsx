import { CharacterGoal, Sexo } from '@/types/character';
import * as z from 'zod';

export const registerSchema = z.object({
  nick: z.string()
    .min(3, 'El Nick debe tener al menos 3 caracteres')
    .max(15, 'Nick demasiado largo'),
    
  email: z.string()
    .min(1, 'El email es obligatorio') 
    .email('Formato de email inválido (ej: atleta@rpg.com)'),
    
  password: z.string()
    .min(6, 'El código de acceso debe tener al menos 6 caracteres')
    .max(50, 'Código demasiado largo'),

  edad: z.number()
    .min(10, 'Edad mínima: 10 años')
    .max(100, 'Edad máxima: 100 años'),
    
  peso: z.number()
    .min(30, 'Masa insuficiente')
    .max(300, 'Masa fuera de rango'),
    
  estatura: z.number()
    .min(100, 'Estatura mínima: 100cm')
    .max(250, 'Estatura máxima: 250cm'),
    
    objetivo: z.nativeEnum(CharacterGoal),
    sexo: z.nativeEnum(Sexo),
});