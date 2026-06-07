import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Send, CreditCard, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';

interface GiftModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitGift: (
    recipientName: string, 
    recipientEmail: string, 
    recipientPhone: string, 
    deliveryAddress: string, 
    personalMsg: string, 
    giftWrap: boolean
  ) => Promise<void>;
}

export default function GiftModal({ product, isOpen, onClose, onSubmitGift }: GiftModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recipient info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);

  // Simulated Payment Info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen || !product) return null;

  // CurrencyFormatter
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert('Please fill out all required recipient fields.');
      return;
    }
    setStep(2);
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert('Please fill out all card payment details.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitGift(name, email, phone, address, message, giftWrap);
      // Reset
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setMessage('');
      setStep(1);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Could not record gift payment. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-bark/65 backdrop-blur-sm"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-brand-base w-full max-w-lg rounded-2xl overflow-hidden border border-brand-wood/25 shadow-xl max-h-[90vh] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 bg-brand-sand/55 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-brand-warm text-brand-wood rounded-lg">
                <Gift size={16} />
              </div>
              <div>
                <h3 className="font-serif text-[17px] font-medium text-brand-dark">Send Boutique Piece as Gift</h3>
                <p className="text-[10px] uppercase tracking-wider font-mono text-brand-muted">Item: {product.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-brand-wood/20 text-brand-bark transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Stepper indicator bar */}
          <div className="grid grid-cols-2 text-center text-[10px] font-mono tracking-widest text-brand-muted bg-brand-warm py-2.5">
            <span className={step === 1 ? 'text-brand-dark font-bold' : ''}>1. RECIPIENT BRIEF</span>
            <span className={step === 2 ? 'text-brand-dark font-bold' : ''}>2. SECURED CHECKOUT</span>
          </div>

          {/* Step Sections - Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {step === 1 ? (
              <form id="recipient-form" onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Olaide Bello"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="olaide@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                    Recipient Phone Number (Lagos Mobile) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 81 2345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                    Delivery Destination Address (Lagos State only) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Apartment 4, Block B2, Royal Crest Residences, Lekki Phase 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                    Engraved Card Note Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Happy housewarming Olaide! May this Lund Bed carry beautiful Lagos morning light. Cheers from Tosin."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark resize-none"
                  />
                </div>

                {/* Gift Wrap Toggler */}
                <div className="flex items-center justify-between p-3.5 bg-brand-warm rounded-lg border border-brand-wood/15">
                  <div className="space-y-0.5">
                    <span className="text-xs font-serif italic text-brand-dark font-medium">Add Signature Luxe Gift Wrapped Box</span>
                    <p className="text-[10px] text-brand-muted font-sans">Wrapped with heavy satin ribbon and bespoke greeting engraving tags.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGiftWrap(!giftWrap)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      giftWrap ? 'bg-brand-wood' : 'bg-brand-wood/40'
                    }`}
                  >
                    <motion.div
                      layout
                      className="w-4 h-4 bg-white rounded-full shadow-xs"
                      animate={{ x: giftWrap ? '18px' : '0px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </form>
            ) : (
              <form id="payment-form" onSubmit={handleCompletePayment} className="space-y-4">
                {/* Invoice summary */}
                <div className="p-4 bg-brand-sand rounded-xl border border-brand-wood/20 space-y-2.5">
                  <span className="text-[9px] font-mono tracking-wider text-brand-muted uppercase block">Checkout Summary</span>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-dark/75 font-light">{product.name} Base Cost</span>
                    <span className="font-semibold text-brand-dark">{formatNaira(product.price)}</span>
                  </div>
                  
                    <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-dark/75 font-light">Lagos Island/Mainland Fast Cargo Delivery</span>
                    <span className="font-medium text-brand-dark">FREE Curtesy</span>
                  </div>

                    <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-dark/75 font-light">Satin Luxe Wrapping</span>
                    <span className="text-brand-wood">{giftWrap ? 'Included' : 'None'}</span>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-sm font-semibold">
                    <span className="text-brand-bark">Total Premium Paid</span>
                    <span className="text-brand-bark font-sans font-bold">{formatNaira(product.price)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block font-mono font-bold">Lagos Premium Card gateway</span>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                      Secure Credit Card Number
                    </label>
                    <div className="relative">
                      <CreditCard size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                      <input
                        type="text"
                        required
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                        Security code (CVV)
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-brand-sand rounded-lg border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark font-mono"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer controls */}
          <div className="p-6 bg-brand-sand/35 flex items-center justify-between">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs uppercase tracking-wider text-brand-wood hover:underline font-semibold leading-none cursor-pointer"
              >
                Back To Recipient
              </button>
            )}

            <div className="ml-auto">
              {step === 1 ? (
                <button
                  type="submit"
                  form="recipient-form"
                  className="px-6 py-3 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-xs font-medium uppercase tracking-widest rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Continue To Payment</span>
                  <ChevronRight size={13} />
                </button>
              ) : (
                <button
                  type="submit"
                  form="payment-form"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-brand-bark hover:bg-brand-cranberry/90 text-brand-sand text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <span>AUTH & PURCHASE GIFT</span>
                      <Check size={13} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

