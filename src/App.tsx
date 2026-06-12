import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ConfidenceAssurance from './components/ConfidenceAssurance';
import RoomRenderer from './components/RoomRenderer';
import Portfolio from './components/Portfolio';
import Shop from './components/Shop';
import HowItWorks from './components/HowItWorks';
import WhatWeDo from './components/WhatWeDo';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import DesignerBio from './components/DesignerBio';
import InteractiveGallery from './components/InteractiveGallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';

// Dialog / Utility Overlays
import ProjectModal from './components/ProjectModal';
import InquiryDrawer from './components/InquiryDrawer';
import Toast from './components/Toast';

// Models
import { Project, Product, InquiryItem, SavedDesign, WishlistItem, GiftPurchase } from './types';
import { ShoppingBag, User as UserIcon } from 'lucide-react';
import { PORTFOLIO_DATA, PRODUCTS_DATA } from './data';
import AdminPanel from './components/AdminPanel';
import AccountPanel from './components/AccountPanel';
import GiftModal from './components/GiftModal';
import Loader from './components/Loader';
import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom presets for the contact form
  const [servicePreset, setServicePreset] = useState<string>('');
  const [briefPreset, setBriefPreset] = useState<string>('');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  // Custom toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showNavBlockedToast = () => setToastMessage('not done cooking');

  // Dynamic synchronized state with database (backed by Firestore)
  const [projects, setProjects] = useState<Project[]>(PORTFOLIO_DATA);
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  // User auth state and private club curation tracking
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [giftPurchases, setGiftPurchases] = useState<GiftPurchase[]>([]);

  // Sub-navigation view modes inside "My Space"
  const [mySpaceTab, setMySpaceTab] = useState<'Renderer' | 'Account'>('Renderer');
  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'designs' | 'wishlist' | 'gifts'>('profile');

  // Gift purchasing overlay state
  const [selectedGiftProduct, setSelectedGiftProduct] = useState<Product | null>(null);

  // Authenticate user changes listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        setSavedDesigns([]);
        setWishlist([]);
        setGiftPurchases([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync saved designs
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'saved_designs'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: SavedDesign[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as SavedDesign);
        });
        setSavedDesigns(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'saved_designs');
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Sync wishlist items
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'wishlists'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: WishlistItem[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as WishlistItem);
        });
        setWishlist(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'wishlists');
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Sync gift purchases
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'gift_purchases'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: GiftPurchase[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as GiftPurchase);
        });
        setGiftPurchases(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'gift_purchases');
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Handle saving AI reconstructed room design
  const handleSaveDesign = async (report: any, imageUrl: string) => {
    if (!user) return false;
    try {
      await addDoc(collection(db, 'saved_designs'), {
        userId: user.uid,
        styleName: report.style_name,
        headline: report.headline,
        palette: report.palette,
        paletteNames: report.palette_names,
        designerNote: report.designer_note,
        imageUrl: imageUrl,
        createdAt: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      });
      setToastMessage('Design brief curated safely inside your library ✓');
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'saved_designs');
      return false;
    }
  };

  // Toggle products on wishlist
  const handleToggleWishlist = async (productId: string) => {
    if (!user) {
      setToastMessage('Identify yourself or log in to manage wishlists');
      // Direct them to log in automatically so it is extremely fluid!
      window.location.hash = '#/account';
      return;
    }
    const match = wishlist.find((item) => item.productId === productId);
    if (match) {
      try {
        await deleteDoc(doc(db, 'wishlists', match.id));
        setToastMessage('Curated piece excised from your wishlist casket');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'wishlists');
      }
    } else {
      try {
        await addDoc(collection(db, 'wishlists'), {
          userId: user.uid,
          productId: productId,
          addedAt: new Date().toLocaleDateString()
        });
        setToastMessage('Curated piece locked into your wishlist ✓');
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'wishlists');
      }
    }
  };

  // Delete saved design matching account ID
  const handleDeleteDesign = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'saved_designs', id));
      setToastMessage('Design brief discarded cleanly');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'saved_designs');
    }
  };

  // Delete wishlist piece matching account ID
  const handleDeleteWishlist = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'wishlists', id));
      setToastMessage('Boutique piece excised from wishlist');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'wishlists');
    }
  };

  // Purchase gift submission logger
  const handleBuyGiftSubmit = async (
    recipientName: string,
    recipientEmail: string,
    recipientPhone: string,
    deliveryAddress: string,
    personalMsg: string,
    giftWrap: boolean
  ) => {
    if (!user || !selectedGiftProduct) return;
    try {
      await addDoc(collection(db, 'gift_purchases'), {
        userId: user.uid,
        productId: selectedGiftProduct.id,
        productName: selectedGiftProduct.name,
        price: selectedGiftProduct.price,
        recipientName,
        recipientEmail,
        recipientPhone,
        deliveryAddress,
        personalMsg,
        giftWrap,
        purchasedAt: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: 'Pending Delivery'
      });
      // Move them directly to gifts orders tab to see their delivery catalog log instantly!
      setActiveAccountTab('gifts');
      window.location.hash = '#/account';
      setToastMessage(`Splendid! Ordered gift package for ${recipientName} ✓`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'gift_purchases');
    }
  };

  // Real-time Firestore synchronization for portfolio case studies
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      async (snapshot) => {
        if (snapshot.empty) {
          console.log('No design case studies in database. Seeding collections...');
          try {
            for (const proj of PORTFOLIO_DATA) {
              await setDoc(doc(db, 'projects', proj.id), proj);
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'projects');
          }
        } else {
          const list: Project[] = [];
          snapshot.forEach((doc) => {
            list.push(doc.data() as Project);
          });
          setProjects(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'projects');
      }
    );

    return () => unsubscribe();
  }, []);

  // Real-time Firestore synchronization for boutique shop products
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      async (snapshot) => {
        if (snapshot.empty) {
          console.log('No products in database. Seeding catalogue...');
          try {
            for (const prod of PRODUCTS_DATA) {
              await setDoc(doc(db, 'products', prod.id), prod);
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'products');
          }
        } else {
          const list: Product[] = [];
          snapshot.forEach((doc) => {
            list.push(doc.data() as Product);
          });
          setProducts(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    );

    return () => unsubscribe();
  }, []);

  // Hash-based dynamic pages state: 'home' | 'work' | 'services' | 'shop' | 'ai-renderer' | 'admin'
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const revealSections = document.querySelectorAll<HTMLElement>('.reveal-section');
    if (revealSections.length === 0) return undefined;

    const revealItemSelector = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'p',
      'li',
      'button',
      'a',
      'img',
      'figure',
      '.svc',
      '.proj',
      '.wwd-top',
      '.svc-icon',
      '.proj-text',
      '.proj-meta',
      '.proj-link',
      '.testimonial-card',
      '.ip'
    ].join(', ');

    const revealItems: HTMLElement[] = [];
    revealSections.forEach((section) => {
      section.querySelectorAll<HTMLElement>(revealItemSelector).forEach((item) => {
        if (!item.classList.contains('reveal')) {
          item.classList.add('reveal');
        }
        revealItems.push(item);
      });
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/work')) {
        setToastMessage('not done yet');
        window.location.hash = '#';
      } else if (hash.startsWith('#/services')) {
        setCurrentPage('services');
      } else if (hash.startsWith('#/shop')) {
        setToastMessage('not done yet');
        window.location.hash = '#';
      } else if (hash.startsWith('#/ai-renderer')) {
        setToastMessage('not done yet');
        window.location.hash = '#';
      } else if (hash.startsWith('#/account')) {
        setToastMessage('not done yet');
        window.location.hash = '#';
      } else if (hash.startsWith('#/admin')) {
        setToastMessage('not done yet');
        window.location.hash = '#';
      } else {
        setCurrentPage('home');
        if (hash.includes('home-')) {
          const sectionId = hash.split('home-')[1];
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = el.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' as any });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial parse representation
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddProductToInquiryVal = (product: Product) => {
    setInquiryItems((prev) => {
      const match = prev.find((item) => item.product.id === product.id);
      if (match) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`Added "${product.name}" to inquiry list ✓`);
  };

  const handleRemoveInquiryItem = (productId: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateInquiryQuantity = (productId: string, delta: number) => {
    setInquiryItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty < 1 ? 1 : newQty };
          }
          return item;
        })
    );
  };

  const handleOpenInquiryDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseInquiryDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const handleSelectServiceFromServices = (serviceName: string) => {
    setServicePreset(serviceName);
    setBriefPreset(`Hi, I am looking to schedule a workspace discussion primarily focusing on: ${serviceName}. Let's chat layouts.`);
    setIsConsultationModalOpen(true);
  };

  const handleProceedToInquiryPayload = () => {
    // Collect inquiry items as formatted string
    const stringifiedItems = inquiryItems
      .map((item) => `- ${item.product.name} (Quantity: ${item.quantity})`)
      .join('\n');
    
    setServicePreset('Timeless Furniture Retail');
    setBriefPreset(
      `Hi, I have put together an initial acquisition draft from the Zanori Spaces shop index:\n${stringifiedItems}\n\nKindly provide local delivery schedules and freight specifications for Lagos.`
    );
    setIsConsultationModalOpen(true);
  };

  const totalInquiryItemsCount = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);
  const [kuulaLoading, setKuulaLoading] = useState<boolean>(false);

  // Robustly wait until Kuula iframes on the homepage have fired their load events
  useEffect(() => {
    if (currentPage !== 'home') {
      setKuulaLoading(false);
      return;
    }

    // Only show loader if we detect Kuula iframes that are not yet loaded
    const initialIframes = Array.from(document.querySelectorAll('iframe[src*="kuula.co/share"]')) as HTMLIFrameElement[];
    const needLoading = initialIframes.some((f) => f.dataset._kuulaLoaded !== '1');
    if (!needLoading && initialIframes.length === 0) {
      // no kuula iframes present — don't show loader
      setKuulaLoading(false);
    } else if (needLoading) {
      setKuulaLoading(true);
    }

    let timeout = 0 as any;
    let observer: MutationObserver | null = null;

    const checkAndAttach = () => {
      const kuulaIframes = Array.from(document.querySelectorAll('iframe[src*="kuula.co/share"]')) as HTMLIFrameElement[];
      if (kuulaIframes.length === 0) return false;

      let remaining = kuulaIframes.filter((f) => f.dataset._kuulaLoaded !== '1');
      if (remaining.length === 0) {
        setKuulaLoading(false);
        return true;
      }

      remaining.forEach((ifr) => {
        // mark to avoid double-binding
        if (ifr.dataset._kuulaBound === '1') return;
        ifr.dataset._kuulaBound = '1';
        const onLoad = () => {
          ifr.dataset._kuulaLoaded = '1';
          // re-check all iframes
          const still = Array.from(document.querySelectorAll('iframe[src*="kuula.co/share"]')).filter((f: any) => f.dataset._kuulaLoaded !== '1');
          if (still.length === 0) {
            setKuulaLoading(false);
            if (observer) observer.disconnect();
            clearTimeout(timeout);
          }
        };
        ifr.addEventListener('load', onLoad, { once: true });
      });

      return false;
    };

    // Initial attempt
    const doneNow = checkAndAttach();

    // Watch for iframes being injected later
    observer = new MutationObserver(() => {
      checkAndAttach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Safety fallback in case something never loads
    timeout = window.setTimeout(() => {
      setKuulaLoading(false);
      if (observer) observer.disconnect();
    }, 15000);

    // If there are no kuula iframes at all after a short delay, hide loader
    const shortCheck = window.setTimeout(() => {
      const any = document.querySelectorAll('iframe[src*="kuula.co/share"]').length;
      if (any === 0) {
        setKuulaLoading(false);
        if (observer) observer.disconnect();
        clearTimeout(timeout);
      }
      clearTimeout(shortCheck);
    }, 400);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeout);
      clearTimeout(shortCheck);
    };
  }, [currentPage]);

  return (
    <div className={"relative min-h-screen bg-brand-bark/70 antialiased text-brand-dark selection:bg-brand-wood selection:text-brand-dark" + (kuulaLoading ? ' overflow-hidden' : '')}>
      
      {/* Dynamic Floating Action Ticker Indicator for items count (Persistent Bottom Right Drawer Trigger) */}
      {totalInquiryItemsCount > 0 && (
        <button
          type="button"
          onClick={handleOpenInquiryDrawer}
          className="fixed bottom-6 left-6 md:left-auto md:right-32 z-30 flex items-center space-x-2.5 px-5 py-3.5 bg-brand-dark hover:bg-brand-bark text-brand-base rounded-full shadow-lg border border-brand-wood/40 transition-all duration-300 transform hover:scale-105"
        >
          <ShoppingBag size={14} className="text-brand-wood" />
          <span className="text-xs uppercase tracking-widest font-semibold font-sans">
            Inquiry draft ({totalInquiryItemsCount})
          </span>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
        </button>
      )}

      {/* Primary Header Navbar */}
      <Navbar
        onOpenInquiryDrawer={handleOpenInquiryDrawer}
        inquiryCount={totalInquiryItemsCount}
        currentPage={currentPage}
        user={user}
        onBlockedNavigation={showNavBlockedToast}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
      />

      {/* Dynamic Routing Screen Page Views */}
      <main className="pt-20">
        
        {/* HOMEPAGE ROUTE */}
        {currentPage === 'home' && (
          <div className="space-y-0">
            <div className="reveal-section"><Hero onOpenConsultationModal={() => setIsConsultationModalOpen(true)} /></div>
            <div className="reveal-section"><InteractiveGallery /></div>
            <div className="reveal-section"><WhyChooseUs /></div>
            <div className="reveal-section"><WhatWeDo /></div>
            <div className="reveal-section"><DesignerBio /></div>
            <div className="reveal-section"><ConfidenceAssurance /></div>
            <div className="reveal-section"><Projects /></div>
            <div className="reveal-section"><HowItWorks /></div>
          </div>
        )}

        {/* WORK PAGE ROUTE */}
        {currentPage === 'work' && (
          <div className="space-y-24">
            <div className="reveal-section"><Portfolio onProjectSelect={handleProjectSelect} projects={projects} /></div>
            <div className="reveal-section"><Testimonial /></div>
          </div>
        )}

        {/* SERVICES PAGE ROUTE */}
        {currentPage === 'services' && (
          <div className="reveal-section">
            <Services onSelectService={handleSelectServiceFromServices} />
          </div>
        )}

        {/* SHOP PAGE ROUTE */}
        {currentPage === 'shop' && (
          <div className="reveal-section">
            <Shop
              onAddProductToInquiry={handleAddProductToInquiryVal}
              onOpenInquiryDrawer={handleOpenInquiryDrawer}
              inquiryCount={totalInquiryItemsCount}
              products={products}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onOpenGiftCheckout={(prod) => setSelectedGiftProduct(prod)}
            />
          </div>
        )}

        {/* My Spaces / PRIVATE LOUNGE WORKSPACE */}
        {currentPage === 'ai-renderer' && (
          <div className="reveal-section max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10 min-h-screen">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B6F52] font-mono block mb-1">
                ZANORI DIGITAL DESIGN WORKSPACE
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-brand-dark">
                My Space Studio AI
              </h1>
            </div>

            <RoomRenderer 
              user={user}
              onSaveDesign={handleSaveDesign}
              savedDesigns={savedDesigns}
              onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
            />
          </div>
        )}

        {/* ACCOUNT CLIENT SPACE */}
        {currentPage === 'account' && (
          <div className="reveal-section max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10 min-h-screen">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B6F52] font-mono block mb-1">
                ZANORI SERVICES
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-brand-dark">
                {user ? "Member's Lounge" : "Secure Authentication"}
              </h1>
            </div>

            <AccountPanel
              user={user}
              savedDesigns={savedDesigns}
              wishlist={wishlist}
              giftPurchases={giftPurchases}
              products={products}
              onDeleteDesign={handleDeleteDesign}
              onDeleteWishlist={handleDeleteWishlist}
              onAddProductToInquiry={handleAddProductToInquiryVal}
              onSetTab={(tab) => {
                if (tab === 'Renderer') {
                  window.location.hash = '#/ai-renderer';
                }
              }}
              activeAccountTab={activeAccountTab}
              setActiveAccountTab={setActiveAccountTab}
            />
          </div>
        )}

        {/* ADMIN WORKSTATION ROUTE */}
        {currentPage === 'admin' && (
          <div className="reveal-section">
            <AdminPanel
              projects={projects}
              setProjects={setProjects}
              products={products}
              setProducts={setProducts}
              onNavigateHome={() => { window.location.hash = '#/'; }}
            />
          </div>
        )}

      </main>

      {/* Full-page loader shown while Kuula feeds load on the homepage */}
      {kuulaLoading && currentPage === 'home' && <Loader />}

      <ContactForm
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        serviceRequestPreset={servicePreset}
        briefPreset={briefPreset}
      />

      {/* Primary Footer */}
      <Footer onBlockedNavigation={showNavBlockedToast} onOpenConsultationModal={() => setIsConsultationModalOpen(true)} />

      {/* Luxury Gift Purchasing Drawer modal */}
      <GiftModal
        product={selectedGiftProduct}
        isOpen={selectedGiftProduct !== null}
        onClose={() => setSelectedGiftProduct(null)}
        onSubmitGift={handleBuyGiftSubmit}
      />

      {/* Overlaid Dialog Controllers */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProjectModal}
        onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
      />

      <InquiryDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseInquiryDrawer}
        items={inquiryItems}
        onRemoveItem={handleRemoveInquiryItem}
        onUpdateQuantity={handleUpdateInquiryQuantity}
        onProceedToInquiryForm={handleProceedToInquiryPayload}
      />

      {/* Ephemeral Toast Alert notifications */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
