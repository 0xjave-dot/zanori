export type PortfolioCategory = 'All' | 'Homes' | 'Commercial' | 'Designs';
export type ShopCategory = 'All' | 'Beds' | 'Sofas' | 'Shelving' | 'Tables' | 'Storage';

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
  imageBg: string; // Color gradient specifier representational for Lagos vibe
  isFeatured?: boolean;
}

export interface Product {
  id: string;
  category: ShopCategory;
  name: string;
  price: number;
  imageBg: string;
  iconType: 'bed' | 'sofa' | 'shelving' | 'table' | 'storage';
  isNew?: boolean;
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
