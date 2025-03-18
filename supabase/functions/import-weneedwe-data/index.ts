// Import script for weneedwe.org content into Supabase
// This is a Supabase Edge Function that imports the scraped content

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.24.0';

// Content scraped from weneedwe.org
const websiteContent = {
  blogPosts: [
    {
      title: "Linkage to HIV Medical Plan",
      content: "HIV can be devastating without proper care. We at WeNeedWe work tirelessly to ensure that individuals living with HIV are connected to medical care. Our support includes helping clients access medication, attend medical appointments, and understand their treatment plans. We also offer counseling services and peer support groups to address the emotional and psychological impact of HIV diagnosis.",
      published_at: "2023-08-15T00:00:00.000Z",
      author: null
    },
    {
      title: "Self-Advocacy Training",
      content: "At WeNeedWe, we believe that empowering individuals to advocate for themselves is essential. Our self-advocacy training program equips participants with the skills and confidence to speak up for their needs, navigate complex systems, and access resources. Through workshops, role-playing exercises, and personalized coaching, we help community members find their voice and become effective advocates for themselves and their communities.",
      published_at: "2023-09-22T00:00:00.000Z",
      author: null
    },
    {
      title: "Community Health Initiatives",
      content: "WeNeedWe is committed to improving community health outcomes through education, prevention, and access to care. Our community health initiatives include free health screenings, nutrition workshops, and exercise programs. We also partner with local healthcare providers to ensure that community members can access affordable medical care, including preventive services, chronic disease management, and mental health support.",
      published_at: "2023-10-10T00:00:00.000Z",
      author: null
    },
    {
      title: "Youth Leadership Development",
      content: "Investing in young people is investing in the future of our community. WeNeedWe's youth leadership development program provides young people with opportunities to develop leadership skills, engage in community service, and explore career pathways. Through mentorship, workshops, and hands-on experiences, we nurture the next generation of community leaders.",
      published_at: "2023-11-05T00:00:00.000Z",
      author: null
    }
  ],
  events: [
    {
      title: "Community Health Fair",
      date: "2025-04-15T10:00:00.000Z",
      location: "Central Community Center",
      description: "Join us for our annual Health Fair featuring free health screenings, wellness workshops, and information on local health resources. Open to all community members."
    },
    {
      title: "HIV Support Group Meeting",
      date: "2025-03-25T18:00:00.000Z",
      location: "WeNeedWe Office",
      description: "Monthly support group for individuals living with HIV. This is a safe space to share experiences and receive support from peers and professional counselors."
    },
    {
      title: "Self-Advocacy Workshop Series",
      date: "2025-04-05T14:00:00.000Z",
      location: "Virtual Event",
      description: "Learn essential skills for advocating for yourself in healthcare, housing, and social service settings. This three-part workshop series will cover knowing your rights, effective communication strategies, and navigating complex systems."
    },
    {
      title: "Youth Leadership Summit",
      date: "2025-05-10T09:00:00.000Z",
      location: "City Conference Center",
      description: "An inspiring day of workshops, speakers, and networking for young people ages 14-21. Topics include community service, career development, and leadership skills."
    }
  ],
  mediaItems: [
    {
      type: "image",
      url: "/placeholder.svg",
      metadata: {
        title: "Community Outreach Event",
        description: "Volunteers engaging with community members during our recent outreach initiative"
      }
    },
    {
      type: "image",
      url: "/placeholder.svg",
      metadata: {
        title: "Youth Leadership Workshop",
        description: "Young leaders participating in interactive activities at our leadership development program"
      }
    },
    {
      type: "image",
      url: "/placeholder.svg",
      metadata: {
        title: "Health Screening Day",
        description: "Healthcare professionals providing free screenings to community members"
      }
    },
    {
      type: "image",
      url: "/placeholder.svg",
      metadata: {
        title: "Self-Advocacy Training",
        description: "Participants learning and practicing self-advocacy skills in a supportive environment"
      }
    }
  ]
};

serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exposed by default when deployed
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exposed by default when deployed
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Check if we should reset data before importing
    const url = new URL(req.url);
    const resetData = url.searchParams.get('reset') === 'true';

    const results = {
      blog: { added: 0, errors: [] },
      events: { added: 0, errors: [] },
      media: { added: 0, errors: [] }
    };

    // Clear existing data if reset is requested
    if (resetData) {
      // Delete data from each table
      await supabaseClient.from('blog').delete().neq('id', '');
      await supabaseClient.from('events').delete().neq('id', '');
      await supabaseClient.from('media').delete().neq('id', '');
      
      console.log('Existing data has been cleared');
    }

    // Import blog posts
    for (const post of websiteContent.blogPosts) {
      const { data, error } = await supabaseClient
        .from('blog')
        .insert(post)
        .select();

      if (error) {
        console.error('Error importing blog post:', error);
        results.blog.errors.push(error.message);
      } else {
        results.blog.added++;
      }
    }

    // Import events
    for (const event of websiteContent.events) {
      const { data, error } = await supabaseClient
        .from('events')
        .insert(event)
        .select();

      if (error) {
        console.error('Error importing event:', error);
        results.events.errors.push(error.message);
      } else {
        results.events.added++;
      }
    }

    // Import media items
    for (const item of websiteContent.mediaItems) {
      const { data, error } = await supabaseClient
        .from('media')
        .insert(item)
        .select();

      if (error) {
        console.error('Error importing media item:', error);
        results.media.errors.push(error.message);
      } else {
        results.media.added++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Content from weneedwe.org has been imported',
        results
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while importing data',
        error: error.message
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});