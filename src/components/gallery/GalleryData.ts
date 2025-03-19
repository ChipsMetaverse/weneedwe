
import { GalleryItem } from './types';

// Real gallery items with local image paths
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Community Food Drive',
    description: 'Providing meals to families in need throughout the community. Our monthly food drives help ensure no family goes hungry.',
    imageUrl: '/photos/1c385c77-1c79-4e16-bf82-9f29677b32a6.webp', // Food drive image
    category: 'Events',
    date: '2024-05-12'
  },
  {
    id: 2,
    title: 'Youth Education Program',
    description: 'Supporting the educational development of underserved youth with after-school programs, mentorship, and learning resources.',
    imageUrl: '/photos/2959ab36-6657-40bf-8a8e-9a541f3e28a7.webp', // Youth education image
    category: 'Programs',
    date: '2024-04-28'
  },
  {
    id: 3,
    title: 'Senior Community Support',
    description: 'Providing companionship and assistance to elderly community members through our volunteer network and regular check-ins.',
    imageUrl: '/photos/3b2354da-1232-4b42-aed6-666c76648ee0.webp', // Senior support image
    category: 'Services',
    date: '2024-06-03'
  },
  {
    id: 4,
    title: 'Healthcare Outreach',
    description: 'Making healthcare accessible to all community members through mobile clinics, health education, and screening programs.',
    imageUrl: '/photos/04e7dda9-6f51-47a6-8a6e-5525a4f77623.webp', // Healthcare image
    category: 'Services',
    date: '2024-05-22'
  },
  {
    id: 5,
    title: 'Neighborhood Cleanup',
    description: 'Volunteers working together to improve local neighborhoods through regular cleanup events, beautification, and maintenance.',
    imageUrl: '/photos/6d0c83a6-6696-4e57-84c8-339e101b1483.webp', // Cleanup image
    category: 'Events',
    date: '2024-03-15'
  },
  {
    id: 6,
    title: 'Affordable Housing Initiative',
    description: 'Working to provide safe, affordable housing opportunities through advocacy, partnerships with developers, and community investment.',
    imageUrl: '/photos/7534503d-1c6b-438b-98ea-4f706a856228.webp', // Housing image
    category: 'Programs',
    date: '2024-06-12'
  },
  {
    id: 7,
    title: 'Mental Health Workshop',
    description: 'Breaking stigmas and providing resources for mental wellbeing through educational workshops, support groups, and access to professional care.',
    imageUrl: '/photos/8cf0f025-b7de-4ab8-bcd7-a98ad9e14a0a.webp', // Mental health image
    category: 'Events',
    date: '2024-05-18'
  },
  {
    id: 8,
    title: 'Family Support Services',
    description: 'Comprehensive resources for families in challenging situations including counseling, financial assistance, and parenting workshops.',
    imageUrl: '/photos/c33bfad4-561f-4676-875a-ae1a8bc3f3b1.webp', // Family support image
    category: 'Services',
    date: '2024-04-05'
  },
  {
    id: 9,
    title: 'Community Garden Project',
    description: 'Growing fresh produce and building community connections through urban gardening, sustainability education, and food distribution.',
    imageUrl: '/photos/cfc5e148-bc3e-4f56-9ff1-ca356061a665.webp', // Garden image
    category: 'Programs',
    date: '2024-05-30'
  },
  {
    id: 10,
    title: 'Youth Leadership Summit',
    description: 'Empowering the next generation of community leaders with skills, mentorship, and real-world leadership opportunities.',
    imageUrl: '/photos/e9377f10-a7e5-492b-a09e-7df3e78ebfb3.webp', // Youth leadership image
    category: 'Events',
    date: '2024-07-15'
  }
];

// Extract unique categories for filtering
export const allCategories = ['All', ...new Set(galleryItems.map(item => item.category))];
