'use client';
import ListaExercise from '@/component/exercise/ListaExercise';
import { Exercise } from '@/types/exercise';
import { useState } from 'react';

export default function ExercisesPage() {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    return (<ListaExercise setSelectedExercise={setSelectedExercise} />);
}
