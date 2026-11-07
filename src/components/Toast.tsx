import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-sm">
      <div
        className={`px-4 py-3 rounded-xl shadow-lg border text-xs font-medium flex items-center gap-2.5 backdrop-blur-md ${
          toast.type === 'success'
            ? 'bg-[#2C241E] text-white border-[#3D332B]'
            : toast.type === 'warning'
            ? 'bg-[#B91C1C] text-white border-[#991B1B]'
            : 'bg-[#9C5B16] text-white border-[#7C4812]'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />}
        {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-white shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-white shrink-0" />}
        <span className="flex-1 leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
