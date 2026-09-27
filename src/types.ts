export type Role = 'organizer' | 'attendee';

export type NavTab = 'create-event' | 'post-builder' | 'drafts' | 'analytics';

export type EventFormat = 'In-Person' | 'Hybrid' | 'Virtual' | 'LinkedIn Audio';

export interface TicketTier {
  id: string;
  name: string;
  badge: string;
  description: string;
  price: number;
  features?: string[];
  seatsLeft?: string;
  badgeCode: string;
}

export interface AttendeeInfo {
  name: string;
  email: string;
  headline: string;
  linkedinUrl: string;
  avatarUrl: string;
  tierId: string;
  tags: string[];
  publicDirectory: boolean;
  passNumber: string;
  seat: string;
  zone: string;
  gate: string;
  cryptoSig: string;
}

export interface EventInfo {
  title: string;
  format: EventFormat;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  locationName: string;
  locationAddress: string;
  locationFeatures: string[];
  tags: string[];
  activeHashtags: string[];
  linkedinUrl: string;
  ticketUrl: string;
  twitterUrl: string;
  notionUrl: string;
  hostName: string;
  hostTitle: string;
  hostAvatar: string;
  registeredCount: number;
  connectionCount: number;
}

export interface TrendingHashtag {
  tag: string;
  followers: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  avatar: string;
  read: boolean;
}
