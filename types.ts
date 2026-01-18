
export enum EventType {
  PLANET = 'Planet',
  MOON = 'Moon',
  NEBULA = 'Nebula',
  STATION = 'Station',
  PHENOMENON = 'Phenomenon'
}

export interface HostInfo {
  name: string;
  avatarId: string;
  isSuperhost: boolean;
  reviewsCount: number;
  rating: number;
  yearsExperience: number;
  bio: string;
}

export interface SpaceEvent {
  id: string;
  title: string;
  date: string; // ISO string
  type: EventType;
  description: string;
  location?: string;
  agency?: string;
  link?: string;
  image?: string;
  host?: HostInfo;
  metadata?: {
    rarity: number;
    visibility: string;
    searchKeyword?: string;
    photoId?: string;
  };
}

export interface CalendarState {
  currentMonth: Date;
  selectedDate: Date | null;
  events: SpaceEvent[];
  isLoading: boolean;
}
