'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCharacter } from '@/services/character.api';
import { registerSchema } from '@/schema/RegisterCharacter';
import { CharacterGoal } from '@/types/character';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof registerSchema>;

export default function RegisterCharacter() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
        // IMPORTANTE: Asegúrate de que los valores iniciales coincidan con los tipos
        defaultValues: {
            nick: '',
            email: '',
            password: '',
            edad: 18,
            peso: 70,
            estatura: 170
        }
    });

   
    const router = useRouter();
    const onSubmit = async (data: FormData) => {
        console.log("Intentando fetch con datos:", data);
        try {
            const res = await createCharacter(data);
            alert(`¡Personaje ${data.nick} inicializado con éxito!`);
            router.push('/');
        } catch (err: unknown) {
            console.error("Error en el fetch:", err);
            alert(err.message || "Error al conectar con el servidor");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 text-white font-sans">
            <div className="w-full max-w-2xl bg-[#111] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                
                <div className="bg-blue-600 p-6 text-center">
                    <h2 className="text-2xl font-black italic uppercase">Crear Avatar</h2>
                </div>

                {/* handleSubmit recibe dos funciones: una para éxito y otra para error */}
                <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Nickname */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Identificador</label>
                            <input {...register('nick')} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="Nombre de guerrero"/>
                            {errors.nick && <p className="text-red-500 text-[9px] mt-1">{errors.nick.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Email</label>
                            <input type="email" {...register('email')} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="atleta@rpg.com"/>
                            {errors.email && <p className="text-red-500 text-[9px] mt-1">{errors.email.message}</p>}
                        </div>

                        {/* PASSWORD (Faltaba en tu código anterior) */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Código de Acceso (Password)</label>
                            <input type="password" {...register('password')} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="Mínimo 6 caracteres"/>
                            {errors.password && <p className="text-red-500 text-[9px] mt-1">{errors.password.message}</p>}
                        </div>

                        {/* sexo */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">
                                Identidad // Sexo
                            </label>
                            <div className="relative">
                                <select 
                                    {...register('sexo')} 
                                    className={`w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none appearance-none`}
                                >
                                    <option value="" className="text-gray-700">Seleccionar...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                
                                {/* Flecha decorativa personalizada */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 text-[10px]">
                                    ▼
                                </div>
                            </div>
                            {errors.sexo && (
                                <p className="text-red-500 text-[9px] mt-1 uppercase italic animate-pulse">
                                    {errors.sexo.message}
                                </p>
                            )}
                        </div>
                        {/* Peso */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Masa Corporal (KG)</label>
                            <input 
                                type="number" 
                                {...register('peso', { valueAsNumber: true })} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                            />
                            {errors.peso && <p className="text-red-500 text-[10px] mt-1">{errors.peso.message}</p>}
                        </div>

                        {/* Estatura */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Estatura (CM)</label>
                            <input 
                                type="number" 
                                {...register('estatura', { valueAsNumber: true })} 
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                            />
                            {errors.estatura && <p className="text-red-500 text-[10px] mt-1">{errors.estatura.message}</p>}
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Edad</label>
                            <input type="number" {...register('edad', { valueAsNumber: true })} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block tracking-widest">Objetivo</label>
                            <select {...register('objetivo')} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none appearance-none">
                                <option value="">Seleccionar...</option>
                                {Object.values(CharacterGoal).map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                            {errors.objetivo && <p className="text-red-500 text-[9px] mt-1 italic uppercase">Requerido</p>}
                        </div>
                        
                        {/* Peso y Estatura... (Sigue tu lógica anterior) */}

                    </div>

                    <button 
                        disabled={isSubmitting} 
                        type="submit"
                        className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 mt-4"
                    >
                        {isSubmitting ? 'Inyectando ADN...' : 'Inicializar Avatar'}
                    </button>
                </form>
            </div>
        </div>
    );
}