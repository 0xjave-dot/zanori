import { useState } from 'react';
import { Bed, Sofa, Columns, Layers, Archive, Plus, Search, SlidersHorizontal, Truck, ArrowUpDown, Heart, Gift } from 'lucide-react';
import { PRODUCTS_DATA } from '../data';
import { ShopCategory, Product, WishlistItem } from '../types';

interface ShopProps {
  onAddProductToInquiry: (product: Product) => void;
  onOpenInquiryDrawer: () => void;
  inquiryCount: number;
  products?: Product[];
  wishlist: WishlistItem[];
  onToggleWishlist: (productId: string) => Promise<void>;
  onOpenGiftCheckout: (product: Product) => void;
}

export default function Shop({ 
  onAddProductToInquiry, 
  onOpenInquiryDrawer, 
  inquiryCount, 
  products, 
  wishlist, 
  onToggleWishlist, 
  onOpenGiftCheckout 
}: ShopProps) {
  const [activeTab, setActiveTab] = useState<ShopCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(800000);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  const productsToUse = products || PRODUCTS_DATA;

  // Filter & Search Logic
  let filteredProducts = productsToUse.filter((product) => {
    const matchesCategory = activeTab === 'All' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort Logic
  if (sortBy === 'priceAsc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const categories: ShopCategory[] = ['All', 'Beds', 'Sofas', 'Shelving', 'Tables', 'Storage'];

  // Currency formatter
  const formatNairaVal = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getFurnitureIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed':
        return <Bed className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'sofa':
        return <Sofa className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'shelving':
        return <Layers className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'table':
        return <Columns className="w-8 h-8 text-brand-bark/85 flip-y stroke-[1.25]" />;
      case 'storage':
        return <Archive className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      default:
        return <Layers className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
    }
  };

  const logisticsGuides = [
    { title: "Standard Lagos Delivery", text: "Delivered fully assembled. Island standard transit handles Lekki Phases 1 & 2, Ikoyi, Banana Island, and VI. Mainland serves Ikeja, GRA, Surulere, and Magodo." },
    { title: "Sustainably Sourced Hardwoods", desc: "Our carcasses utilize sustainably logged Nigerian high-grade Mahogany and Tek wood. Standard 5-year structural warranty seals frames seamlessly." }
  ];

  return (
    <div id="shop-page" className="py-24 md:py-32 bg-brand-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Page Header */}
        <div className="pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              ZANORI HEIRLOOM BOUTIQUE
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-dark leading-tight">
              Curated furniture pieces
            </h1>
          </div>
          <p className="max-w-md text-sm text-brand-muted leading-relaxed font-light font-sans">
            Quality pieces you'll keep forever, without the price tag that makes you regret it.
          </p>
        </div>

        {/* Dynamic Interactive Filter Panel toolbar */}
        <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-6 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
            
            {/* Left: Interactive Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pb-4 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
                  className={`py-1.5 px-4 rounded-full text-xs font-light uppercase tracking-[0.12em] transition-all duration-300 ${
                    activeTab === category
                      ? 'text-brand-dark font-medium bg-brand-sand border border-brand-wood/25 shadow-xs'
                      : 'text-brand-muted hover:text-brand-dark bg-transparent border border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right: Real-time search and filter controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={14} />
                <input
                  type="text"
                  placeholder="Search dining, Lund, Oslo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-brand-warm rounded-full border border-brand-wood/20 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark placeholder:text-brand-muted/70"
                />
              </div>

              {/* Sort selector */}
              <div className="relative flex items-center space-x-2 bg-brand-warm rounded-full border border-brand-wood/20 px-3 py-2 text-xs">
                <ArrowUpDown size={12} className="text-brand-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none focus:outline-hidden outline-hidden font-sans text-brand-dark leading-none cursor-pointer"
                >
                  <option value="default">Default Order</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

          {/* Collapsible/Extended Budget Controller Slider */}
          <div className="pt-4 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-wood uppercase font-bold flex items-center space-x-1.5">
              <SlidersHorizontal size={12} />
              <span>Optimize Budget Allocation Limit</span>
            </span>
            <div className="flex items-center space-x-4 w-full sm:w-80">
              <input
                type="range"
                min="100000"
                max="800000"
                step="25000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-wood bg-brand-sand h-1 rounded-full outline-hidden"
              />
              <span className="text-xs font-mono bg-brand-sand border border-brand-wood/15 px-2 py-1 rounded-md text-brand-dark shrink-0 font-medium whitespace-nowrap">
                Under {formatNairaVal(maxPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.productId === product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-brand-base rounded-2xl overflow-hidden border border-brand-wood/10 p-4 pb-6 flex flex-col justify-between transition-all duration-500 hover:shadow-md hover:border-brand-wood/35 shadow-xs"
                >
                  {/* Product Visual Layout */}
                  <div
                    className="relative rounded-xl w-full h-[180px] flex items-center justify-center p-6 overflow-hidden transition-transform duration-500"
                    style={{ background: product.imageBg }}
                  >
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

                    {/* Subtle technical scale background blueprint lines */}
                    <div className="absolute inset-2 border border-brand-dark/5 rounded-lg opacity-40 pointer-events-none"></div>

                    {/* Main furniture icon */}
                    <div className="relative z-10 p-4.5 bg-brand-base/70 backdrop-blur-md rounded-full shadow-xs group-hover:scale-110 transition-transform duration-500">
                      {getFurnitureIcon(product.iconType)}
                    </div>

                    {/* "New In" Label */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-brand-bark text-brand-base text-[9px] uppercase tracking-[0.15em] rounded-md font-medium">
                        New In
                      </span>
                    )}

                    {/* Wishlist Heart Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-brand-base/80 backdrop-blur-sm hover:bg-brand-base transition-all cursor-pointer shadow-xs hover:scale-115 active:scale-90"
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart size={12} className={`transition-colors duration-350 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-brand-muted hover:text-brand-dark'}`} />
                    </button>
                    
                    {/* Visual Label */}
                    <span className="absolute bottom-2.5 right-3 font-mono text-[83px] leading-none text-brand-dark/5 select-none font-bold">
                      {product.category.substring(0, 3).toUpperCase()}
                    </span>
                  </div>

                  {/* Product Metadata & Action */}
                  <div className="mt-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-brand-muted font-light block">
                        {product.category} &bull; Lagos Curated
                      </span>
                      <h3 className="font-serif text-lg font-light text-brand-dark leading-snug group-hover:text-brand-bark transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 gap-2">
                      <span className="text-sm font-medium text-brand-dark tracking-wide font-sans">
                        {formatNairaVal(product.price)}
                      </span>
                      
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => onAddProductToInquiry(product)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-brand-warm hover:bg-brand-dark text-brand-dark hover:text-brand-base text-[9px] uppercase tracking-[0.11em] font-medium transition-all duration-300 cursor-pointer"
                          title="Inquire"
                        >
                          <Plus size={9} />
                          <span>Inquire</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenGiftCheckout(product)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-brand-warm hover:bg-brand-wood text-brand-wood hover:text-white text-[9px] uppercase tracking-[0.11em] font-semibold transition-all duration-350 cursor-pointer"
                          title="Buy as Gift"
                        >
                          <Gift size={9} />
                          <span>Gift</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
            <h3 className="font-serif text-2xl font-light text-brand-dark">No pieces match your filters</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Try adjusting your price optimizer bar or clearing the text search to inspect more items in our boutique.
            </p>
            <button
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
                setMaxPrice(800000);
              }}
              className="mt-4 px-5 py-2 rounded-full border border-brand-bark/30 text-[10px] uppercase tracking-wider text-brand-bark hover:bg-brand-warm transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Expanded delivery terms and boutique standards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {logisticsGuides.map((guide, i) => (
            <div key={i} className="bg-brand-base rounded-2xl p-6 border border-brand-wood/10 flex items-start space-x-4">
              <div className="p-3 bg-brand-warm text-brand-bark rounded-xl">
                <Truck size={18} className="stroke-[1.3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-[17px] font-medium text-brand-dark">{guide.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed font-sans font-light">
                  {'text' in guide ? guide.text : guide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

