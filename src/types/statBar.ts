export interface StatBarProps {
  character_id: string | number;
  refreshTrigger?: boolean | number; // Para forzar actualización desde el padre
}
export interface StateUser{
    nombre :string;
    valor : string ;
    max :string;
}
export interface EstadoCharacter {
    nick: string;
    level: number;
    coins: number;
    fatiga: number;
    xp: number;
    xpNeeded: number;
    hipertrofia:number;
    porcentajeProgreso: number;
}

export interface EstadoActual {
    level: number;
    fatiga: number;
    xp: number;
    xpNeeded: number;
    label: string; // Ej: "Bíceps"
    hipertrofia: number;
    nick:string;
    coins:number;
}

export interface StatsResponse {
    estadoCharacter: EstadoCharacter;
    estadoActual: EstadoActual[];
}
export interface StatsBarProps {
    label : string;
    value: number;
    max: number;
    color: string;
}
export interface StatsResume{
    data:StatResumeData ;
    onClose:() =>void;
}
interface StatResumeData{
    totalXp:string;
    leveledUpMuscles:[
    {
        name:string;
        level:string;
        levelUp:boolean
    }]
}
export interface BodyMapProps {
  /** Lista de IDs de músculos a iluminar (ej: ['chest', 'back_upper']) */
  activeMuscles: string[]; 
  /** Color de la iluminación (opcional, por defecto azul sistema) */
  highlightColor?: string;
  /** Clase de Tailwind para el tamaño (ej: 'w-64') */
  className?: string;
}