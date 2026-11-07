export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  userVotedHelpful?: boolean;
  bearAdopted: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'Heirloom Bears' | 'Polar & Arctic' | 'Giant Plush' | 'Accessories & Care' | 'Limited Editions';
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  stockCount: number;
  lowStockThreshold: number;
  inStock: boolean;
  badge?: string;
  description: string;
  story: string;
  dimensions: string;
  weight: string;
  materials: string[];
  careInstructions: string;
  imageUrl: string;
  additionalImages?: string[];
  customizable: boolean; // supports paw embroidery
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customEmbroidery?: string; // e.g. "Oliver · 2026"
  giftWrap?: boolean;
}

export interface TrackingStage {
  title: string;
  description: string;
  timestamp: string;
  location: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    deliveryNotes?: string;
  };
  items: CartItem[];
  shippingMethod: {
    id: string;
    name: string;
    estimatedDays: string;
    price: number;
  };
  payment: {
    method: 'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna' | 'crypto';
    cardLast4?: string;
    cardBrand?: string;
    transactionId: string;
    status: 'paid' | 'pending' | 'refunded';
    subtotal: number;
    discountAmount: number;
    discountCode?: string;
    shippingFee: number;
    tax: number;
    total: number;
  };
  tracking: {
    carrier: string;
    currentStageIndex: number; // 0..5
    estimatedDelivery: string;
    stages: TrackingStage[];
    courier: {
      name: string;
      vehicle: string;
      currentDistanceMiles: number;
      speedMph: number;
      etaMinutes: number;
      statusNote: string;
    };
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  honeyTier: 'Little Cub' | 'Brown Bear' | 'Honey Grizzly VIP';
  honeyPoints: number;
  nextTierPoints: number;
  savedAddresses: Array<{
    id: string;
    label: string;
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }>;
  savedPaymentMethods: Array<{
    id: string;
    type: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
    isDefault: boolean;
  }>;
}
