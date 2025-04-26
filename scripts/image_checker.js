#!/usr/bin/env node

/**
 * Image Checker Script
 * 
 * This script scans the project for image references and checks their existence.
 * It helps identify missing images or configuration issues.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directories to search
const sourceDirs = ['src', 'public', 'client/src'];
// Image extensions to look for
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

// Track found images and references
const imageFiles = new Set();
const imageReferences = new Map();
const publicImages = new Set();

console.log('🔍 Scanning project for images...');

// Find all image files in the project
function findImageFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const relativePath = fullPath.replace(process.cwd(), '');
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other common ignored directories
        if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
          findImageFiles(fullPath);
        }
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        imageFiles.add(relativePath);
        
        // Track public directory images separately
        if (relativePath.startsWith('/public/')) {
          publicImages.add(relativePath.replace('/public', ''));
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
}

// Find image references in source files
function findImageReferences(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other common ignored directories
        if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
          findImageReferences(fullPath);
        }
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Look for image references in src attributes
        const srcMatches = content.match(/src=["']([^"']+\.(jpg|jpeg|png|gif|svg))["']/g);
        if (srcMatches) {
          for (const match of srcMatches) {
            const url = match.match(/src=["']([^"']+)["']/)[1];
            if (!url.startsWith('http')) { // Skip external URLs
              if (!imageReferences.has(url)) {
                imageReferences.set(url, []);
              }
              imageReferences.get(url).push(fullPath);
            }
          }
        }
        
        // Look for image references in import statements
        const importMatches = content.match(/import\s+[^"']*["']([^"']+\.(jpg|jpeg|png|gif|svg))["']/g);
        if (importMatches) {
          for (const match of importMatches) {
            const url = match.match(/["']([^"']+)["']/)[1];
            if (!imageReferences.has(url)) {
              imageReferences.set(url, []);
            }
            imageReferences.get(url).push(fullPath);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
}

// Check references against actual files
function checkReferences() {
  console.log('\n📊 Image Analysis Results:');
  console.log('========================\n');
  
  console.log(`📁 Found ${imageFiles.size} image files in the project`);
  console.log(`🖼️ Found ${publicImages.size} images in public directory`);
  console.log(`🔗 Found ${imageReferences.size} image references in code\n`);
  
  console.log('📋 Public Directory Images:');
  publicImages.forEach(img => {
    console.log(`  ${img}`);
  });
  
  console.log('\n⚠️ Potentially Missing Images:');
  let missingCount = 0;
  
  imageReferences.forEach((files, imgPath) => {
    // For relative paths starting with /
    if (imgPath.startsWith('/')) {
      const normalizedPath = imgPath;
      // Check if this path exists in public directory
      if (!publicImages.has(normalizedPath)) {
        console.log(`  ${imgPath} (referenced in ${files.length} files)`);
        missingCount++;
      }
    }
  });
  
  if (missingCount === 0) {
    console.log('  None! All referenced images seem to exist.');
  }
  
  console.log('\n✅ Recommendations:');
  console.log('  1. Make sure the Content-Security-Policy allows necessary image domains');
  console.log('  2. Check if missing images need to be added to the public directory');
  console.log('  3. Verify image paths are correct in code references');
  console.log('  4. Ensure deployment processes copy all images correctly');
}

// Main execution
console.log('Scanning project root directory...');
findImageFiles(process.cwd());
console.log('Scanning source files for image references...');
sourceDirs.forEach(dir => {
  const fullDir = path.join(process.cwd(), dir);
  if (fs.existsSync(fullDir)) {
    findImageReferences(fullDir);
  }
});

checkReferences();

console.log('\n🚀 Script completed!'); 