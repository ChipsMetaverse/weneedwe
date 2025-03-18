// Script to import the scraped data into Supabase
// Run with: node src/scripts/importScrapedData.js

// Load environment variables
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "https://zdnjcqarylspvpfingge.supabase.co";
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbmpjcWFyeWxzcHZwZmluZ2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTg4ODMsImV4cCI6MjA1NzgzNDg4M30.UlPnV_s39sMXUMWwGoQ6-gHGpN7XmE-QwWPUgrqm6iM";
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to the data directory
const dataDir = path.join(__dirname, '../../data');

async function importData() {
  try {
    console.log('Starting data import...');
    
    // Import blog posts
    const blogPostsPath = path.join(dataDir, 'blogPosts.json');
    if (fs.existsSync(blogPostsPath)) {
      const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
      console.log(`Importing ${blogPosts.length} blog posts...`);
      
      for (const post of blogPosts) {
        const { data, error } = await supabase
          .from('blog')
          .insert({
            title: post.title,
            content: post.content,
            published_at: post.published_at || new Date().toISOString()
          });
          
        if (error) {
          console.error(`Error inserting blog post "${post.title}":`, error);
        } else {
          console.log(`Imported blog post: ${post.title}`);
        }
      }
    } else {
      console.log('No blog posts found to import');
    }
    
    // Import events
    const eventsPath = path.join(dataDir, 'events.json');
    if (fs.existsSync(eventsPath)) {
      const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
      console.log(`Importing ${events.length} events...`);
      
      for (const event of events) {
        const { data, error } = await supabase
          .from('events')
          .insert({
            title: event.title,
            date: event.date,
            location: event.location,
            description: event.description
          });
          
        if (error) {
          console.error(`Error inserting event "${event.title}":`, error);
        } else {
          console.log(`Imported event: ${event.title}`);
        }
      }
    } else {
      console.log('No events found to import');
    }
    
    // Import media items
    const mediaItemsPath = path.join(dataDir, 'mediaItems.json');
    if (fs.existsSync(mediaItemsPath)) {
      const mediaItems = JSON.parse(fs.readFileSync(mediaItemsPath, 'utf8'));
      console.log(`Importing ${mediaItems.length} media items...`);
      
      for (const item of mediaItems) {
        const { data, error } = await supabase
          .from('media')
          .insert({
            type: item.type,
            url: item.url,
            metadata: item.metadata
          });
          
        if (error) {
          console.error(`Error inserting media item "${item.metadata.title}":`, error);
        } else {
          console.log(`Imported media item: ${item.metadata.title}`);
        }
      }
    } else {
      console.log('No media items found to import');
    }
    
    console.log('Data import completed!');
  } catch (error) {
    console.error('Error during import:', error);
  }
}

// Run the import
importData();