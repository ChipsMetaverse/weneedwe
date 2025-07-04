#!/bin/bash

# Script to set up all media assets for the weneedwe website

echo "=== Setting up media assets for weneedwe.org ==="

# Create directories if they don't exist
echo "Creating necessary directories..."
mkdir -p public/images
mkdir -p src/utils

# Download images
echo "Downloading images from external sources..."
./scripts/download-images.sh

# Check if images.json exists
if [ ! -f "public/images.json" ]; then
  echo "Creating images.json metadata file..."
  cat > public/images.json << EOF
{
  "gallery": [
    {
      "id": "gallery1",
      "src": "/images/gallery1.jpg",
      "alt": "Black women community members participating in a support group",
      "caption": "Our BW-SELF support group in session"
    },
    {
      "id": "gallery2",
      "src": "/images/gallery2.jpg",
      "alt": "HIV awareness workshop with community participants",
      "caption": "Community workshop on HIV education and prevention"
    },
    {
      "id": "gallery3",
      "src": "/images/gallery3.jpg",
      "alt": "Volunteer team at community outreach event",
      "caption": "Our volunteer team working in the community"
    },
    {
      "id": "gallery4",
      "src": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1000",
      "alt": "Women empowerment workshop",
      "caption": "Empowerment workshop for women in our community"
    },
    {
      "id": "gallery5",
      "src": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000",
      "alt": "Professional woman in business attire",
      "caption": "Professional development program participant"
    },
    {
      "id": "gallery6",
      "src": "https://images.unsplash.com/photo-1528205267650-9238f8e97df8?auto=format&fit=crop&q=80&w=1000",
      "alt": "Community gathering with diverse participants",
      "caption": "Our diverse community coming together"
    }
  ],
  "programs": [
    {
      "id": "bw-self",
      "title": "BW-SELF Advocacy",
      "description": "Black Women Supporting Empowering Lifestyle Factors program designed to support women's health and wellness",
      "src": "/images/bw-self-program.jpg",
      "alt": "Black women participating in the BW-SELF program",
      "icon": "Heart"
    },
    {
      "id": "community-health",
      "title": "Community Health Education",
      "description": "Workshops and resources on HIV awareness, prevention, and health education",
      "src": "/images/community-health.jpg",
      "alt": "Community health education workshop",
      "icon": "Stethoscope"
    },
    {
      "id": "education",
      "title": "Education Programs",
      "description": "Educational resources, tutoring, and mentorship for children and adults in underserved communities",
      "src": "/images/education-workshop.jpg",
      "alt": "Education workshop with community participants",
      "icon": "GraduationCap"
    }
  ],
  "team": [
    {
      "id": "member1",
      "name": "Juliet Jones",
      "title": "Director of Risk Reduction",
      "src": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150",
      "alt": "Juliet Jones"
    },
    {
      "id": "member2",
      "name": "Mary Turner",
      "title": "Community Developer",
      "src": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150",
      "alt": "Mary Turner"
    },
    {
      "id": "member3",
      "name": "Laela Ademola",
      "title": "Community Outreach",
      "src": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=150",
      "alt": "Laela Ademola"
    }
  ],
  "homepage": {
    "hero": {
      "src": "/images/community-support.jpg",
      "alt": "Community support event with diverse participants"
    },
    "impact": {
      "src": "/images/impact.jpg",
      "alt": "Our community impact through various programs"
    }
  }
}
EOF
fi

# Check if imageLoader.ts exists
if [ ! -f "src/utils/imageLoader.ts" ]; then
  echo "Creating imageLoader.ts utility..."
  mkdir -p src/utils
  cat > src/utils/imageLoader.ts << EOF
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
      console.warn(\`Collection '\${collection}' not found in images.json\`);
      return null;
    }

    if (collection === 'homepage') {
      const homepageData = collectionData as Record<string, ImageData>;
      return homepageData[id] || null;
    }

    const item = collectionData.find((item: any) => item.id === id);
    
    if (!item) {
      console.warn(\`Image with id '\${id}' not found in collection '\${collection}'\`);
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
      console.warn(\`Collection '\${collection}' not found or not an array in images.json\`);
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
    alt: \`Fallback image for \${id} in \${collection}\`
  };
};

export default {
  getImage,
  getAllImagesFromCollection,
  getFallbackImage
};
EOF
fi

echo "Media setup completed! All necessary images and utilities have been installed."
echo "Your weneedwe.org site should now display images correctly." 