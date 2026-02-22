export interface Mission {
    id: string;
    code: string;
    name: string;
    description: string;
    type: 'DAILY' | 'WEEKLY';
    rewardCoins: number;
    progress: number;
    targetXp: number;
    completed: boolean;
    claimed: boolean;
}
export interface reponseMisions{
    xpGained:number;
}