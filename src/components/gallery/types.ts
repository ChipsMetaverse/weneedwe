
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  // Animation and styling options
  animation?: 'fade' | 'scale' | 'slide' | 'none';
  hoverEffect?: 'zoom' | 'lift' | 'glow' | 'none';
  textPosition?: 'bottom' | 'center' | 'overlay';
  aspectRatio?: string;
  cornerRadius?: string;
  shadowSize?: string;
  gradientOpacity?: string;
  textTheme?: 'light' | 'dark';
}

export type GalleryCategory = string;
