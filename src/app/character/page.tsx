'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createCharacter } from '@/services/character.api';
import { registerSchema } from '@/schema/RegisterCharacter';
import { CharacterGoal } from '@/types/character';
import { useState } from 'react';

type FormData = z.infer<typeof registerSchema>;

export default function RegisterCharacter() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const [character, setCharacter] = useState<any | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await createCharacter(data);
            setCharacter(res);
            alert(`¡Personaje ${data.nick} inicializado con éxito!`);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white">
            <div className="w-full max-w-2xl bg-[#111] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                
                {/* Header Estilo RPG */}
                <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Crear Avatar</h2>
                        <p className="text-blue-200 text-xs uppercase tracking-widest mt-1">Define tus Atributos de Origen</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Nickname */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Identificador (NICK)</label>
                            <input 
                                placeholder="Escribe tu nombre de guerrero..." 
                                {...register('nick')} 
                                className={`w-full bg-[#0a0a0a] border ${errors.nick ? 'border-red-500' : 'border-gray-800'} rounded-xl p-4 focus:border-blue-500 outline-none transition-all`}
                            />
                            {errors.nick && <p className="text-red-500 text-[10px] mt-1 uppercase italic">{errors.nick.message}</p>}
                        </div>

                        {/* Edad */}
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Edad</label>
                            <input 
                                type="number" 
                                {...register('edad', { valueAsNumber: true })} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 focus:border-blue-500 outline-none"
                            />
                            {errors.edad && <p className="text-red-500 text-[10px] mt-1">{errors.edad.message}</p>}
                        </div>

                        {/* Objetivo Selector */}
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Objetivo Principal</label>
                            <select 
                                {...register('objetivo')} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 focus:border-blue-500 outline-none appearance-none"
                            >
                                <option value="">Selecciona meta...</option>
                                {Object.values(CharacterGoal).map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                            {errors.objetivo && <p className="text-red-500 text-[10px] mt-1">Campo requerido</p>}
                        </div>

                        {/* Peso */}
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Masa Corporal (KG)</label>
                            <input 
                                type="number" 
                                {...register('peso', { valueAsNumber: true })} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 focus:border-blue-500 outline-none"
                            />
                            {errors.peso && <p className="text-red-500 text-[10px] mt-1">{errors.peso.message}</p>}
                        </div>

                        {/* Estatura */}
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Estatura (CM)</label>
                            <input 
                                type="number" 
                                {...register('estatura', { valueAsNumber: true })} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 focus:border-blue-500 outline-none"
                            />
                            {errors.estatura && <p className="text-red-500 text-[10px] mt-1">{errors.estatura.message}</p>}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            disabled={isSubmitting} 
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        >
                            {isSubmitting ? 'Sincronizando...' : 'Inicializar Avatar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}