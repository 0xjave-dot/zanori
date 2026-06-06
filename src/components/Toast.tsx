import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      id="toast-notification-banner"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 bg-brand-dark border border-brand-wood/40 text-brand-base rounded-2xl shadow-xl transition-all duration-300 animate-slide-up"
    >
      <div className="h-5 w-5 rounded-full bg-brand-wood text-brand-dark flex items-center justify-center">
        <Check size={12} className="stroke-[3]" />
      </div>
      <span className="text-xs uppercase tracking-widest font-semibold font-sans text-brand-base pr-2.5">
        {message}
      </span>
    </div>
  );
}
