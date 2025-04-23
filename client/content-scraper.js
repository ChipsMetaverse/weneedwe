#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const url = require('url');

// Configuration - use the same config as the image scraper but add more pages
const config = {
  baseUrl: 'https://weneedwe.org',
  pagesToScrape: [
    '/',
    '/about',
    '/services',
    '/donate',
    '/volunteer',
    '/events',
    '/resources',
    '/contact',
    '/outreach',
    '/shestories-blog'
  ],
  outputDir: path.join(__dirname, 'data', 'extracted'),
  pagesOutputDir: path.join(__dirname, 'data', 'pages')
};

// Ensure output directories exist
fs.ensureDirSync(config.outputDir);
fs.ensureDirSync(config.pagesOutputDir);

// Main data structure to store all extracted content
const siteContent = {
  scrapeDate: new Date().toISOString(),
  pages: [],
  navigation: {
    main: [],
    footer: [],
    social: []
  }
};

/**
 * Extract navigation links from the page
 */
function extractNavigation($, pageUrl) {
  const nav = {
    main: [],
    footer: [],
    social: []
  };

  // Extract main navigation
  $('header nav a, .navbar a, .nav a, [role="navigation"] a').each((i, el) => {
    const $link = $(el);
    const href = $link.attr('href');
    const text = $link.text().trim();
    
    if (href && text) {
      nav.main.push({
        url: href.startsWith('http') ? href : url.resolve(pageUrl, href),
        text: text,
        isExternal: href.startsWith('http') && !href.includes(config.baseUrl)
      });
    }
  });

  // Extract footer navigation
  $('footer a').each((i, el) => {
    const $link = $(el);
    const href = $link.attr('href');
    const text = $link.text().trim();
    
    if (href && text && !text.match(/^(facebook|twitter|instagram|linkedin|youtube)$/i)) {
      nav.footer.push({
        url: href.startsWith('http') ? href : url.resolve(pageUrl, href),
        text: text,
        isExternal: href.startsWith('http') && !href.includes(config.baseUrl)
      });
    }
  });

  // Extract social links
  $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"], a[href*="linkedin.com"], a[href*="youtube.com"]').each((i, el) => {
    const $link = $(el);
    const href = $link.attr('href');
    const platform = href.match(/(?:facebook|twitter|instagram|linkedin|youtube)/i)?.[0].toLowerCase();
    
    if (href && platform) {
      nav.social.push({
        platform: platform,
        url: href
      });
    }
  });

  return nav;
}

/**
 * Extract main content from the page
 */
function extractContent($, pageUrl) {
  // Define potential content containers in order of preference
  const contentSelectors = [
    'main',
    'article',
    '.content',
    '#content',
    '.main-content',
    '.page-content',
    '.entry-content',
    '.post-content',
    '.container'
  ];

  let $content;
  
  // Find the first content container that exists and has content
  for (const selector of contentSelectors) {
    const $el = $(selector);
    if ($el.length && $el.text().trim()) {
      $content = $el;
      break;
    }
  }

  // If no specific content container found, use the body
  if (!$content || !$content.length) {
    $content = $('body');
  }

  // Extract the page title
  const title = $('title').text().trim() || 
                $('h1').first().text().trim() || 
                path.basename(pageUrl);

  // Extract headings
  const headings = [];
  $content.find('h1, h2, h3, h4, h5, h6').each((i, el) => {
    const $heading = $(el);
    const level = parseInt(el.tagName.substring(1));
    const text = $heading.text().trim();
    
    if (text) {
      headings.push({
        level: level,
        text: text
      });
    }
  });

  // Extract paragraphs
  const paragraphs = [];
  $content.find('p').each((i, el) => {
    const text = $(el).text().trim();
    if (text) {
      paragraphs.push(text);
    }
  });

  // Extract lists
  const lists = [];
  $content.find('ul, ol').each((i, el) => {
    const $list = $(el);
    const type = el.tagName.toLowerCase() === 'ul' ? 'unordered' : 'ordered';
    const items = [];
    
    $list.find('li').each((j, li) => {
      const text = $(li).text().trim();
      if (text) {
        items.push(text);
      }
    });
    
    if (items.length > 0) {
      lists.push({
        type: type,
        items: items
      });
    }
  });

  // Extract links within the content
  const links = [];
  $content.find('a').each((i, el) => {
    const $link = $(el);
    const href = $link.attr('href');
    const text = $link.text().trim();
    
    if (href && text) {
      links.push({
        url: href.startsWith('http') ? href : url.resolve(pageUrl, href),
        text: text,
        isExternal: href.startsWith('http') && !href.includes(config.baseUrl)
      });
    }
  });

  // Extract all text content as a single string
  const fullText = $content.text().trim().replace(/\s+/g, ' ');

  return {
    title: title,
    headings: headings,
    paragraphs: paragraphs,
    lists: lists,
    links: links,
    fullText: fullText
  };
}

/**
 * Create a markdown file from the extracted content
 */
function createMarkdownFile(pageContent, outputPath) {
  let markdown = `# ${pageContent.title}\n\n`;

  // Add headings and paragraphs in order
  const elements = [...pageContent.headings, ...pageContent.paragraphs.map(p => ({ level: 0, text: p }))];
  
  // Sort by their position in the document (approximated by index in arrays)
  elements.sort((a, b) => a.index - b.index);
  
  // Add sorted content
  for (const element of elements) {
    if (element.level > 1) {
      // It's a heading
      markdown += `${'#'.repeat(element.level)} ${element.text}\n\n`;
    } else if (element.level === 0) {
      // It's a paragraph
      markdown += `${element.text}\n\n`;
    }
  }

  // Add lists
  for (const list of pageContent.lists) {
    markdown += '\n';
    for (const item of list.items) {
      const marker = list.type === 'ordered' ? '1.' : '-';
      markdown += `${marker} ${item}\n`;
    }
    markdown += '\n';
  }

  // Add links section if there are more than just navigation links
  if (pageContent.links.length > 5) {
    markdown += '\n## Links\n\n';
    for (const link of pageContent.links) {
      markdown += `- [${link.text}](${link.url})${link.isExternal ? ' (external)' : ''}\n`;
    }
  }

  fs.writeFileSync(outputPath, markdown);
  return outputPath;
}

/**
 * Scrape a single page
 */
async function scrapePage(pagePath) {
  try {
    const pageUrl = new URL(pagePath, config.baseUrl).toString();
    console.log(`Scraping content from: ${pageUrl}`);
    
    const response = await axios.get(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract navigation
    const navigation = extractNavigation($, pageUrl);
    
    // Extract content
    const content = extractContent($, pageUrl);
    
    // Save full HTML
    const htmlOutputPath = path.join(config.pagesOutputDir, `${path.basename(pagePath) || 'index'}.html`);
    fs.writeFileSync(htmlOutputPath, response.data);
    
    // Create markdown file
    const mdFileName = `${path.basename(pagePath) || 'homepage'}.md`;
    const mdOutputPath = path.join(config.outputDir, mdFileName);
    createMarkdownFile(content, mdOutputPath);
    
    // Add to site content
    siteContent.pages.push({
      url: pageUrl,
      path: pagePath,
      title: content.title,
      htmlFile: path.relative(config.outputDir, htmlOutputPath),
      markdownFile: mdFileName,
      headingsCount: content.headings.length,
      paragraphsCount: content.paragraphs.length,
      listsCount: content.lists.length,
      linksCount: content.links.length
    });
    
    // Merge navigation
    siteContent.navigation.main = [...siteContent.navigation.main, ...navigation.main];
    siteContent.navigation.footer = [...siteContent.navigation.footer, ...navigation.footer];
    siteContent.navigation.social = [...siteContent.navigation.social, ...navigation.social];
    
    console.log(`Extracted content from ${pageUrl}: ${content.paragraphs.length} paragraphs, ${content.headings.length} headings`);
    
    return true;
  } catch (error) {
    console.error(`Error scraping ${pagePath}: ${error.message}`);
    return false;
  }
}

/**
 * Main function to execute the content scraping
 */
async function main() {
  console.log('Starting content scraper...');
  console.log(`Output directory: ${config.outputDir}`);
  
  // Scrape each page
  for (const pagePath of config.pagesToScrape) {
    await scrapePage(pagePath);
  }
  
  // Remove duplicate navigation links
  const uniqueById = (arr, keyFunc) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = keyFunc(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  
  siteContent.navigation.main = uniqueById(siteContent.navigation.main, item => item.url);
  siteContent.navigation.footer = uniqueById(siteContent.navigation.footer, item => item.url);
  siteContent.navigation.social = uniqueById(siteContent.navigation.social, item => item.platform);
  
  // Save site structure to JSON
  const outputPath = path.join(config.outputDir, 'pages.json');
  fs.writeJsonSync(outputPath, siteContent, { spaces: 2 });
  
  console.log('Content scraping complete!');
  console.log(`Scraped ${siteContent.pages.length} pages`);
  console.log(`Found ${siteContent.navigation.main.length} main navigation links`);
  console.log(`Found ${siteContent.navigation.social.length} social media links`);
  console.log(`Site structure saved to: ${outputPath}`);
}

// Run the scraper
main().catch(error => {
  console.error('Content scraping failed:', error);
  process.exit(1);
});