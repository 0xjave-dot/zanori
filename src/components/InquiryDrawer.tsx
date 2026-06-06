import { X, Trash2, ArrowRight, CornerDownRight, Check, Bed, Sofa, Layers, Columns, Archive } from 'lucide-react';
import { InquiryItem, Product } from '../types';
import { useState } from 'react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onProceedToInquiryForm: () => void;
}

export default function InquiryDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToInquiryForm
}: InquiryDrawerProps) {
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const totalNaira = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const formatNairaVal = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handlesSubmission = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onProceedToInquiryForm();
        onClose();
        // Scroll to contact form
        const el = document.getElementById('contact-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
    }, 1800);
  };

  const getFurnitureIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed':
        return <Bed className="w-5 h-5 text-brand-dark" />;
      case 'sofa':
        return <Sofa className="w-5 h-5 text-brand-dark" />;
      case 'shelving':
        return <Layers className="w-5 h-5 text-brand-dark" />;
      case 'table':
        return <Columns className="w-5 h-5 text-brand-dark" />;
      case 'storage':
        return <Archive className="w-5 h-5 text-brand-dark" />;
      default:
        return <Layers className="w-5 h-5 text-brand-dark" />;
    }
  };

  return (
    <div
      id="inquiry-drawer-backdrop"
      className="fixed inset-0 z-50 bg-brand-dark/50 backdrop-blur-sm flex justify-end transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="inquiry-drawer"
        className="w-full max-w-md bg-brand-base h-full shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-slide-left relative border-l border-brand-wood/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-brand-wood/20">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-bark font-bold">
              ESTIMATE DRAFT
            </span>
            <h3 className="font-serif text-2xl font-light text-brand-dark">
              Inquiry List ({items.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-dark hover:bg-brand-warm rounded-full transition-all cursor-pointer"
            aria-label="Close inquiry drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-grow py-6 overflow-y-auto space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <span className="font-serif text-lg italic text-brand-muted block">
                Your inquiry list is empty.
              </span>
              <p className="text-xs text-brand-muted leading-relaxed max-w-xs mx-auto font-light">
                Browse our curated Retail collection in the Shop section above, and append items you wish to discuss.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-brand-dark text-xs uppercase tracking-wider rounded-full hover:bg-brand-dark hover:text-white transition-all cursor-pointer"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-3.5 bg-brand-warm/40 border border-brand-wood/10 rounded-2xl gap-4 transition-all hover:bg-brand-warm/75"
              >
                {/* Item Icon backplate */}
                <div
                  className="rounded-xl h-12 w-12 flex items-center justify-center border border-brand-wood/20"
                  style={{ background: item.product.imageBg }}
                >
                  {getFurnitureIcon(item.product.iconType)}
                </div>

                {/* Meta */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-serif text-md text-brand-dark truncate leading-tight">
                    {item.product.name}
                  </h4>
                  <span className="text-[9px] uppercase tracking-wider text-brand-muted font-light">
                    {item.product.category} &bull; {formatNairaVal(item.product.price)}
                  </span>
                </div>

                {/* Controllers */}
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center bg-white border border-brand-wood/20 rounded-full py-0.5 px-2.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-xs font-mono text-brand-muted hover:text-brand-dark px-1 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-medium mx-1.5 min-w-[12px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="text-xs font-mono text-brand-muted hover:text-brand-dark px-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-500/70 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                    aria-label="Delete item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-brand-wood/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-brand-muted font-medium">
                ESTIMATED ACQUISITION:
              </span>
              <span className="text-lg font-semibold text-brand-dark font-sans tracking-wide">
                {formatNairaVal(totalNaira)}
              </span>
            </div>

            <p className="text-[10px] text-brand-muted leading-relaxed font-light">
              This triggers a direct consultation thread. Pricing figures exclude custom freight and installation coordinates within Nigeria.
            </p>

            <div className="space-y-2">
              <button
                type="button"
                disabled={isSending || success}
                onClick={handlesSubmission}
                className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-brand-dark hover:bg-brand-wood text-brand-base hover:text-brand-dark rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSending ? (
                  <span>Formatting Inquiry...</span>
                ) : success ? (
                  <span className="flex items-center space-x-1">
                    <Check size={14} /> <span>Inquiry Generated ✓</span>
                  </span>
                ) : (
                  <>
                    <span>Proceed to submit inquiry</span>
                    <ArrowRight size={12} />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="w-full text-center py-2 text-[10px] uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
              >
                Continue looking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
