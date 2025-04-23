#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images

# Function to download an image
download_image() {
  local url=$1
  local output=$2
  local description=$3
  
  echo "Downloading $description from $url to $output"
  
  # Try curl first
  if command -v curl &> /dev/null; then
    curl -s -o "$output" "$url"
    if [ $? -eq 0 ]; then
      echo "Successfully downloaded $description"
      return 0
    fi
  fi
  
  # Try wget if curl fails or isn't available
  if command -v wget &> /dev/null; then
    wget -q -O "$output" "$url"
    if [ $? -eq 0 ]; then
      echo "Successfully downloaded $description"
      return 0
    fi
  fi
  
  # If both fail, try with simple HTTP request
  if command -v python &> /dev/null; then
    python -c "import urllib.request; urllib.request.urlretrieve('$url', '$output')"
    if [ $? -eq 0 ]; then
      echo "Successfully downloaded $description using Python"
      return 0
    fi
  fi
  
  echo "Failed to download $description"
  return 1
}

# Download individual images
echo "Starting image downloads..."

# Community support image
download_image "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200" "public/images/community-support.jpg" "Community support image"

# Impact image
download_image "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200" "public/images/impact.jpg" "Impact image"

# HIV awareness ribbon
download_image "https://img.freepik.com/premium-vector/red-awareness-ribbon-against-hiv-aids_97886-4584.jpg?w=200" "public/images/hiv-awareness-ribbon.png" "HIV awareness ribbon"

# BW-SELF program image
download_image "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" "public/images/bw-self-program.jpg" "BW-SELF program image"

# Volunteer group image
download_image "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200" "public/images/volunteer-group.jpg" "Volunteer group image"

# Education workshop image
download_image "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" "public/images/education-workshop.jpg" "Education workshop image"

# Community health image
download_image "https://images.unsplash.com/photo-1590402494610-2c378a9114c6?auto=format&fit=crop&q=80&w=1200" "public/images/community-health.jpg" "Community health image"

# Gallery images
download_image "https://images.unsplash.com/photo-1556484687-30636164638b?auto=format&fit=crop&q=80&w=1200" "public/images/gallery1.jpg" "Gallery image 1"
download_image "https://images.unsplash.com/photo-1560252829-804f1aedf1be?auto=format&fit=crop&q=80&w=1200" "public/images/gallery2.jpg" "Gallery image 2"
download_image "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200" "public/images/gallery3.jpg" "Gallery image 3"

# Logo
download_image "https://placeholderlogo.com/img/placeholder-logo-2.png" "public/images/weneedwe-logo.png" "WeNeedWe logo"

echo "Image download process completed!" 