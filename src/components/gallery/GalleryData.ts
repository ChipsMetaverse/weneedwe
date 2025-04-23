import { GalleryItem } from './types';
import { galleryPhotos } from '@/data/siteData';

// Convert the gallery photos from siteData to the GalleryItem format
export const galleryItems: GalleryItem[] = galleryPhotos.map(photo => ({
  id: photo.id,
  title: photo.title,
  description: photo.description,
  imageUrl: photo.imageUrl,
  category: photo.category,
  date: photo.date
}));

// Extract unique categories for filtering
export const allCategories = ['All', ...new Set(galleryItems.map(item => item.category))];