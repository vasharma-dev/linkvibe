import { EventInfo } from '../types';

export function generateEventAnnouncementText(event: EventInfo): string {
  const hashtags = event.activeHashtags.length > 0
    ? event.activeHashtags.join(' ')
    : event.tags.join(' ');

  return `🚀 Announcement: ${event.title}

Join us for an exclusive gathering of founders, operators, and AI leaders in NYC!

📅 Date & Time: ${event.startDate} • ${event.startTime} - ${event.endTime} (${event.timezone})
📍 Venue: ${event.locationAddress || event.locationName}
🎟️ Format: ${event.format} Summit
👥 Registered: ${event.registeredCount}+ Founders & Operators Confirmed

Key Discussion Highlights:
→ Architecting defensible AI workflows from MVP to $10M ARR
→ Live teardowns of production agentic graphs & unit economics
→ Private 1:1 curated investor lounges & founder networking

Reserve your admission pass or explore the full agenda here:
🔗 ${event.ticketUrl || event.linkedinUrl}

Hosted by ${event.hostName} (${event.hostTitle}).
See you there!

${hashtags}`;
}

export function getLinkedInFeedShareUrl(text: string): string {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
}

export function getLinkedInOffsiteShareUrl(url: string, title?: string, summary?: string): string {
  const params = new URLSearchParams();
  params.set('url', url);
  if (title) params.set('title', title);
  if (summary) params.set('summary', summary);
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function getLinkedInCreateEventUrl(): string {
  return 'https://www.linkedin.com/events/';
}
