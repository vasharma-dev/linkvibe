import { AttendeeInfo, EventInfo, TicketTier, TrendingHashtag } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1U2p6yXRoPRvyjwAHfrlTC5W_JBUfIK3rLXRTW00_XGH6JG9NXO4pFxw1JXfOkmKpqjZPea3Q7pCIhy3D8yqzC9ZN1KD8ASnstVorbpEN2NghrY70yIcFLzRI34lTlIjoNCauJM7LRcRycJ0ZZ8zJiwBCxAoYFVzXqiEayp3U018rSY8Yx3B-H4bAVIxRHLbzHHBJXg8MelQolu-6pHjpWXkVzQ-iThKpt_u52Dn0gP4ocPbclObcQCUDJS',
  hostAvatar: 'https://lh3.googleusercontent.com/aida/AEtjO1VmSa3Ax_VZajHROEZQXr8F8hgHRGMNnwxEvu9341b8bq7Bm4qJHxulKZPokkv_LZ6EbJOooyuQy5KXF4gIdph3GMco0jrHhWciszw1d4KbXcDyQAkdBM0P9A0RDSBt-kej457p2pp7fafG0efeQTxPNUp5Q711r3VVjMitmefpSDwXaH-joTne9vZX3sBYlcnmanE3GUtSQu9S0Ej26qrzgiGGYHDuorDE7BY0LLywH3OB7qK_7fRRzKEL',
  attendeeAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmemXhE75EoaduRqGZKOhqe0yo9XMiO8myMb3tRAdCGXL8zdE04Ttc3PuS01OpRrmG4JgEnxW9kTFRIBkhW5uiL3rZXSsRd8UpKfgps5GL4gQqx0FMqcJlcR_CWItR1atj4ZzzZBrN5lWWhCR0zN3z3DyJ6lNXodk3_3AAhmTeDg-d9RqwZJPwzV9blQpBTuc0N1ztOXhvtOXmkuSrNQT-Izi1SniuNEgb3Wx2AlVDCG8Msko4pTS_Q',
  attendeePassAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXoinstYjS8lF3WcjuDgPEiL7q_cdQ13GdBOqkJ6tZJILFxg55baahFFR4xfTAb_8DBz0d0idljKSeJUScZnChSkIcidsT_sRlTgE2WPUviniZ7r0fJylnhAZkmSSH_NKRK5b4e6Sk7bNKJazBxAye-glO7qnE7kHtdvomm9DE6bbx_wSmQpA1RbbshTGK_xElZR9blVkY6Us-R6WE6fqCT17C5OwMawSErbAStlQSOqnRAOJ11OaZow',
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ubiPFKYUJu_38VU0TT5BWdUMEZWmn6t8edBVeBWeCZb3Hcrhue3Rsbmw93zenU1o__JWb4roY2D47zDzBjmC29SFThst7cPML0PYS__upRb-pj3YLmparpsIjVxY2kpeCu5gStrAw1lHwKJg5sOzwzsnvE6hZxunvcGgd2JC9P9Y6Qf9eJ-65ueuthkbx8SeaSsyIRmJdTXSIqPewKDtDpPtZ9bqgi2Uu6oiMEqiAT8uxeyLqs8W_w'
};

export const INITIAL_EVENT: EventInfo = {
  title: 'GenAI Founders Summit 2025: From MVP to $10M ARR',
  format: 'In-Person',
  startDate: 'Nov 14, 2025',
  startTime: '06:30 PM EST',
  endDate: 'Nov 14, 2025',
  endTime: '09:30 PM EST',
  timezone: 'EST - New York (UTC-5)',
  locationName: 'Javits Center, NYC (Hall E)',
  locationAddress: 'Javits Center, 429 11th Ave, New York, NY 10001',
  locationFeatures: [
    '2 min from 34th St-Hudson Yards Subway',
    'ADA Accessible',
    'Entrance Hall C',
    'Valet & Garage available'
  ],
  tags: [
    '#ArtificialIntelligence',
    '#StartupFounders',
    '#TechNetworking',
    '#GenAI',
    '#NYCStartups'
  ],
  activeHashtags: ['#GenAI', '#SaasFounders', '#NYCStartups'],
  linkedinUrl: 'https://linkedin.com/events/genai-founders-sum',
  ticketUrl: 'https://lu.ma/genai-nyc-2025',
  twitterUrl: 'https://x.com/genaifounders',
  notionUrl: 'https://notion.so/genaifounders/agenda-summit',
  hostName: 'Priya Sharma',
  hostTitle: 'Founder & Host @ LinkVibe',
  hostAvatar: ASSETS.hostAvatar,
  registeredCount: 342,
  connectionCount: 86
};

export const INITIAL_ATTENDEE: AttendeeInfo = {
  name: 'Alex Chen',
  email: 'alex.chen@scalex.ai',
  headline: 'Founding AI Engineer @ ScaleX • Building autonomous agents',
  linkedinUrl: 'alexchen-ai',
  avatarUrl: ASSETS.attendeeAvatar,
  tierId: 'tier-vip',
  tags: ['#GenAI', '#StartupFounders', '#TechNetworking'],
  publicDirectory: true,
  passNumber: 'PASS #LV-2025-8849',
  seat: 'A-14',
  zone: 'LOUNGE & STAGE',
  gate: 'A-EXPRESS',
  cryptoSig: '9f7b-84a1'
};

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'tier-general',
    name: 'General Founder Pass',
    badge: 'Free RSVP',
    description: 'Access to all keynote panels, open expo booths, and community slack.',
    price: 0,
    badgeCode: 'GENERAL ACCESS'
  },
  {
    id: 'tier-vip',
    name: 'VIP Investor & Networking Dinner',
    badge: 'Active',
    description: 'Exclusive Tier 1 access, Private 1:1 VC lounges, curated founder dinner, full recording library, and expedited RFID scan.',
    price: 149,
    features: ['Front-Row Seating', 'Private Dinner Included', 'Only 14 seats left'],
    badgeCode: 'VIP ALL-ACCESS'
  },
  {
    id: 'tier-sponsor',
    name: 'Speaker & Sponsor Delegation',
    badge: 'Application',
    description: 'Backstage green room, booth space, and 5 complimentary executive passes.',
    price: 499,
    badgeCode: 'EXECUTIVE DELEGATION'
  }
];

export const TRENDING_HASHTAGS: TrendingHashtag[] = [
  { tag: '#FounderLife', followers: '1.4M followers' },
  { tag: '#TechCommunity', followers: '890K followers' },
  { tag: '#Innovation2025', followers: '450K followers' },
  { tag: '#NextGenTech', followers: '310K followers' }
];

export const AVAILABLE_TAGS = [
  '#ArtificialIntelligence',
  '#StartupFounders',
  '#TechNetworking',
  '#VentureCapital',
  '#GrowthHacking',
  '#AgenticWorkflows',
  '#SeriesAFunding',
  '#B2BSaaS',
  '#LLMOps',
  '#AngelInvesting'
];

export const PRESET_EVENTS = [
  {
    name: 'GenAI Founders Summit 2025',
    title: 'GenAI Founders Summit 2025: From MVP to $10M ARR',
    location: 'Javits Center, NYC (Hall E)',
    date: 'Nov 14, 2025'
  },
  {
    name: 'NYC AI Investors & Demo Night',
    title: 'NYC AI Investors & Demo Night: Top 10 Seed Startups Live',
    location: 'Spring Studios, Tribeca, NYC',
    date: 'Dec 03, 2025'
  },
  {
    name: 'Autonomous Agents Hackathon & Mixer',
    title: 'Autonomous Agents Hackathon & Mixer: Productionizing LLMs',
    location: 'Google Chelsea Market Pavilion, NYC',
    date: 'Jan 18, 2026'
  }
];

export const MOCK_ATTENDEE_PROFILES = [
  {
    name: 'Alex Chen',
    email: 'alex.chen@scalex.ai',
    headline: 'Founding AI Engineer @ ScaleX • Building autonomous agents',
    linkedinUrl: 'alexchen-ai',
    avatarUrl: ASSETS.attendeeAvatar
  },
  {
    name: 'Sarah Lin, PhD',
    email: 'sarah.lin@cerebralcore.ai',
    headline: 'VP of AI Research @ NeuralGrid • Ex-DeepMind • Forbes 30 Under 30',
    linkedinUrl: 'sarahlin-phd',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Marcus Vance',
    email: 'marcus@vancecapital.vc',
    headline: 'General Partner @ Apex Seed Fund • Investing in Applied AI & Infra',
    linkedinUrl: 'marcus-vance-vc',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];
