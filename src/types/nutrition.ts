export interface NutritionLog {
    _id: string;
    suministro: string;
    bio_marcadores: {
        calorias: number;
        proteinas: number;
        carbs: number;
        grasas: number;
        fibra: number;
    };
    source: 'IA' | 'Manual';
}