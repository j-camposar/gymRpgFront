'use client';

import Progress from "../general/Progress";

export default  function MuscleCard({ muscle }: { muscle: any }) {
  return (
    <div className="muscle-card">
      <div className="muscle-info">
        <h3>{muscle.muscleId.name}</h3>
        <p>Nivel: {muscle.level}</p>

        <Progress label="XP" value={muscle.xp} />
        <Progress label="Fatiga" value={muscle.fatigue} />

      </div>
    </div>
  );
}
