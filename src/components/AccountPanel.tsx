import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Lock, Heart, Gift, Trash2, LogOut, 
  ArrowRight, LockKeyhole, ShoppingBag, Eye, Star, GiftIcon, HelpCircle 
} from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { SavedDesign, WishlistItem, GiftPurchase, Product } from '../types';

interface AccountPanelProps {
  user: FirebaseUser | null;
  savedDesigns: SavedDesign[];
  wishlist: WishlistItem[];
  giftPurchases: GiftPurchase[];
  products: Product[];
  onDeleteDesign: (id: string) => Promise<void>;
  onDeleteWishlist: (id: string) => Promise<void>;
  onAddProductToInquiry: (product: Product) => void;
  onSetTab: (tab: 'Renderer' | 'Account') => void;
  activeAccountTab: 'profile' | 'designs' | 'wishlist' | 'gifts';
  setActiveAccountTab: (tab: 'profile' | 'designs' | 'wishlist' | 'gifts') => void;
}

export default function AccountPanel({
  user,
  savedDesigns,
  wishlist,
  giftPurchases,
  products,
  onDeleteDesign,
  onDeleteWishlist,
  onAddProductToInquiry,
  onSetTab,
  activeAccountTab,
  setActiveAccountTab
}: AccountPanelProps) {
  // Auth Form states
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Authentication submission
  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (fullName.trim()) {
          await updateProfile(userCred.user, {
            displayName: fullName.trim()
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      let friendlyMessage = 'Authentication failed. Please check credentials.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already in use by another account.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        friendlyMessage = 'Invalid email or password combination.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.';
      }
      setAuthError(friendlyMessage);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Google Login popup
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setIsAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google sign in failed. Please try again.');
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out', err);
    }
  };

  // Currency Formatter
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Resolve product information for wishlist
  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  if (!user) {
    // High-end private member login modal overlay
    return (
      <div className="relative min-h-[580px] w-full rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12">
        {/* Underlay representing the premium boutique lounge blur */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-brand-bark/80 backdrop-blur-md"></div>

        {/* Floating Modal Frame */}
        <div className="relative z-10 w-full max-w-md bg-brand-sand/95 hover:bg-brand-sand transition-all duration-300 rounded-2xl border border-white/20 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-brand-bark text-brand-base rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
              <LockKeyhole size={16} />
            </div>
            <span className="text-[9px] tracking-[0.25em] text-brand-wood uppercase font-mono block">
              ZANORI PRIVATE SECURE STUDIO
            </span>
            <h2 className="font-serif text-2xl font-light text-brand-bark">
              {isSignUp ? 'Create Studio Account' : 'Welcome to the Lounge'}
            </h2>
            <p className="text-[11px] text-brand-muted font-sans font-light leading-relaxed max-w-xs mx-auto">
              Unlock personalized workspace caskets. Preserve generated spaces, save wishlist items, and manage luxury interior gifts.
            </p>
          </div>

          <form onSubmit={handleSubmitAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                  Full Name
                </label>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Olutosin Alabi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-brand-sand/45 rounded-xl border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-brand-sand/45 rounded-xl border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.1em] text-brand-muted font-sans font-semibold block">
                Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-brand-sand/45 rounded-xl border border-brand-wood/25 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark transition-colors"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-150 text-red-800 text-[10px] rounded-lg leading-relaxed font-sans font-light">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3 mt-2 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-[10px] font-medium uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <span>{isSignUp ? 'REGISTER ACCOUNT' : 'SECURE LOG IN'}</span>
              <ArrowRight size={11} />
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-[1px] bg-brand-wood/15"></div>
                <span className="relative px-3 bg-brand-sand text-[8px] uppercase tracking-widest text-brand-wood font-semibold">
              Or Authenticate with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isAuthLoading}
            className="w-full py-3 border border-brand-wood/30 hover:border-brand-bark bg-transparent text-brand-dark hover:bg-brand-sand/35 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            {/* Google Logo SVG */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15 0 12 0 7.35 0 3.36 2.67 1.45 6.57l3.78 2.93c.9-2.7 3.4-4.46 6.77-4.46z" />
              <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.21-2.3H12v4.35h6.42c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.45z" />
              <path fill="#FBBC05" d="M5.23 14.15c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.45 6.57C.52 8.44 0 10.16 0 12s.52 3.56 1.45 5.43l3.78-2.93z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.01.68-2.31 1.08-4.27 1.08-3.37 0-5.87-1.76-6.77-4.46L1.45 17.8C3.36 21.33 7.35 24 12 24z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="mt-2 text-center text-[10.5px] font-sans font-light text-brand-muted">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError(null);
              }}
              className="text-brand-bark hover:underline font-semibold leading-none cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Sign Up Free'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Dashboard layout for signed-in members
  return (
    <div className="w-full space-y-8 animate-feed-in">
      
      {/* Visual greeting card banner */}
      <div className="bg-brand-bark rounded-2xl p-6 md:p-8 text-brand-base flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-brand-wood/10">
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono tracking-[0.2em] text-brand-wood uppercase bg-brand-wood/30 px-2.5 py-1 rounded-sm">
            ZANORI STUDIO CLUB MEMBERSHIP
          </span>
          <h2 className="font-serif text-2xl font-light tracking-wide text-white">
            Ekaabo, {user.displayName || user.email?.split('@')[0] || 'Client'}
          </h2>
          <p className="text-xs text-brand-sand/75 font-sans font-light">
            Authenticated securely via <span className="font-mono">{user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email Secure'}</span> &bull; Status: <span className="text-brand-wood">Director Curator</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSetTab('Renderer')}
            className="px-4 py-2 border border-brand-wood/40 hover:border-brand-wood text-brand-wood text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            AI Designer Board
          </button>
          <button
            onClick={handleSignOut}
            className="p-2.5 bg-red-950/20 hover:bg-red-950/50 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
            title="Secure Sign Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Profile caskets switch tab */}
      <div className="flex border-b border-brand-wood/15 pb-2 overflow-x-auto gap-4">
        {[
          { key: 'profile', label: 'Client Profile', count: null },
          { key: 'designs', label: 'My Saved Spaces', count: savedDesigns.length },
          { key: 'wishlist', label: 'My Wishlist', count: wishlist.length },
          { key: 'gifts', label: 'Gift Orders', count: giftPurchases.length },
        ].map((t) => {
          const isActive = activeAccountTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveAccountTab(t.key as any)}
              className={`pb-2.5 text-xs uppercase tracking-widest font-mono border-b-2 text-left whitespace-nowrap transition-colors relative cursor-pointer ${
                isActive 
                  ? 'border-brand-bark text-brand-dark font-semibold' 
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              <span>{t.label}</span>
              {t.count !== null && (
                <span className="ml-1.5 font-sans px-1.5 py-0.5 bg-brand-warm text-brand-muted font-bold text-[9px] rounded-full">
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Profile views switch content */}
      <div className="min-h-[300px]">
        {activeAccountTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-brand-sand rounded-2xl border border-brand-wood/15 p-6 space-y-6">
              <h3 className="font-serif text-lg text-brand-dark italic">Design Identity & Credentials</h3>
              
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between py-2 border-b border-brand-wood/10">
                  <span className="text-brand-muted uppercase tracking-wider font-light">Account Holder</span>
                  <span className="font-medium text-brand-dark">{user.displayName || 'Unspecified'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-wood/10">
                  <span className="text-brand-muted uppercase tracking-wider font-light">Client Email</span>
                  <span className="font-mono text-brand-dark">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-wood/10">
                  <span className="text-brand-muted uppercase tracking-wider font-light">Member Tag ID</span>
                  <span className="font-mono text-brand-muted shrink-0 text-[10px]">{user.uid.substring(0, 12)}...</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-wood/10">
                  <span className="text-brand-muted uppercase tracking-wider font-light">Last Sign In</span>
                  <span className="text-brand-dark">Just now</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-sand rounded-2xl border border-brand-wood/15 p-6 space-y-4">
              <h3 className="font-serif text-lg text-brand-dark italic flex items-center space-x-1.5">
                <HelpCircle size={16} className="text-brand-bark" />
                <span>Need Professional Interior Assistance?</span>
              </h3>
              <p className="text-xs text-brand-muted font-sans font-light leading-relaxed">
                As a registered Studio Club Member, your inquiry list has direct priority. Submit an inquiry through the boutique shop, or generate an arrangement brief via our AI Rooms generator to initiate structured material board mockups for your space.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSetTab('Renderer')}
                  className="px-5 py-2.5 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-[10px] font-semibold uppercase tracking-widest rounded-xl transition-all"
                >
                  Synthesize a Room Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeAccountTab === 'designs' && (
          <div className="space-y-6">
            {savedDesigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {savedDesigns.map((design) => (
                  <div key={design.id} className="bg-brand-sand rounded-2xl overflow-hidden border border-brand-wood/15 flex flex-col justify-between group shadow-xs">
                    <div className="relative h-44 bg-zinc-50 flex items-center justify-center border-b border-brand-wood/15 overflow-hidden">
                      {design.imageUrl ? (
                        <img 
                          src={design.imageUrl} 
                          alt="Saved Space Render" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : null}
                      <span className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-brand-wood text-[9px] uppercase tracking-[0.14em] rounded-sm font-medium">
                        {design.styleName} Preset
                      </span>
                      <button
                        onClick={() => onDeleteDesign(design.id)}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-brand-bark/80 hover:bg-brand-cranberry/90 text-brand-sand transition-all shadow-md cursor-pointer hover:scale-105"
                        title="Delete design"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <blockquote className="font-serif text-[13.5px] italic text-brand-bark leading-relaxed">
                          "{design.headline}"
                        </blockquote>
                        <p className="text-[11px] leading-relaxed font-sans text-brand-muted font-light pl-3 border-l border-brand-wood/30">
                          {design.designerNote}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-brand-wood/10">
                        <div className="flex justify-between items-center text-[8px] font-mono tracking-wider text-brand-muted uppercase">
                          <span>Synthesized Palette</span>
                          <span>{design.createdAt}</span>
                        </div>
                        <div className="flex gap-1">
                          {design.palette.map((color, idx) => (
                            <div key={color + idx} className="h-4.5 flex-1 rounded-sm shadow-xs border border-brand-dark/15 relative group/c" style={{ backgroundColor: color }}>
                              <span className="absolute top-full left-1/2 -translate-x-1/2 scale-0 group-hover/c:scale-100 bg-brand-dark text-white text-[8px] font-mono px-1 py-0.5 rounded-sm whitespace-nowrap mt-1 label-swatch z-20">
                                {design.paletteNames[idx] || 'Accent'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
                <div className="w-10 h-10 bg-brand-warm rounded-full flex items-center justify-center text-brand-wood mx-auto">
                  <Star size={16} />
                </div>
                <h3 className="font-serif text-xl font-light text-brand-dark">No saved spaces curated</h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto font-sans font-light leading-relaxed">
                  Head over to the AI Lab section, upload a physical home workstation, specify design directions, and preserve the synthesized brief inside your private club library.
                </p>
                <button
                  onClick={() => onSetTab('Renderer')}
                  className="mt-2 px-5 py-2 hover:bg-brand-dark text-brand-dark hover:text-white border border-brand-bark/30 text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer"
                >
                  Open AI Designer
                </button>
              </div>
            )}
          </div>
        )}

        {activeAccountTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((item) => {
                  const prod = getProductById(item.productId);
                  if (!prod) return null;
                  return (
                    <div key={item.id} className="bg-brand-sand rounded-2xl border border-brand-wood/15 p-4 flex flex-col justify-between group shadow-xs relative">
                      <button
                        onClick={() => onDeleteWishlist(item.id)}
                        className="absolute top-3 right-3 p-1.5 opacity-60 hover:opacity-100 text-brand-muted hover:text-red-650 transition-all cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={13} />
                      </button>

                      <div className="rounded-xl w-full h-[120px] flex items-center justify-center p-4 overflow-hidden relative" style={{ background: prod.imageBg }}>
                        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                        <div className="p-3 bg-brand-base/85 backdrop-blur-md rounded-full shadow-xs">
                          <Heart size={14} className="text-red-500 fill-red-500" />
                        </div>
                      </div>

                      <div className="mt-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-brand-muted block">{prod.category}</span>
                          <h4 className="font-serif text-sm font-medium text-brand-bark group-hover:text-brand-bark transition-colors">{prod.name}</h4>
                          <span className="text-xs font-semibold text-brand-dark font-sans block pt-1">{formatNaira(prod.price)}</span>
                        </div>

                        <div className="pt-3 mt-3 border-t border-brand-wood/10 text-center">
                          <button
                            onClick={() => onAddProductToInquiry(prod)}
                            className="w-full py-1.5 rounded-full bg-brand-warm hover:bg-brand-dark text-brand-dark hover:text-white text-[9px] uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center space-x-1"
                          >
                            <ShoppingBag size={10} />
                            <span>Add to inquiry</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
                <div className="w-10 h-10 bg-brand-warm rounded-full flex items-center justify-center text-brand-wood mx-auto">
                  <Heart size={16} />
                </div>
                <h3 className="font-serif text-xl font-light text-brand-dark">Your wishlist casket is empty</h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto font-sans font-light leading-relaxed">
                  Browse our high-end boutique interior catalog furniture lists, click the wishlist heart on any piece, and monitor acquisitions right here.
                </p>
                <a
                  href="#/shop"
                  className="inline-block mt-2 px-5 py-2 hover:bg-brand-dark text-brand-dark hover:text-white border border-brand-bark/30 text-[10px] uppercase tracking-wider rounded-full transition-all"
                >
                  Explore Boutique
                </a>
              </div>
            )}
          </div>
        )}

        {activeAccountTab === 'gifts' && (
          <div className="space-y-6">
            {giftPurchases.length > 0 ? (
              <div className="space-y-6">
                {giftPurchases.map((gift) => (
                  <div key={gift.id} className="bg-brand-sand rounded-xl border border-brand-wood/15 p-6 space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-wood/10 pb-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider block">GIFT ORDER ID: {gift.id}</span>
                        <h4 className="font-serif text-[15px] font-semibold text-brand-dark">Curated Piece: {gift.productName}</h4>
                        <p className="text-xs text-brand-muted">
                          Purchased on {gift.purchasedAt} &bull; Value: <span className="font-sans font-semibold text-brand-dark">{formatNaira(gift.price)}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold rounded-md ${
                          gift.status === 'Delivered' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' 
                            : 'bg-amber-50 text-amber-800 border border-amber-150'
                        }`}>
                          {gift.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-brand-muted block font-mono font-bold">Recipient Information</span>
                        <p className="leading-snug">
                          <strong className="text-brand-dark">Name: </strong> {gift.recipientName}
                        </p>
                        <p className="leading-snug">
                          <strong className="text-brand-dark">Email contact: </strong> <span className="font-mono">{gift.recipientEmail}</span>
                        </p>
                        <p className="leading-snug">
                          <strong className="text-brand-dark">Phone: </strong> <span className="font-mono">{gift.recipientPhone}</span>
                        </p>
                        <p className="leading-snug">
                          <strong className="text-brand-dark">Delivery Destination: </strong> {gift.deliveryAddress}, Lagos State
                        </p>
                      </div>

                      <div className="space-y-2.5 bg-brand-sand/45 p-4 rounded-lg border border-brand-wood/10 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-brand-muted block font-mono font-bold mb-1">Engraved Card Msg</span>
                          <p className="italic text-[11px] text-brand-wood leading-relaxed">
                            "{gift.personalMsg || 'No engraved message requested.'}"
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-semibold text-brand-muted pt-2 border-t border-brand-wood/10">
                          <span>LUXURY GIFT WRAP:</span>
                          <span className={gift.giftWrap ? 'text-brand-dark' : 'text-zinc-400'}>{gift.giftWrap ? 'Satin Wrapped Box ✓' : 'Standard Carton Package'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
                <div className="w-10 h-10 bg-brand-warm rounded-full flex items-center justify-center text-brand-wood mx-auto">
                  <GiftIcon size={16} />
                </div>
                <h3 className="font-serif text-xl font-light text-brand-dark">No gift deliveries logged</h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto font-sans font-light leading-relaxed">
                  Surprise friends, family, or colleagues in Lagos by purchasing boutique furniture as gifts. Gift wrapping + personalized greeting notes are compiled securely on checkout.
                </p>
                <a
                  href="#/shop"
                  className="inline-block mt-2 px-5 py-2 hover:bg-brand-dark text-brand-dark hover:text-white border border-brand-bark/30 text-[10px] uppercase tracking-wider rounded-full transition-all"
                >
                  Buy Furniture Gift
                </a>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
