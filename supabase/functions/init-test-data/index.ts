
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Check if data already exists
    const { count: donationCount } = await supabase
      .from("donations")
      .select("*", { count: "exact", head: true });

    if (donationCount && donationCount > 0) {
      return new Response(
        JSON.stringify({ message: "Test data already exists" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Sample donation data
    const donations = [
      {
        amount: 100,
        currency: "USD",
        method: "credit_card",
        status: "completed",
        name: "John Doe",
        email: "john@example.com",
      },
      {
        amount: 250,
        currency: "USD",
        method: "paypal",
        status: "completed",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      {
        amount: 50,
        currency: "USD",
        method: "credit_card",
        status: "completed",
        name: "Michael Johnson",
        email: "michael@example.com",
      },
      {
        amount: 500,
        currency: "USD",
        method: "credit_card",
        status: "completed",
        name: "Sarah Williams",
        email: "sarah@example.com",
      },
    ];

    // Sample events data
    const events = [
      {
        title: "Community Volunteer Day",
        description: "Join us for a day of community service and giving back.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        location: "Central Park",
      },
      {
        title: "Food Drive",
        description: "Help us collect non-perishable food items for local food banks.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        location: "Community Center",
      },
      {
        title: "Youth Mentorship Program",
        description: "Orientation for our new youth mentorship program.",
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
        location: "Public Library",
      },
    ];

    // Sample media data
    const media = [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "Volunteer Day",
          description: "Our volunteers helping at the local food bank",
          category: "Events",
          tags: ["volunteers", "food bank", "community"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "Community Garden",
          description: "Working together to build a community garden",
          category: "Projects",
          tags: ["garden", "community", "green space"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "Youth Workshop",
          description: "Teaching skills to local youth",
          category: "Community",
          tags: ["youth", "education", "workshop"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1651380484027-a3361682360e?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "Health Clinic",
          description: "Free health services for the community",
          category: "Events",
          tags: ["health", "clinic", "services"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1607748851687-ba9a10438621?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "Senior Support Program",
          description: "Volunteers helping senior citizens",
          category: "Community",
          tags: ["seniors", "support", "volunteers"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=2045&auto=format&fit=crop",
        metadata: {
          title: "Neighborhood Cleanup",
          description: "Community members cleaning up local park",
          category: "Projects",
          tags: ["cleanup", "environment", "park"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1770&auto=format&fit=crop",
        metadata: {
          title: "Food Distribution",
          description: "Distributing meals to those in need",
          category: "Events",
          tags: ["food", "distribution", "hunger"],
        },
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
        metadata: {
          title: "After School Program",
          description: "Children in our after school program",
          category: "Community",
          tags: ["children", "education", "after school"],
        },
      },
    ];

    // Sample blog posts
    const blogPosts = [
      {
        title: "Making a Difference in Our Community",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
      {
        title: "New Youth Program Launches Next Month",
        content: "Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.",
        published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      },
      {
        title: "Volunteer Spotlight: Meet Sarah",
        content: "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
        published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
      },
    ];

    // Insert data into the database
    const results = await Promise.all([
      supabase.from("donations").insert(donations),
      supabase.from("events").insert(events),
      supabase.from("media").insert(media),
      supabase.from("blog").insert(blogPosts),
    ]);

    // Check for errors
    for (const result of results) {
      if (result.error) {
        throw new Error(`Error inserting data: ${result.error.message}`);
      }
    }

    return new Response(
      JSON.stringify({ message: "Test data inserted successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
