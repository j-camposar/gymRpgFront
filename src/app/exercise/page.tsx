'use client';
import ListaExercise from '@/component/exercise/ListaExercise';
import { Exercise } from '@/types/exercise';
import { HistorySeries } from '@/types/training';
import { useState } from 'react';

export default function ExercisesPage() {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [ultimoRegistro, setUltimoRegistro] = useState<HistorySeries | null>(null);
    return (<ListaExercise setSelectedExercise={setSelectedExercise} setUltimoRegistro={setUltimoRegistro}  />);
}
