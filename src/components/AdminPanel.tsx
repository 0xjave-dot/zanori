import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, ArrowRight, Lock, Database, RefreshCw, Layers, ShoppingBag, Eye, X, Sliders } from 'lucide-react';
import { Project, Product, PortfolioCategory, ShopCategory } from '../types';
import { PORTFOLIO_DATA, PRODUCTS_DATA } from '../data';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

interface AdminPanelProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onNavigateHome: () => void;
}

export default function AdminPanel({
  projects,
  setProjects,
  products,
  setProducts,
  onNavigateHome
}: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('zanori_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Tab: 'projects' | 'products'
  const [activeTab, setActiveTab] = useState<'projects' | 'products'>('projects');

  // Search/Filter states inside admin lists
  const [projectSearch, setProjectSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Editing & Creating modals or expanded forms states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Success Notification
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Field States - Project Builder
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<PortfolioCategory>('Homes');
  const [projLocation, setProjLocation] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projServices, setProjServices] = useState<string[]>([]);
  const [projImageBg, setProjImageBg] = useState('linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-warm) 100%)');
  const [projIsFeatured, setProjIsFeatured] = useState(false);

  // Form Field States - Product Builder
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<ShopCategory>('Beds');
  const [prodPrice, setProdPrice] = useState<number>(100000);
  const [prodIconType, setProdIconType] = useState<Product['iconType']>('bed');
  const [prodImageBg, setProdImageBg] = useState('linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-base) 100%)');
  const [prodIsNew, setProdIsNew] = useState(true);

  // Common Luxe Gradient presets
  const GRADIENT_PRESETS = [
    { name: 'Warm Warmth (Mahogany / Oak)', value: 'linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-warm) 50%, var(--color-brand-wood) 100%)' },
    { name: 'Light Alabaster (Japandi / Clay)', value: 'linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-base) 100%)' },
    { name: 'Earthy Forest (Iroko / Palm)', value: 'linear-gradient(135deg, var(--color-brand-warm) 0%, var(--color-brand-wood) 100%)' },
    { name: 'Smoked Charcoal (Dusk / Copper)', value: 'linear-gradient(135deg, var(--color-brand-wood) 0%, var(--color-brand-bark) 100%)' },
    { name: 'Coquina Bone (Sand / Travertine)', value: 'linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-warm) 100%)' },
    { name: 'Dramatic Obsidian (Velvet / Night)', value: 'linear-gradient(135deg, var(--color-brand-bark) 0%, var(--color-brand-dark) 100%)' }
  ];

  // Services available for multi-select
  const AVAILABLE_SERVICES = [
    'Space Styling',
    'Design Consultation',
    'Quality Furniture',
    '3D Interior Design'
  ];

  // Auth Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('zanori_admin_auth', 'true');
      setAuthError(null);
      triggerBanner('Welcome back, Studio Director ✓');
    } else {
      setAuthError('Incorrect passcode. Hint: Use "admin".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zanori_admin_auth');
    triggerBanner('Logged out successfully');
  };

  const triggerBanner = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Reset to static mock defaults backed by Firestore
  const handleFactoryReset = async () => {
    if (window.confirm('Are you sure you want to restore initial factory case studies and shop items? This overrides current changes.')) {
      try {
        // Sequentially purge current lists in database
        for (const proj of projects) {
          await deleteDoc(doc(db, 'projects', proj.id));
        }
        for (const proj of PORTFOLIO_DATA) {
          await setDoc(doc(db, 'projects', proj.id), proj);
        }

        for (const prod of products) {
          await deleteDoc(doc(db, 'products', prod.id));
        }
        for (const prod of PRODUCTS_DATA) {
          await setDoc(doc(db, 'products', prod.id), prod);
        }

        triggerBanner('Restored initial studio collections successfully ✓');
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'factory_reset');
      }
    }
  };

  // Load project for edit form
  const initiateEditProject = (p: Project) => {
    setEditingProject(p);
    setIsCreatingProject(false);
    setProjTitle(p.title);
    setProjCategory(p.category);
    setProjLocation(p.location);
    setProjDescription(p.description);
    setProjServices(p.servicesUsed);
    setProjImageBg(p.imageBg);
    setProjIsFeatured(!!p.isFeatured);
  };

  // Init new project form
  const initiateNewProject = () => {
    setEditingProject(null);
    setIsCreatingProject(true);
    setProjTitle('');
    setProjCategory('Homes');
    setProjLocation('');
    setProjDescription('');
    setProjServices(['Space Styling']);
    setProjImageBg('linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-warm) 100%)');
    setProjIsFeatured(false);
  };

  const cancelProjectForm = () => {
    setIsCreatingProject(false);
    setEditingProject(null);
  };

  // Submit Project Form (Creates or Updates on Firestore)
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projLocation.trim() || !projDescription.trim()) {
      alert('Please fill out all required architectural fields.');
      return;
    }

    try {
      if (editingProject) {
        // Editing Mode
        const updatedProj: Project = {
          ...editingProject,
          title: projTitle.trim(),
          category: projCategory,
          location: projLocation.trim(),
          description: projDescription.trim(),
          servicesUsed: projServices,
          imageBg: projImageBg,
          isFeatured: projIsFeatured
        };
        await setDoc(doc(db, 'projects', editingProject.id), updatedProj);
        triggerBanner(`Updated "${projTitle}" successfully ✓`);
      } else {
        // Create Mode
        const newProjId = `proj-${Date.now()}`;
        const newProj: Project = {
          id: newProjId,
          title: projTitle.trim(),
          category: projCategory,
          location: projLocation.trim(),
          description: projDescription.trim(),
          servicesUsed: projServices,
          imageBg: projImageBg,
          isFeatured: projIsFeatured
        };
        await setDoc(doc(db, 'projects', newProjId), newProj);
        triggerBanner(`Created "${projTitle}" case study successfully ✓`);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'projects');
    }

    setIsCreatingProject(false);
    setEditingProject(null);
  };

  // Delete project
  const deleteProject = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from your portfolio?`)) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        triggerBanner(`Deleted "${name}" case study`);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
      }
    }
  };

  // Toggle Project Services tag selection
  const handleServiceCheckbox = (srv: string) => {
    if (projServices.includes(srv)) {
      setProjServices(projServices.filter(s => s !== srv));
    } else {
      setProjServices([...projServices, srv]);
    }
  };


  // --- PRODUCT ACTIONS ---
  const initiateEditProduct = (p: Product) => {
    setEditingProduct(p);
    setIsCreatingProduct(false);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdIconType(p.iconType);
    setProdImageBg(p.imageBg);
    setProdIsNew(!!p.isNew);
  };

  const initiateNewProduct = () => {
    setEditingProduct(null);
    setIsCreatingProduct(true);
    setProdName('');
    setProdCategory('Beds');
    setProdPrice(150000);
    setProdIconType('bed');
    setProdImageBg('linear-gradient(135deg, var(--color-brand-sand) 0%, var(--color-brand-base) 100%)');
    setProdIsNew(true);
  };

  const cancelProductForm = () => {
    setIsCreatingProduct(false);
    setEditingProduct(null);
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice) {
      alert('Please fill out all product details.');
      return;
    }

    try {
      if (editingProduct) {
        // Editing Mode
        const updatedProd: Product = {
          ...editingProduct,
          name: prodName.trim(),
          category: prodCategory,
          price: Number(prodPrice),
          iconType: prodIconType,
          imageBg: prodImageBg,
          isNew: prodIsNew
        };
        await setDoc(doc(db, 'products', editingProduct.id), updatedProd);
        triggerBanner(`Updated product "${prodName}" ✓`);
      } else {
        // Create Mode
        const newProdId = `prod-${Date.now()}`;
        const newProd: Product = {
          id: newProdId,
          name: prodName.trim(),
          category: prodCategory,
          price: Number(prodPrice),
          iconType: prodIconType,
          imageBg: prodImageBg,
          isNew: prodIsNew
        };
        await setDoc(doc(db, 'products', newProdId), newProd);
        triggerBanner(`Added "${prodName}" to the Boutique shop ✓`);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'products');
    }

    setIsCreatingProduct(false);
    setEditingProduct(null);
  };

  const deleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from the retail listings?`)) {
      try {
        await deleteDoc(doc(db, 'products', id));
        triggerBanner(`Deleted product "${name}"`);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
      }
    }
  };

  // Filter logic on Admin Lists
  const filteredProjectsAdmin = projects.filter((p) => {
    const term = projectSearch.toLowerCase();
    return p.title.toLowerCase().includes(term) ||
           p.location.toLowerCase().includes(term) ||
           p.category.toLowerCase().includes(term);
  });

  const filteredProductsAdmin = products.filter((p) => {
    const term = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(term) ||
           p.category.toLowerCase().includes(term);
  });

  // Naira value formatter
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(val);
  };

  // --- RENDERING LOGIN PANEL ---
  if (!isAuthenticated) {
    return (
      <div id="admin-auth-page" className="min-h-screen bg-brand-warm/60 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-brand-base/95 rounded-3xl border border-brand-wood/25 p-8 md:p-12 space-y-8 shadow-xs">
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-base/90 flex items-center justify-center text-brand-wood border border-brand-wood/10">
              <Lock size={18} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-brand-wood font-mono uppercase font-bold block">
                ZANORI SYSTEM PORTAL
              </span>
              <h2 className="font-serif text-3xl font-light text-brand-dark">
                 Director login
              </h2>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed font-sans font-light">
              Access the administrative workstation to edit, append, and curate design case studies and retail boutique catalog products.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase tracking-wider text-brand-dark opacity-80 font-mono font-medium block">
                Administrative passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (Hint: admin)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-wood/25 bg-brand-warm/30 focus:outline-hidden focus:border-brand-bark focus:bg-brand-base/95 text-sm text-brand-dark font-sans"
              />
            </div>

            {authError && (
              <p className="text-xs text-brand-cranberry font-mono bg-brand-cranberry/10 p-2.5 rounded-lg border border-brand-cranberry/20 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={13} />
            </button>
          </form>

          <div className="pt-6 text-center">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors"
            >
              Return to Gallery
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- RENDERING AUTHENTICATED WORKSTATION ---
  return (
    <div id="admin-workstation" className="py-24 md:py-32 bg-brand-warm/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Dynamic Success alert banner */}
        {successMsg && (
          <div className="fixed top-24 right-6 md:right-12 z-50 bg-brand-bark text-brand-base border border-brand-wood/20 p-4 rounded-xl shadow-xl flex items-center space-x-3 text-xs animate-feed-in font-sans">
            <Check size={14} className="text-brand-wood" />
          </div>
        )}

        {/* Page Header */}
        <div className="pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
                WORKSTATION CONSOLE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cranberry/70"></span>
              <span className="text-[9px] uppercase tracking-wider text-brand-bark font-mono font-bold bg-brand-base/90 border border-brand-wood/15 px-2 py-0.5 rounded-full">
                Authenticated
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-5xl font-light text-brand-dark leading-tight">
              Design & Catalog control
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleFactoryReset}
              className="px-4 py-2.5 rounded-full border border-brand-cranberry/20 hover:bg-brand-cranberry/10 text-brand-cranberry text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Restore initial static dataset and wipe edits"
            >
              <RefreshCw size={12} />
              <span>Reset database</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-full border border-brand-wood hover:bg-brand-warm/50 text-brand-dark text-xs font-mono transition-colors cursor-pointer"
            >
              Logout Space
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="px-5 py-2.5 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-xs uppercase tracking-wider font-semibold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Eye size={12} />
              <span>View Gallery</span>
            </button>
          </div>
        </div>

        {/* Console Hub Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Main List Management Panel Frame */}
          <div className="lg:col-span-8 bg-brand-base rounded-2xl border border-brand-wood/15 p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Tab selection panel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div className="flex bg-brand-warm/60 p-1 rounded-full items-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('projects');
                    cancelProjectForm();
                    cancelProductForm();
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-light uppercase tracking-[0.1em] transition-all flex items-center space-x-2 ${
                    activeTab === 'projects'
                      ? 'bg-brand-bark text-brand-sand font-medium shadow-xs'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  <Layers size={12} />
                  <span>Portfolio & Case Studies</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('products');
                    cancelProjectForm();
                    cancelProductForm();
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-light uppercase tracking-[0.1em] transition-all flex items-center space-x-2 ${
                    activeTab === 'products'
                      ? 'bg-brand-bark text-brand-sand font-medium shadow-xs'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  <ShoppingBag size={12} />
                  <span>The Shop Collection</span>
                </button>
              </div>

              {/* Append new Button */}
              {activeTab === 'projects' ? (
                <button
                  type="button"
                  onClick={initiateNewProject}
                  className="px-4 py-2 bg-brand-cranberry hover:bg-brand-bark text-brand-sand rounded-full text-xs font-sans font-medium uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add Case Study</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={initiateNewProduct}
                  className="px-4 py-2 bg-brand-cranberry hover:bg-brand-bark text-brand-sand rounded-full text-xs font-sans font-medium uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add Product</span>
                </button>
              )}
            </div>

            {/* Render Portfolio management panel */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                
                {/* Search projects bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search case studies by title or location..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-brand-wood/25 bg-brand-warm/20 text-xs font-sans focus:outline-hidden focus:border-brand-bark"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted text-[10px] uppercase font-mono tracking-wider font-semibold">
                    {filteredProjectsAdmin.length} Items
                  </span>
                </div>

                {/* List items representation */}
                <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredProjectsAdmin.length > 0 ? (
                    filteredProjectsAdmin.map((proj) => {
                      const isActiveEd = editingProject?.id === proj.id;
                      return (
                        <div
                          key={proj.id}
                          className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isActiveEd 
                              ? 'bg-brand-warm border-brand-wood/40 ring-1 ring-brand-wood/20' 
                              : 'bg-brand-warm/30 rounded-xl border-brand-wood/10 hover:border-brand-wood/25'
                          }`}
                        >
                          <div className="space-y-1.5 max-w-lg">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                                {proj.category}
                              </span>
                              <span>·</span>
                              <span className="text-[10px] font-mono text-brand-bark/85 uppercase">
                                {proj.location}
                              </span>
                              {proj.isFeatured && (
                                <span className="bg-brand-bark text-brand-base text-[8px] font-mono px-2 py-0.5 rounded-md uppercase font-bold tracking-widest leading-none">
                                  Case Study
                                </span>
                              )}
                            </div>
                            <h4 className="font-serif text-lg text-brand-dark leading-tight">{proj.title}</h4>
                            <p className="text-[11px] text-brand-muted line-clamp-2 leading-relaxed">
                              {proj.description}
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.servicesUsed.map((srv, _i) => (
                                <span key={_i} className="text-[8px] font-mono bg-brand-sand/70 px-2 py-0.5 rounded-sm text-brand-bark/80">
                                  {srv}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center space-x-2 sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => initiateEditProject(proj)}
                              className="p-2 border border-brand-wood/25 rounded-lg text-brand-dark hover:bg-brand-wood/10 transition-colors"
                              title="Edit item information"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProject(proj.id, proj.title)}
                              className="p-2 border border-brand-cranberry/30 rounded-lg text-brand-cranberry hover:bg-brand-cranberry/10 transition-colors"
                              title="Delete case study"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 text-xs text-brand-muted">
                      No architecture or case studies match your search filter.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Render Shop Boutique products panel */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                
                {/* Search products bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search shop products by name or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-brand-wood/25 bg-brand-warm/20 text-xs font-sans focus:outline-hidden focus:border-brand-bark"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted text-[10px] uppercase font-mono tracking-wider font-semibold">
                    {filteredProductsAdmin.length} Items
                  </span>
                </div>

                {/* List products layout */}
                <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredProductsAdmin.length > 0 ? (
                    filteredProductsAdmin.map((prod) => {
                      const isActiveEd = editingProduct?.id === prod.id;
                      return (
                        <div
                          key={prod.id}
                          className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isActiveEd 
                              ? 'bg-brand-warm border-brand-wood/80 ring-1 ring-brand-wood/40' 
                              : 'bg-brand-warm/30 rounded-xl border-brand-wood/10 hover:border-brand-wood/25'
                          }`}
                        >
                          <div className="flex items-start space-x-3 text-left">
                            {/* Decorative preview block */}
                            <div className="h-10 w-10 rounded-lg shrink-0 border border-brand-wood/15 flex items-center justify-center text-xs font-semibold capitalize font-mono block relative" style={{ background: prod.imageBg }}>
                              <span className="absolute bottom-1 right-1 text-[7px] text-black/20 uppercase font-bold">{prod.iconType}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                                  {prod.category}
                                </span>
                                {prod.isNew && (
                                  <span className="bg-brand-base/80 text-brand-bark text-[8px] font-mono px-1.5 py-0.2 rounded-sm uppercase">
                                    New
                                  </span>
                                )}
                              </div>
                              <h4 className="font-serif text-[15px] text-brand-dark leading-tight">{prod.name}</h4>
                              <p className="text-xs font-mono font-bold text-brand-bark">
                                {formatNaira(prod.price)}
                              </p>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center space-x-2 sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => initiateEditProduct(prod)}
                              className="p-2 border border-brand-wood/25 rounded-lg text-brand-dark hover:bg-brand-wood/10 transition-colors"
                              title="Edit item properties"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(prod.id, prod.name)}
                              className="p-2 border border-red-200 rounded-lg text-red-650 hover:bg-red-50 transition-colors"
                              title="Delete boutique product"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 text-xs text-brand-muted">
                      No heirloom boutique products match your search filter.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Right Editor Panel Frame (Dynamic based on selected action) */}
          <div className="lg:col-span-4 bg-brand-sand rounded-2xl border border-brand-wood/15 p-6 md:p-8 shadow-sm relative overflow-hidden space-y-6">
            
            {/* If neither creating nor editing, show instructions placeholder */}
            {!isCreatingProject && !editingProject && !isCreatingProduct && !editingProduct ? (
              <div className="min-h-[350px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-warm/60 text-brand-wood flex items-center justify-center border border-brand-wood/10">
                  <Database size={16} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg tracking-wider text-brand-dark font-light">
                    Intellectual Property
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed font-sans font-light">
                    Select any case study or retail product to edit, or click the green buttons above to build a brand new listing.
                  </p>
                </div>
              </div>
            ) : (
              // FORM IS ENGAGED - Render Project Form or Product Form
              <>
                {/* Form header */}
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[10px] tracking-widest text-brand-wood uppercase font-mono font-bold block">
                    {editingProject || editingProduct ? 'Curate Workspace Edit' : 'Append New Curation'}
                  </span>
                  <button
                    onClick={() => { cancelProjectForm(); cancelProductForm(); }}
                    className="p-1 hover:bg-brand-warm/50 rounded-full text-brand-muted hover:text-brand-dark transition-all transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* PROJECT WORKSPACE FORM */}
                {(isCreatingProject || editingProject) && (
                  <form onSubmit={saveProject} className="space-y-5">
                    
                    {/* Title */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Architectural Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ikoyi Penthouse Residence"
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Category Tabs
                      </label>
                      <select
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value as PortfolioCategory)}
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark focus:outline-hidden"
                      >
                        <option value="Homes">Homes (Residential)</option>
                        <option value="Commercial">Commercial (Office/Studio)</option>
                        <option value="Designs">Designs (Conceptual)</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Location Region
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lekki, Lagos"
                        value={projLocation}
                        onChange={(e) => setProjLocation(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark"
                      />
                    </div>

                    {/* Services tag Checklist */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Services Used
                      </label>
                      <div className="space-y-1.5 bg-brand-warm/15 p-3 rounded-xl border border-brand-wood/10">
                        {AVAILABLE_SERVICES.map((srv) => {
                          const isChecked = projServices.includes(srv);
                          return (
                            <label key={srv} className="flex items-center space-x-2 text-xs font-sans font-light text-brand-dark/95 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleServiceCheckbox(srv)}
                                className="rounded text-brand-bark focus:ring-brand-wood"
                              />
                              <span>{srv}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image / Gradient specifier */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Aesthetic Visual Background (CSS-Gradient / URL)
                      </label>
                      <input
                        type="text"
                        placeholder="Can be custom gradient or direct image URL path"
                        value={projImageBg}
                        onChange={(e) => setProjImageBg(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-[10px] font-mono text-brand-dark"
                      />
                      
                      {/* Presets Grid */}
                      <span className="text-[8px] text-brand-muted font-mono block">SUGGESTED STUDIO PRESETS:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {GRADIENT_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProjImageBg(preset.value)}
                            className="h-7 rounded-md border border-brand-wood/15 relative overflow-hidden cursor-pointer"
                            style={{ background: preset.value }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Toggle Case Study featured */}
                    <div className="flex items-center space-x-2 bg-brand-warm/15 p-3 rounded-xl border border-brand-wood/10 justify-between">
                      <div className="space-y-0.5 text-left">
                        <label className="text-[10px] uppercase tracking-wider text-brand-dark font-mono font-bold block">
                          Featured Case Study?
                        </label>
                        <span className="text-[9px] text-brand-muted block">Gives premium featured layout focus</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={projIsFeatured}
                        onChange={(e) => setProjIsFeatured(e.target.checked)}
                        className="rounded text-brand-bark focus:ring-brand-wood/50"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Narrative Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mention layout, local timber, light structure..."
                        value={projDescription}
                        onChange={(e) => setProjDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={cancelProjectForm}
                        className="flex-1 py-2.5 border border-brand-wood text-brand-dark hover:bg-brand-warm/50 rounded-full text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand rounded-full text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer text-center"
                      >
                        Save Curation
                      </button>
                    </div>

                  </form>
                )}

                {/* PRODUCT WORKSPACE FORM */}
                {(isCreatingProduct || editingProduct) && (
                  <form onSubmit={saveProduct} className="space-y-5">
                    
                    {/* Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Malmö accent chair"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark"
                      />
                    </div>

                    {/* Category select */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Shop Category
                      </label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value as ShopCategory)}
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark focus:outline-hidden"
                      >
                        <option value="Beds">Beds</option>
                        <option value="Sofas">Sofas</option>
                        <option value="Shelving">Shelving</option>
                        <option value="Tables">Tables</option>
                        <option value="Storage">Storage</option>
                      </select>
                    </div>

                    {/* Price in Naira */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Price (NGN Naira)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 520000"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        required
                        min={1000}
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-mono text-brand-dark"
                      />
                    </div>

                    {/* Icon Type selector */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Representative Icon
                      </label>
                      <select
                        value={prodIconType}
                        onChange={(e) => setProdIconType(e.target.value as Product['iconType'])}
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-xs font-sans text-brand-dark focus:outline-hidden"
                      >
                        <option value="bed">Bed Frame</option>
                        <option value="sofa">Sofa / Cushion</option>
                        <option value="shelving">Shelving Unit</option>
                        <option value="table">Dining Table</option>
                        <option value="storage">Storage Drawer</option>
                      </select>
                    </div>

                    {/* Image / Color specifier */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] uppercase tracking-wider text-brand-dark/80 font-mono font-bold block">
                        Visual Background Gradient
                      </label>
                      <input
                        type="text"
                        placeholder="Pick custom gradient or css rules"
                        value={prodImageBg}
                        onChange={(e) => setProdImageBg(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-brand-wood/25 bg-brand-warm/15 rounded-xl text-[10px] font-mono text-brand-dark"
                      />
                      
                      {/* Presets Grid */}
                      <span className="text-[8px] text-brand-muted font-mono block">SUGGESTED STUDIO PRESETS:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {GRADIENT_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProdImageBg(preset.value)}
                            className="h-7 rounded-md border border-brand-wood/15 relative overflow-hidden cursor-pointer"
                            style={{ background: preset.value }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Toggle New Badge */}
                    <div className="flex items-center space-x-2 bg-brand-warm/15 p-3 rounded-xl border border-brand-wood/10 justify-between">
                      <div className="space-y-0.5 text-left">
                        <label className="text-[10px] uppercase tracking-wider text-brand-dark font-mono font-bold block">
                          Mark as NEW Piece?
                        </label>
                        <span className="text-[9px] text-brand-muted block">Gives a lovely "New" badge alert in boutique</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={prodIsNew}
                        onChange={(e) => setProdIsNew(e.target.checked)}
                        className="rounded text-brand-bark focus:ring-brand-wood/40"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={cancelProductForm}
                        className="flex-1 py-2.5 border border-brand-wood text-brand-dark hover:bg-brand-warm/50 rounded-full text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-brand-bark hover:bg-brand-bark/90 text-brand-sand rounded-full text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer text-center"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  }



