import { useEffect, useState } from 'react';
import { Bed, Sofa, Columns, Layers, Archive, Plus, Search, SlidersHorizontal, Truck, ArrowUpDown, Heart, Gift, Sparkles, Eye, Download, X } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';
import { PRODUCTS_DATA } from '../data';
import { ShopCategory, Product, WishlistItem, DesignShowcaseItem } from '../types';

interface ShopProps {
  onAddProductToInquiry: (product: Product) => void;
  onOpenInquiryDrawer: () => void;
  inquiryCount: number;
  products?: Product[];
  wishlist: WishlistItem[];
  onToggleWishlist: (productId: string) => Promise<void>;
  onOpenGiftCheckout: (product: Product) => void;
  showcaseItems?: DesignShowcaseItem[];
}

export default function Shop({
  onAddProductToInquiry,
  onOpenInquiryDrawer,
  inquiryCount,
  products,
  wishlist,
  onToggleWishlist,
  onOpenGiftCheckout,
  showcaseItems = []
}: ShopProps) {
  const [activeTab, setActiveTab] = useState<ShopCategory>('All');
  const [activeSection, setActiveSection] = useState<'Furniture' | 'Designs'>('Furniture');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [designFilter, setDesignFilter] = useState<'All' | 'Plain Design' | '3D Design'>('All');
  const [designAccessFilter, setDesignAccessFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<DesignShowcaseItem | null>(null);

  const productsToUse = products || PRODUCTS_DATA;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const requestedProductId = searchParams.get('product');
    if (!requestedProductId) return;

    const matchedProduct = productsToUse.find((product) => product.id === requestedProductId);
    if (matchedProduct) {
      setSelectedProduct(matchedProduct);
    }
  }, [productsToUse]);

  const handleProductInquiry = (product: Product) => {
    onAddProductToInquiry(product);

    if (typeof window === 'undefined') return;

    const productLink = `${window.location.origin}/#/shop?product=${encodeURIComponent(product.id)}`;
    const message = `Hello Zanori Spaces! I'm interested in ${product.name}. Please share availability, pricing, and delivery details for this piece. Product link: ${productLink}`;
    const whatsappUrl = `https://wa.me/2349130377554?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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

  const categories: ShopCategory[] = [
    'All',
    'Sofas',
    'Sectionals',
    'Accent Chairs',
    'Coffee Tables',
    'Dining Tables',
    'Dining Chairs',
    'Office Chairs',
    'Office Desks',
    'Beds',
    'Wardrobes',
    'TV Consoles',
    'Side Tables',
    'Bookshelves',
    'Cabinets',
    'Dressers',
    'Outdoor Furniture',
    'Lighting',
    'Decor',
    'Storage Furniture',
  ];
  const sections: Array<'Furniture' | 'Designs'> = ['Furniture', 'Designs'];

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
      case 'chair':
        return <Sofa className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'lamp':
        return <Sparkles className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'outdoor':
        return <Layers className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      case 'decor':
        return <Archive className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
      default:
        return <Layers className="w-8 h-8 text-brand-bark/85 stroke-[1.25]" />;
    }
  };

  const logisticsGuides = [
    { title: "Standard Delivery", text: "Delivered fully assembled. " },
    { title: "Sustainably Sourced Hardwoods", desc: "We make use of sustainably logged high-grade wood." }
  ];

  return (
    <div id="shop-page" className="py-24 md:py-32 bg-brand-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

        {/* Page Header */}
        <div className="pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">

            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-dark leading-tight">
              Timeless Furniture pieces &  Designs 
            </h1>
          </div>
          <p className="max-w-md text-sm text-brand-muted leading-relaxed font-light font-sans">
            Quality pieces you'll keep forever, without the price tag that makes you regret it.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`py-2 px-4 rounded-full text-xs font-light uppercase tracking-[0.16em] transition-all duration-300 ${activeSection === section
                ? 'text-brand-dark font-medium bg-brand-sand border border-brand-wood/25 shadow-xs'
                : 'text-brand-muted hover:text-brand-dark bg-transparent border border-transparent'
                }`}
            >
              {section}
            </button>
          ))}
        </div>

        {activeSection === 'Furniture' ? (
          <>
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
                      className={`py-1.5 px-4 rounded-full text-xs font-light uppercase tracking-[0.12em] transition-all duration-300 ${activeTab === category
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
                    max="5000000"
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
                  const hasUploadedImage = Array.isArray(product.images) && product.images.length > 0;
                  const primaryImage = hasUploadedImage ? product.images![0] : '';
                  const cardBackground = primaryImage ? `url('${primaryImage}') center/cover` : product.imageBg;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-brand-base rounded-2xl overflow-hidden border border-brand-wood/10 p-4 pb-6 flex flex-col justify-between text-left transition-all duration-500 hover:shadow-md hover:border-brand-wood/35 shadow-xs"
                    >
                      {/* Product Visual Layout */}
                      <div
                        className="relative rounded-xl w-full h-[180px] flex items-center justify-center p-6 overflow-hidden transition-transform duration-500"
                        style={{ background: cardBackground }}
                      >
                        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

                        {/* Subtle technical scale background blueprint lines */}
                        <div className="absolute inset-2 border border-brand-dark/5 rounded-lg opacity-40 pointer-events-none"></div>

                        {/* Main furniture icon */}
                        {!hasUploadedImage && (
                          <div className="relative z-10 p-4.5 bg-brand-base/70 backdrop-blur-md rounded-full shadow-xs group-hover:scale-110 transition-transform duration-500">
                            {getFurnitureIcon(product.iconType)}
                          </div>
                        )}

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
                          {product.brand && (
                            <p className="text-[10px] uppercase tracking-[0.12em] text-brand-muted">
                              {product.brand}{product.sku ? ` · ${product.sku}` : ''}
                            </p>
                          )}
                          {product.dimensions && (
                            <p className="text-[10px] text-brand-muted font-sans">{product.dimensions}</p>
                          )}
                          {product.specSheetUrl && (
                            <a
                              href={product.specSheetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] uppercase tracking-[0.1em] text-brand-bark hover:text-brand-dark underline underline-offset-2"
                            >
                              Specification sheet
                            </a>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 gap-2">
                          <span className="text-sm font-medium text-brand-dark tracking-wide font-sans">
                            {product.salePrice && product.retailPrice && product.salePrice < product.retailPrice ? (
                              <span className="flex flex-col">
                                <span className="text-[10px] text-brand-muted line-through">
                                  {formatNairaVal(product.retailPrice)}
                                </span>
                                <span>{formatNairaVal(product.salePrice)}</span>
                              </span>
                            ) : formatNairaVal(product.price)}
                          </span>

                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => handleProductInquiry(product)}
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
                    </button>
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
                    setMaxPrice(5000000);
                  }}
                  className="mt-4 px-5 py-2 rounded-full border border-brand-bark/30 text-[10px] uppercase tracking-wider text-brand-bark hover:bg-brand-warm transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-6 space-y-6">
              <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
                <div className="flex flex-wrap items-center gap-1.5 pb-4 lg:pb-0">
                  {(['All', 'Plain Design', '3D Design'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setDesignFilter(filter)}
                      className={`py-1.5 px-4 rounded-full text-xs font-light uppercase tracking-[0.12em] transition-all duration-300 ${designFilter === filter
                        ? 'text-brand-dark font-medium bg-brand-sand border border-brand-wood/25 shadow-xs'
                        : 'text-brand-muted hover:text-brand-dark bg-transparent border border-transparent'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={14} />
                    <input
                      type="text"
                      placeholder="Search concept, moodboard..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-brand-warm rounded-full border border-brand-wood/20 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark placeholder:text-brand-muted/70"
                    />
                  </div>

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

              <div className="pt-4 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-widest text-brand-wood uppercase font-bold flex items-center space-x-1.5">
                  <SlidersHorizontal size={12} />
                  <span>Filter by access and budget</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {(['All', 'Free', 'Paid'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setDesignAccessFilter(filter)}
                      className={`py-1.5 px-3 rounded-full text-[10px] font-light uppercase tracking-[0.12em] transition-all duration-300 ${designAccessFilter === filter
                        ? 'text-brand-dark font-medium bg-brand-sand border border-brand-wood/25 shadow-xs'
                        : 'text-brand-muted hover:text-brand-dark bg-transparent border border-transparent'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-80">
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="25000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-brand-wood bg-brand-sand h-1 rounded-full outline-hidden"
                  />
                  <span className="text-xs font-mono bg-brand-sand border border-brand-wood/15 px-2 py-1 rounded-md text-brand-dark shrink-0 font-medium whitespace-nowrap">
                    {maxPrice === 0 ? 'Free only' : `Under ${formatNairaVal(maxPrice)}`}
                  </span>
                </div>
              </div>
            </div>

            {(() => {
              let filteredDesigns = showcaseItems.filter((item) => {
                const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.assetType.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesType = designFilter === 'All' || item.assetType === designFilter;
                const matchesAccess = designAccessFilter === 'All' || item.accessType === designAccessFilter;
                const matchesPrice = item.price <= maxPrice && (maxPrice > 0 || item.accessType === 'Free');
                return matchesSearch && matchesType && matchesAccess && matchesPrice;
              });

              if (sortBy === 'priceAsc') {
                filteredDesigns = [...filteredDesigns].sort((a, b) => a.price - b.price);
              } else if (sortBy === 'priceDesc') {
                filteredDesigns = [...filteredDesigns].sort((a, b) => b.price - a.price);
              }

              return filteredDesigns.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {filteredDesigns.map((item) => (
                    <div
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedDesign(item)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedDesign(item);
                        }
                      }}
                      className="group bg-brand-base rounded-2xl overflow-hidden border border-brand-wood/10 p-3 pb-5 flex flex-col justify-between transition-all duration-500 hover:shadow-md hover:border-brand-wood/35 shadow-xs cursor-pointer"
                    >
                      <div
                        className="relative rounded-xl w-full h-[140px] flex items-center justify-center p-4 overflow-hidden transition-transform duration-500"
                        style={{ background: item.imageUrl ? `url('${item.imageUrl}') center/cover` : item.imageBg }}
                      >
                        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                        <div className="absolute inset-2 border border-brand-dark/5 rounded-lg opacity-40 pointer-events-none"></div>
                        <div className="relative z-10 px-3 py-2 rounded-full bg-brand-base/80 backdrop-blur-sm text-[10px] uppercase tracking-[0.16em] text-brand-bark font-medium">
                          {item.assetType}
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedDesign(item);
                          }}
                          className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full border border-brand-base/70 bg-brand-base/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-brand-dark shadow-sm transition hover:bg-brand-warm"
                        >
                          <Eye size={10} />
                          Preview
                        </button>
                      </div>

                      <div className="mt-4 space-y-3 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-brand-muted font-light block">
                            {item.accessType} Access
                          </span>
                          <h3 className="font-serif text-base font-light text-brand-dark leading-snug">{item.title}</h3>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-brand-muted">
                            {[item.category, item.designStyle, item.format].filter(Boolean).join(' · ')}
                          </p>
                          {item.numberOfRooms && (
                            <p className="text-[10px] text-brand-muted">
                              {item.numberOfRooms} room{item.numberOfRooms === 1 ? '' : 's'}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-brand-muted leading-relaxed font-sans">{item.description}</p>

                        <div className="flex items-center justify-between pt-2 gap-2">
                          <span className="text-sm font-medium text-brand-dark tracking-wide font-sans">
                            {item.accessType === 'Free' ? 'Free access' : formatNairaVal(item.price)}
                          </span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedDesign(item);
                              }}
                              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-brand-warm hover:bg-brand-dark text-brand-dark hover:text-brand-base text-[9px] uppercase tracking-[0.11em] font-medium transition-all duration-300 cursor-pointer"
                            >
                              <Eye size={10} />
                              <span>Preview</span>
                            </button>
                            {item.fileUrl ? (
                              <a
                                href={item.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-brand-warm hover:bg-brand-wood text-brand-wood hover:text-white text-[9px] uppercase tracking-[0.11em] font-semibold transition-all duration-300 cursor-pointer"
                              >
                                <Download size={10} />
                                <span>Download</span>
                              </a>
                            ) : (
                              <span className="px-2.5 py-1.5 rounded-full bg-brand-warm text-brand-dark text-[9px] uppercase tracking-[0.11em] font-medium">
                                Coming soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
                  <h3 className="font-serif text-2xl font-light text-brand-dark">No design assets match your filters</h3>
                  <p className="text-xs text-brand-muted max-w-sm mx-auto">
                    Try adjusting the design type, access mode, or budget filter to explore more concepts.
                  </p>
                  <button
                    onClick={() => {
                      setDesignFilter('All');
                      setDesignAccessFilter('All');
                      setSearchQuery('');
                      setMaxPrice(5000000);
                    }}
                    className="mt-4 px-5 py-2 rounded-full border border-brand-bark/30 text-[10px] uppercase tracking-wider text-brand-bark hover:bg-brand-warm transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              );
            })()}
          </>
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

      {selectedDesign && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/80 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-brand-wood/20 bg-brand-base shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDesign(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-brand-wood/20 bg-brand-base/90 p-2 text-brand-dark transition hover:bg-brand-warm"
              aria-label="Close design preview"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-brand-warm/50 p-4 md:min-h-[460px]">
                {selectedDesign.fileUrl?.includes('kuula.co/share') ? (
                  <iframe
                    src={selectedDesign.fileUrl}
                    title={selectedDesign.title}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                ) : selectedDesign.imageUrl || selectedDesign.imageBg ? (
                  <img
                    src={selectedDesign.imageUrl || selectedDesign.fileUrl}
                    alt={selectedDesign.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-warm to-brand-base p-8 text-center">
                    <p className="max-w-sm text-sm leading-relaxed text-brand-muted">
                      This asset is ready for review. Open the download option when you are ready to take it with you.
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {selectedDesign.assetType}
                    </span>
                    <span className="rounded-full bg-brand-bark px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-base">
                      {selectedDesign.accessType} access
                    </span>
                  </div>

                  <div className="space-y-2 text-white">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-wood/90">Preview before download</p>
                    <h3 className="font-serif text-3xl font-light leading-tight">{selectedDesign.title}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-brand-warm/35 p-6 md:p-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-brand-bark">Design preview</p>
                    <h4 className="font-serif text-2xl font-light text-brand-dark">{selectedDesign.title}</h4>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">
                      {[selectedDesign.category, selectedDesign.designStyle, selectedDesign.format].filter(Boolean).join(' · ')}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-brand-muted">
                    <p className="leading-relaxed">{selectedDesign.description}</p>
                    <div className="rounded-2xl border border-brand-wood/15 bg-brand-base/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bark">Included details</p>
                      <p className="mt-2 text-sm text-brand-dark">
                        {selectedDesign.numberOfRooms ? `${selectedDesign.numberOfRooms} room${selectedDesign.numberOfRooms === 1 ? '' : 's'} · ` : ''}
                        {selectedDesign.accessType === 'Free' ? 'Free to review and download' : `Available for ${formatNairaVal(selectedDesign.price)}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {selectedDesign.fileUrl ? (
                    <a
                      href={selectedDesign.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-brand-base transition hover:bg-brand-wood hover:text-brand-dark"
                    >
                      <Download size={14} />
                      Download asset
                    </a>
                  ) : (
                    <div className="flex flex-1 items-center justify-center rounded-full border border-brand-dark/20 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-brand-dark">
                      Download coming soon
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedDesign(null)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-dark/20 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-brand-dark transition hover:border-brand-bark hover:bg-brand-warm"
                  >
                    Close preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddProductToInquiry={onAddProductToInquiry}
          onOpenGiftCheckout={onOpenGiftCheckout}
        />
      )}
    </div>
  );
}

