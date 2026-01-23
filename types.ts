
export type ExpertLevel = 'Beginner' | 'Pro' | 'Master';
export type ProductCategory = 'Marketing' | 'Business' | 'Creative' | 'Productivity' | 'Developer' | 'Education';

export interface DownloadResource {
  name: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  expertLevel: ExpertLevel;
  compatibleModels: string[]; // e.g., GPT-4, Claude 3.5, Gemini Pro
  productType: 'Prompt' | 'Prompt Package' | 'AI Marketing Prompts';
  tokenCount?: number;
  promptCount?: number | string; // Updated to allow strings like "20+"
  version?: string;
  format?: string; // New field for file format (e.g., PDF, JSON)
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  // New Fields
  features?: {
    title: string;
    description: string;
  }[];
  exampleOutputs?: {
    title: string;
    content: string;
  }[];
  downloadResources?: DownloadResource[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  avatar: string;
  purchasedPrompts: string[]; // Products with available resources
  pendingPrompts?: string[]; // Products ordered but resources not yet available
  createdAt: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
  purchaseTimestamp?: string; // When payment was made
  resourcesAvailableAt?: string; // When resources will be unlocked (payment + 3 hours)
}