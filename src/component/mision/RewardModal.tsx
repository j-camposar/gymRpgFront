// component/character/RewardModal.tsx
'use client';

export default function RewardModal({ 
  reward, 
  onClose 
}: { 
  reward: { xp: number, coins: number, name: string }, 
  onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-[#0d0d0d] border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="bg-yellow-500 p-2 text-center">
          <h3 className="text-black font-black uppercase text-xs tracking-widest">
            Protocolo_Completado
          </h3>
        </div>

        <div className="p-8 text-center space-y-6">
          <p className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
            Misión: {reward.name}
          </p>
          
          <div className="flex justify-around items-center">
            <div className="text-center">
              <span className="block text-3xl font-black text-white italic">+{reward.xp}</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">EXP_Gained</span>
            </div>
            <div className="h-12 w-[1px] bg-gray-800"></div>
            <div className="text-center">
              <span className="block text-3xl font-black text-yellow-500 italic">+{reward.coins}</span>
              <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest">Core_Coins</span>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full py-3 bg-white hover:bg-gray-200 text-black font-black uppercase text-xs tracking-widest rounded-lg transition-all active:scale-95"
            >
              Aceptar_Transferencia
            </button>
          </div>
        </div>
        
        <div className="p-2 border-t border-gray-900 bg-black/50">
          <p className="text-[8px] text-gray-700 font-mono text-center italic">
            Neural_Link_Update_Success // Carahue_Sector_Synced
          </p>
        </div>
      </div>
    </div>
  );
}