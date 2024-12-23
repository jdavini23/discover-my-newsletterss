export interface Newsletter {
  id: string;
  title: string;
  description: string;
  author: string;
  url: string;
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  subscribers: number;
  price: {
    amount: number;
    currency: string;
    interval?: 'monthly' | 'yearly';
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSearchFilters {
  query?: string;
  categories?: string[];
  frequency?: Newsletter['frequency'][];
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'popularity' | 'price' | 'date' | 'subscribers';
  page?: number;
  limit?: number;
}

export interface NewsletterSearchResponse {
  newsletters: Newsletter[];
  total: number;
  page: number;
  totalPages: number;
}
