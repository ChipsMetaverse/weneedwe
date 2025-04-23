import imagesData from '../../public/images.json';

/**
 * Utility for loading images with fallback options
 */
interface ImageData {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Get image data from the images.json file
 * @param collection - The collection name in the images.json file
 * @param id - The id of the image within that collection
 * @returns The image data object with src, alt, and optional caption
 */
export const getImageByIdFromCollection = (
  collection: 'gallery' | 'programs' | 'team' | 'homepage',
  id: string
): ImageData | null => {
  try {
    // Cast to any to handle dynamic property access
    const collectionData = (imagesData as any)[collection];
    
    if (!collectionData) {
      console.warn(`Collection '${collection}' not found in images.json`);
      return null;
    }

    if (collection === 'homepage') {
      const homepageData = collectionData as Record<string, ImageData>;
      return homepageData[id] || null;
    }

    const item = collectionData.find((item: any) => item.id === id);
    
    if (!item) {
      console.warn(`Image with id '${id}' not found in collection '${collection}'`);
      return null;
    }
    
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption
    };
  } catch (error) {
    console.error('Error loading image data:', error);
    return null;
  }
};

/**
 * Get all images from a specific collection
 * @param collection - The collection name in the images.json file
 * @returns Array of image data objects
 */
export const getAllImagesFromCollection = (
  collection: 'gallery' | 'programs' | 'team'
): ImageData[] => {
  try {
    // Cast to any to handle dynamic property access
    const collectionData = (imagesData as any)[collection];
    
    if (!collectionData || !Array.isArray(collectionData)) {
      console.warn(`Collection '${collection}' not found or not an array in images.json`);
      return [];
    }
    
    return collectionData.map((item: any) => ({
      src: item.src,
      alt: item.alt,
      caption: item.caption
    }));
  } catch (error) {
    console.error('Error loading image collection:', error);
    return [];
  }
};

/**
 * Get a fallback image URL for a specific collection
 * @param collection - The type of content needing a fallback image
 * @returns A fallback image URL
 */
export const getFallbackImage = (type: 'profile' | 'program' | 'gallery' | 'hero'): string => {
  const fallbacks = {
    profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
    program: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=400',
    gallery: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=400',
    hero: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000'
  };
  
  return fallbacks[type];
};

/**
 * Main function to get image data with fallback handling
 * @param collection - The collection to look in
 * @param id - The image ID to retrieve
 * @param fallbackType - The type of fallback to use if not found
 * @returns Image data with fallback applied if needed
 */
export const getImage = (
  collection: 'gallery' | 'programs' | 'team' | 'homepage',
  id: string,
  fallbackType: 'profile' | 'program' | 'gallery' | 'hero' = 'gallery'
): ImageData => {
  const image = getImageByIdFromCollection(collection, id);
  
  if (image) {
    return image;
  }
  
  // Provide a fallback
  return {
    src: getFallbackImage(fallbackType),
    alt: `Fallback image for ${id} in ${collection}`
  };
};

export default {
  getImage,
  getAllImagesFromCollection,
  getFallbackImage
}; 