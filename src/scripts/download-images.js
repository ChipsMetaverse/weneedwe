/**
 * This script downloads images from weneedwe.org and places them in the correct directories
 * To run this script: node src/scripts/download-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create directories if they don't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Download an image from a URL and save it to a file
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filepath}`);
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Use wget to download images since it handles redirects better
const wgetImage = (url, filepath) => {
  try {
    execSync(`wget -O "${filepath}" "${url}"`, { stdio: 'inherit' });
    console.log(`Downloaded: ${filepath}`);
    return filepath;
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    throw error;
  }
};

// Main function
async function main() {
  // Ensure directories exist
  const publicDir = path.join(__dirname, '../../public');
  const imagesDir = path.join(publicDir, 'images');
  
  ensureDirectoryExists(publicDir);
  ensureDirectoryExists(imagesDir);

  // Images to download from weneedwe.org
  const images = [
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/community-workshop.jpg',
      path: path.join(imagesDir, 'community-support.jpg'),
      description: 'Community workshop image for hero section'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/impact-stories.jpg',
      path: path.join(imagesDir, 'impact.jpg'),
      description: 'Impact stories image for impact section'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/hiv-ribbon.png',
      path: path.join(imagesDir, 'hiv-awareness-ribbon.png'),
      description: 'HIV awareness ribbon icon'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/bw-self-program.jpg',
      path: path.join(imagesDir, 'bw-self-program.jpg'),
      description: 'BW-SELF program image for programs page'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/volunteer-group.jpg',
      path: path.join(imagesDir, 'volunteer-group.jpg'),
      description: 'Volunteer group image for volunteer page'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/education-workshop.jpg',
      path: path.join(imagesDir, 'education-workshop.jpg'),
      description: 'Education workshop image for programs page'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/community-health.jpg',
      path: path.join(imagesDir, 'community-health.jpg'),
      description: 'Community health image for programs page'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/gallery1.jpg',
      path: path.join(imagesDir, 'gallery1.jpg'),
      description: 'Gallery image 1'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/gallery2.jpg',
      path: path.join(imagesDir, 'gallery2.jpg'),
      description: 'Gallery image 2'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/gallery3.jpg',
      path: path.join(imagesDir, 'gallery3.jpg'),
      description: 'Gallery image 3'
    },
    {
      url: 'https://weneedwe.org/wp-content/uploads/2023/05/weneedwe-logo.png',
      path: path.join(imagesDir, 'weneedwe-logo.png'),
      description: 'We Need We organization logo'
    }
  ];

  // If the previous images don't exist, use these backup URLs
  const backupImages = [
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a',
      path: path.join(imagesDir, 'community-support.jpg'),
      description: 'Community support - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb',
      path: path.join(imagesDir, 'impact.jpg'),
      description: 'Impact stories - backup from Unsplash'
    },
    {
      url: 'https://img.freepik.com/premium-vector/red-awareness-ribbon-against-hiv-aids_97886-4584.jpg',
      path: path.join(imagesDir, 'hiv-awareness-ribbon.png'),
      description: 'HIV awareness ribbon - backup'
    },
    {
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
      path: path.join(imagesDir, 'bw-self-program.jpg'),
      description: 'BW-SELF program - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca',
      path: path.join(imagesDir, 'volunteer-group.jpg'),
      description: 'Volunteer group - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
      path: path.join(imagesDir, 'education-workshop.jpg'),
      description: 'Education workshop - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1590402494610-2c378a9114c6',
      path: path.join(imagesDir, 'community-health.jpg'),
      description: 'Community health - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1556484687-30636164638b',
      path: path.join(imagesDir, 'gallery1.jpg'),
      description: 'Gallery image 1 - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be',
      path: path.join(imagesDir, 'gallery2.jpg'),
      description: 'Gallery image 2 - backup from Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a',
      path: path.join(imagesDir, 'gallery3.jpg'),
      description: 'Gallery image 3 - backup from Unsplash'
    }
  ];

  // Download each image
  console.log('Downloading images from weneedwe.org...');
  
  // Try to download each image, falling back to backup URLs if needed
  for (const image of images) {
    try {
      console.log(`Downloading ${image.description} from ${image.url}`);
      await wgetImage(image.url, image.path);
    } catch (error) {
      console.log(`Failed to download from primary URL. Using backup...`);
      
      // Find matching backup image
      const backup = backupImages.find(b => b.path === image.path);
      if (backup) {
        try {
          console.log(`Downloading backup for ${image.description} from ${backup.url}`);
          await wgetImage(backup.url, backup.path);
        } catch (secondError) {
          console.error(`Failed to download backup image as well: ${secondError.message}`);
        }
      } else {
        console.error(`No backup found for ${image.path}`);
      }
    }
  }

  console.log('Image download process completed!');
}

main().catch(error => {
  console.error('An error occurred:', error);
}); 