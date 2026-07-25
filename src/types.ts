export type PortfolioCategory = 'All' | 'Homes' | 'Commercial' | 'Designs';
export type ShopCategory =
  | 'All'
  | 'Sofas'
  | 'Sectionals'
  | 'Accent Chairs'
  | 'Coffee Tables'
  | 'Dining Tables'
  | 'Dining Chairs'
  | 'Office Chairs'
  | 'Office Desks'
  | 'Beds'
  | 'Wardrobes'
  | 'TV Consoles'
  | 'Side Tables'
  | 'Bookshelves'
  | 'Cabinets'
  | 'Dressers'
  | 'Outdoor Furniture'
  | 'Lighting'
  | 'Decor'
  | 'Storage Furniture'
  // Retained for backwards compatibility with existing Firestore records.
  | 'Tables'
  | 'Shelving'
  | 'Storage'
  | 'Chairs'
  | 'Outdoor';

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
  imageBg: string; // Tailored gradients
  isSignature?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: PortfolioCategory;
  location: string;
  servicesUsed: string[];
  description: string;
  imageBg: string;
  images?: string[];   // ordered array of base64/URL images; first becomes imageBg
  isFeatured?: boolean;
}

export interface Product {
  id: string;
  category: ShopCategory;
  name: string;
  price: number;
  description?: string;
  dimensions?: string;
  materials?: string[];
  colours?: string[];
  retailPrice?: number;
  salePrice?: number;
  sku?: string;
  brand?: string;
  stockQuantity?: number;
  specSheetUrl?: string;
  sourceUrl?: string;
  imageBg: string;
  images?: string[];   // ordered array of base64/URL images; first becomes imageBg
  iconType: 'bed' | 'sofa' | 'shelving' | 'table' | 'storage' | 'chair' | 'lamp' | 'outdoor' | 'decor';
  isNew?: boolean;
}

export interface DesignShowcaseItem {
  id: string;
  title: string;
  description: string;
  assetType: 'Plain Design' | '3D Design';
  format?: string;
  category?: string;
  designStyle?: 'Modern' | 'Contemporary' | 'Scandinavian' | 'Industrial' | 'Minimalist' | 'Luxury' | 'Traditional';
  numberOfRooms?: number;
  accessType: 'Free' | 'Paid';
  price: number;
  imageBg: string;
  imageUrl?: string;
  fileUrl?: string;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
}

export interface TestimonialItem {
  quote: string;
  client: string;
  project: string;
}

export interface InquiryFormData {
  name: string;
  contact: string; // Email or WhatsApp
  service: string;
  budget: string;
  brief: string;
}

export interface SavedDesign {
  id: string;
  userId: string;
  styleName: string;
  headline: string;
  palette: string[];
  paletteNames: string[];
  designerNote: string;
  imageUrl: string;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

export interface GiftPurchase {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  price: number;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryAddress: string;
  personalMsg: string;
  giftWrap: boolean;
  purchasedAt: string;
  status: 'Pending Delivery' | 'Shipped' | 'Delivered';
}
