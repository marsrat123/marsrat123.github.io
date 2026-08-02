import { SocialLink } from '../types/web3';

export const SOCIAL_LINKS: Record<string, string> = {
  twitter: 'https://x.com/MarsRat',
  telegram: 'https://t.me/MarsRat',
};

export const SOCIAL_PLATFORMS: SocialLink[] = [
  {
    name: 'X / Twitter',
    url: SOCIAL_LINKS.twitter,
    icon: 'Twitter',
    description: 'Latest mission logs, announcements, and meme contests.',
    featured: true,
  },
  {
    name: 'Telegram',
    url: SOCIAL_LINKS.telegram,
    icon: 'Send',
    description: 'Chat directly with the MarsRat space colony community.',
    featured: true,
  },
];


