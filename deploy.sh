
#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for WeneedWe project...${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  You have uncommitted changes. Consider committing them before deploying.${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment aborted.${NC}"
    exit 1
  fi
fi

echo -e "${GREEN}Step 1: Installing dependencies...${NC}"
npm install

echo -e "${GREEN}Step 2: Running type check...${NC}"
npx tsc --noEmit

# Check if there were type errors
if [ $? -ne 0 ]; then
  echo -e "${RED}TypeScript errors found. Please fix them before deploying.${NC}"
  exit 1
fi

echo -e "${GREEN}Step 3: Building for production...${NC}"
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. See error messages above.${NC}"
  exit 1
fi

echo -e "${GREEN}Step 4: Testing build locally...${NC}"
echo -e "${YELLOW}Starting production preview server. Press Ctrl+C to stop.${NC}"
npm run preview

echo -e "${GREEN}Build successful!${NC}"
echo -e "${YELLOW}To deploy to a hosting service:${NC}"
echo -e "1. For Netlify: npx netlify deploy"
echo -e "2. For Vercel: npx vercel"
echo -e "3. For GitHub Pages: npx gh-pages -d dist"
echo -e "4. For Firebase: firebase deploy"
echo -e "5. Upload the 'dist' folder to your web hosting service"

echo -e "${GREEN}Deployment preparation complete!${NC}"
