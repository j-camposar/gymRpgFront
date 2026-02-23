'use client';
import { analyzeBiometrics } from '@/services/character.api';
import { RootState } from '@/store/store';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';

export default function NeuralScan() {
    const user = useSelector((state: RootState) => state.auth.user) as { id: string } | null;
    const character_id = user?.id || "";
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState("");
    const [isScanning, setIsScanning] = useState(false);

   const capture = useCallback(async () => { // Hacemos la función async
        const imageSrc = webcamRef.current?.getScreenshot();
        
        if (imageSrc) {
            setImgSrc(imageSrc); // Para mostrarla en la UI
            
            // INICIO DEL ESCANEO
            setIsScanning(true);
            console.log("Iniciando análisis para ID:", character_id);

            try {
                // Pasamos 'imageSrc' directamente, NO 'imgSrc' del estado
                const results = await analyzeBiometrics(imageSrc, character_id);
                alert(results);
                console.log("Resultados del Arca:", results);
            } catch (error) {
                console.error("Error en el escaneo:", error);
            } finally {
                // Terminamos el efecto visual después de un pequeño delay
                setTimeout(() => setIsScanning(false), 2000);
            }
        }
    }, [webcamRef, character_id]);

    const simulateScanning =async () => {
        setIsScanning(true);
        console.log(character_id)
        const results = await analyzeBiometrics(imgSrc, character_id);
        console.log("Resultados del Arca:", results);
        setTimeout(() => setIsScanning(false), 3000);
    };


    return (
        <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', padding: '20px' }}>
            <h2 style={{ color: '#3b82f6', fontWeight: '900', letterSpacing: '2px' }}>NEURAL_SCAN V3</h2>
            
            <div className="scanner-container">
                {!imgSrc ? (
                    <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam-view"
                    videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user" 
                    }}
                    onUserMediaError={(error) => console.log("Error de cámara:", error)}
                />
                ) : (
                    <img src={imgSrc} className="webcam-view" alt="Captura" />
                )}
                {/* 2. SILUETA DE GUÍA (SVG) */}
               {/* SILUETA CUERPO COMPLETO - ESTILO NEÓN */}
                {!imgSrc && (
                    <div className="silhouette-overlay">
                        <svg viewBox="0 0 200 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Silueta optimizada para ocupar el frame */}
                            <path 
                                d="M100 20C 112 20 122 32 122 45C 122 58 112 70 100 70C 88 70 78 58 78 45C 78 32 88 20 100 20 M75 75L 125 75L 155 105L 165 180L 150 195L 135 145L 135 240L 125 430 L 105 430 L 100 280 L 95 430 L 75 430 L 65 240 L 65 145 L 50 195 L 35 180 L 45 105 Z" 
                                className="neon-path"
                            />
                            {/* Línea de eje central */}
                            <line x1="100" y1="20" x2="100" y2="430" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.3" />
                            
                            {/* Esquinas de Calibración */}
                            <path d="M10 10 L 40 10 M 10 10 L 10 40" stroke="#3b82f6" strokeWidth="2" />
                            <path d="M160 10 L 190 10 M 190 10 L 190 40" stroke="#3b82f6" strokeWidth="2" />
                            <path d="M10 440 L 40 440 M 10 440 L 10 410" stroke="#3b82f6" strokeWidth="2" />
                            <path d="M190 440 L 160 440 M 190 440 L 190 410" stroke="#3b82f6" strokeWidth="2" />
                        </svg>
                    </div>
                )}
                {isScanning && (
                    <>
                        <div className="scan-line-v3"></div>
                        <div className="scan-glitch-overlay"></div>
                    </>
                )}
            </div>

            <button 
                onClick={imgSrc ? () => setImgSrc("") : capture}
                style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#3b82f6',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                {imgSrc ? 'REPETIR ESCANEO' : 'INICIAR ANÁLISIS'}
            </button>
        </div>
    );
}