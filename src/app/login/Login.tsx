'use client';
import { login } from "@/services/login.api";
import { loginSuccess } from "@/store/slices/authSlice";
import { LoginResponse } from "@/types/login";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("1. Enviando credenciales...");
            const data = await login({ email, password }) as LoginResponse;
            console.log("2. Respuesta recibida:", data);

            dispatch(loginSuccess({
                id: data.user.id,
                email: data.user.email,
                token: data.access_token,
            }));
            
            console.log("3. Dispatch exitoso, redirigiendo...");
            router.push("/training");
        } catch (err) {
            console.error("Error en el catch:", err);
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
                            Gym<span className="text-blue-500">RPG</span>
                        </h2>
                        <p className="text-gray-500 text-xs tracking-widest uppercase">Identificación de Atleta Requerida</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">Email_Address</label>
                            <input
                                type="email"
                                placeholder="atleta@rpg.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">Access_Code</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] active:scale-95 disabled:opacity-50"
                            >
                                <span className="relative z-10">
                                    {loading ? "Autenticando..." : "Entrar a la Terminal"}
                                </span>
                            </button>

                            {/* BOTÓN DE REGISTRO / CREAR PERSONAJE */}
                            <button
                                type="button"
                                onClick={() => router.push("/character")}
                                className="w-full py-4 bg-transparent border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-400 hover:text-blue-400 font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95 text-xs"
                            >
                                Nuevo Atleta // Crear Personaje
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg animate-shake">
                                <p className="text-red-500 text-xs text-center font-bold uppercase tracking-tighter">{error}</p>
                            </div>
                        )}
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                            v2.0.26 // Secure Connection Established
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;