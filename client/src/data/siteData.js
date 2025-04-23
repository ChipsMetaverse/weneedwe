// Import site data from extracted JSON
import pagesData from '../../data/extracted/pages.json';

// Export individual data elements for different components

// Navigation data for the Navbar component
export const navigation = pagesData.navigation;

// Pages data organized by path for routing
export const pagesByPath = pagesData.pages.reduce((acc, page) => {
  acc[page.path] = page;
  return acc;
}, {});

// About page data (homepage)
export const aboutPageData = pagesData.pages.find(page => page.title === "About")?.content || {};

// BW-SELF Advocacy program data
export const bwSelfData = pagesData.pages.find(page => page.title === "BW-SELF Advocacy")?.content || {};

// Just The Facts page data
export const factsData = pagesData.pages.find(page => page.title === "Just The Facts")?.content || {};

// Webinars page data
export const webinarsData = pagesData.pages.find(page => page.title === "Webinars")?.content || {};

// SheStories Blog page data
export const blogData = pagesData.pages.find(page => page.title === "SheStories Blog")?.content || {};

// Resources page data
export const resourcesData = pagesData.pages.find(page => page.title === "Resources")?.content || {};

// Donate page data
export const donateData = pagesData.pages.find(page => page.title === "Donate")?.content || {};

// Mission statement for use across multiple components
export const missionStatement = "We Need We is a community-focused nonprofit dedicated to promoting HIV awareness, providing support services, and creating safe spaces for education and empowerment.";

// Organization values for use in various components
export const organizationValues = aboutPageData.mission?.values || [];

// Community impact data for stats and metrics
export const communityImpact = aboutPageData.impact?.highlights || [];

// Organization stats for the stats section
export const organizationStats = aboutPageData.stats || [];

// Export the full data object for when complete access is needed
export default pagesData; 