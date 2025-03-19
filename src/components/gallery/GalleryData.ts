
import { GalleryItem } from './types';

// Sample gallery items - would be replaced with data from Supabase in production
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Community Food Drive',
    description: 'Providing meals to families in need throughout the community.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?community,food,drive',
    category: 'Events',
    date: '2024-05-12'
  },
  {
    id: 2,
    title: 'Youth Education Program',
    description: 'Supporting the educational development of underserved youth.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?education,youth,classroom',
    category: 'Programs',
    date: '2024-04-28'
  },
  {
    id: 3,
    title: 'Senior Community Support',
    description: 'Providing companionship and assistance to elderly community members.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?elderly,community,support',
    category: 'Services',
    date: '2024-06-03'
  },
  {
    id: 4,
    title: 'Healthcare Outreach',
    description: 'Making healthcare accessible to all community members.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?healthcare,community,clinic',
    category: 'Services',
    date: '2024-05-22'
  },
  {
    id: 5,
    title: 'Neighborhood Cleanup',
    description: 'Volunteers working together to improve local neighborhoods.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?community,cleanup,volunteer',
    category: 'Events',
    date: '2024-03-15'
  },
  {
    id: 6,
    title: 'Affordable Housing Initiative',
    description: 'Working to provide safe, affordable housing opportunities.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?housing,community,building',
    category: 'Programs',
    date: '2024-06-12'
  },
  {
    id: 7,
    title: 'Mental Health Workshop',
    description: 'Breaking stigmas and providing resources for mental wellbeing.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?mental,health,workshop',
    category: 'Events',
    date: '2024-05-18'
  },
  {
    id: 8,
    title: 'Family Support Services',
    description: 'Comprehensive resources for families in challenging situations.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?family,support,community',
    category: 'Services',
    date: '2024-04-05'
  }
];

// Extract unique categories for filtering
export const allCategories = ['All', ...new Set(galleryItems.map(item => item.category))];
