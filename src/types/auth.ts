export type UserRole = 'admin' | 'member' | 'guest';

export interface SavedItinerary {
  id: string;
  title: string;
  destinationName: string;
  destinationSlug: string;
  days: number;
  budgetTier: 'budget' | 'standard' | 'luxury';
  groupType: string;
  travelStyle: string;
  estimatedCost: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  avatar: string;
  phone?: string;
  joinDate: string;
  travelPreferences?: {
    preferredRegion: string;
    travelStyle: string;
    favoriteSeason: string;
  };
  savedItineraries: SavedItinerary[];
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  welcomeEmailSent: boolean;
}
