export interface CharacterId{
    character_id: string ; 
}

export enum CharacterGoal {
  RECOMPOSICION = 'RECOMPOSICION',
  POWERLIFTING = 'POWERLIFTING',
  BAJAR_PESO = 'BAJAR_PESO',
  AUMENTAR_FUERZA = 'AUMENTAR_FUERZA',
}

export interface CreateCharacterDto {
  nick: string;
  edad: number;
  peso: number;
  estatura: number;
  objetivo: CharacterGoal;
}
