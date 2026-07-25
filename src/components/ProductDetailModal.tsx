import { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddProductToInquiry: (product: Product) => void;
  onOpenGiftCheckout: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddProductToInquiry,
  onOpenGiftCheckout,
}: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveImage(product?.images?.[0] ?? '');
  }, [product]);

  const formatNaira = (value: number) => new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);

  const galleryImages = useMemo(() => product?.images?.filter(Boolean) ?? [], [product]);

  const handleInquiry = () => {
    if (!product) return;

    onAddProductToInquiry(product);

    if (typeof window === 'undefined') return;

    const productLink = `${window.location.origin}/#/shop?product=${encodeURIComponent(product.id)}`;
    const message = `Hello Zanori Spaces! I'm interested in ${product.name}. Please share availability, pricing, and delivery details for this piece. Product link: ${productLink}`;
    const whatsappUrl = `https://wa.me/2349130377554?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/80 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-brand-wood/20 bg-brand-base shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-brand-wood/20 bg-brand-base/90 p-2 text-brand-dark transition hover:bg-brand-warm"
          aria-label="Close product details"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-brand-warm/50 p-6 md:min-h-[480px]">
            {galleryImages.length > 0 ? (
              <>
                <img
                  src={activeImage || galleryImages[0]}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`h-16 w-24 overflow-hidden rounded-xl border transition ${activeImage === image ? 'border-white/90' : 'border-white/30 opacity-80'}`}
                      >
                        <img src={image} alt={`${product.name} preview ${index + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0" style={{ background: product.imageBg }} />
            )}

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="rounded-full bg-brand-bark px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-base">
                    New In
                  </span>
                )}
              </div>

              <div className="space-y-2 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-wood/90">Studio signature piece</p>
                <h3 className="font-serif text-3xl font-light leading-tight">{product.name}</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-brand-warm/35 p-6 md:p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.24em] text-brand-bark">Crafted for lasting presence</p>
                <h4 className="font-serif text-2xl font-light text-brand-dark">{product.name}</h4>
                {product.brand && <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">{product.brand}</p>}
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-brand-muted">Starting at</p>
                  <p className="text-2xl font-semibold text-brand-dark">{formatNaira(product.price)}</p>
                </div>
                {product.salePrice && product.retailPrice && product.salePrice < product.retailPrice && (
                  <p className="text-sm text-brand-muted line-through">{formatNaira(product.retailPrice)}</p>
                )}
              </div>

              <div className="space-y-3 text-sm text-brand-muted">
                {product.description && <p className="leading-relaxed">{product.description}</p>}
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.dimensions && (
                    <div className="rounded-2xl border border-brand-wood/15 bg-brand-base/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bark">Dimensions</p>
                      <p className="mt-1 text-sm text-brand-dark">{product.dimensions}</p>
                    </div>
                  )}
                  {product.materials && product.materials.length > 0 && (
                    <div className="rounded-2xl border border-brand-wood/15 bg-brand-base/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bark">Materials</p>
                      <p className="mt-1 text-sm text-brand-dark">{product.materials.join(' · ')}</p>
                    </div>
                  )}
                </div>
                {product.colours && product.colours.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bark">Palette</p>
                    <p className="mt-1 text-sm text-brand-dark">{product.colours.join(' · ')}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  handleInquiry();
                  onClose();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-brand-base transition hover:bg-brand-wood hover:text-brand-dark"
              >
                <ShoppingBag size={14} />
                Chat on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenGiftCheckout(product);
                  onClose();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-dark/20 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-brand-dark transition hover:border-brand-bark hover:bg-brand-warm"
              >
                <Gift size={14} />
                Buy as gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
