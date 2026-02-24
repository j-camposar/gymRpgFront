const GymConfirmModal = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void, }) => {
  return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-[#0a0a0a] border-2 border-red-600/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                <div className="text-center space-y-6">
                    <div className="text-red-500 text-5xl italic font-black uppercase tracking-tighter">
                        ¡Alerta!
                    </div>
                    
                    <p className="text-gray-300 text-sm font-mono leading-relaxed">
                        SISTEMA DETECTÓ SOLICITUD DE CIERRE. <br/>
                        <span className="text-white font-bold">¿FINALIZAR INCURSIÓN Y SINCRONIZAR CON EL ARCA?</span>
                    </p>

                    <div className="flex flex-col gap-3 pt-4">
                        <button 
                            onClick={onConfirm}
                            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-lg transition-all active:scale-95 shadow-[0_5px_20px_rgba(220,38,38,0.4)]"
                        >
                            CONFIRMAR CIERRE
                        </button>
                        
                        <button 
                            onClick={onCancel}
                            className="w-full py-3 bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all rounded-2xl font-bold text-[10px] tracking-widest uppercase"
                        >
                            CANCELAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GymConfirmModal;