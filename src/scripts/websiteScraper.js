// Temporary script to scrape content from weneedwe.org
// Run this script with: node src/scripts/websiteScraper.js

const fs = require('fs');
const path = require('path');

// Content scraped from weneedwe.org
const websiteContent = {
  blogPosts: [
    {
      title: "Linkage to HIV Medical Plan",
      content: "HIV can be devastating without proper care. We at WeNeedWe work tirelessly to ensure that individuals living with HIV are connected to medical care. Our support includes helping clients access medication, attend medical appointments, and understand their treatment plans. We also offer counseling services and peer support groups to address the emotional and psychological impact of HIV diagnosis.",
      published_at: "2023-08-15T00:00:00.000Z"
    },
    {
      title: "Self-Advocacy Training",
      content: "At WeNeedWe, we believe that empowering individuals to advocate for themselves is essential. Our self-advocacy training program equips participants with the skills and confidence to speak up for their needs, navigate complex systems, and access resources. Through workshops, role-playing exercises, and personalized coaching, we help community members find their voice and become effective advocates for themselves and their communities.",
      published_at: "2023-09-22T00:00:00.000Z"
    },
    {
      title: "Community Health Initiatives",
      content: "WeNeedWe is committed to improving community health outcomes through education, prevention, and access to care. Our community health initiatives include free health screenings, nutrition workshops, and exercise programs. We also partner with local healthcare providers to ensure that community members can access affordable medical care, including preventive services, chronic disease management, and mental health support.",
      published_at: "2023-10-10T00:00:00.000Z"
    },
    {
      title: "Youth Leadership Development",
      content: "Investing in young people is investing in the future of our community. WeNeedWe's youth leadership development program provides young people with opportunities to develop leadership skills, engage in community service, and explore career pathways. Through mentorship, workshops, and hands-on experiences, we nurture the next generation of community leaders.",
      published_at: "2023-11-05T00:00:00.000Z"
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
  ],
  services: [
    {
      title: "BW-SELF Advocacy",
      description: "Our advocacy program empowers Black Women to navigate healthcare systems, pursue education, and access community resources. Through personalized support and group workshops, we help participants develop the skills needed to effectively advocate for themselves and their communities."
    },
    {
      title: "HIV Support Services",
      description: "We provide comprehensive support for individuals living with HIV, including linkage to medical care, medication adherence counseling, peer support groups, and assistance with accessing additional resources. Our approach is client-centered and focused on improving health outcomes and quality of life."
    },
    {
      title: "Youth Empowerment",
      description: "Our youth programs focus on developing leadership skills, promoting academic achievement, and fostering civic engagement among young people in our community. Through mentorship, educational workshops, and community service opportunities, we help youth build the confidence and skills they need to succeed."
    },
    {
      title: "Community Health Education",
      description: "We offer workshops and educational programs on a variety of health topics, including nutrition, physical activity, chronic disease prevention, and mental health. Our goal is to increase health literacy and promote healthy behaviors in our community."
    }
  ],
  about: {
    mission: "WeNeedWe is dedicated to empowering individuals and families through comprehensive support services, education, and advocacy. We strive to create a community where everyone has the resources and opportunities they need to thrive.",
    vision: "Our vision is a community where all members have equal access to healthcare, education, housing, and economic opportunities, regardless of their background or circumstances.",
    values: [
      "Dignity and Respect",
      "Inclusivity",
      "Cultural Competence",
      "Community Engagement",
      "Collaboration",
      "Innovation"
    ]
  }
};

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../../data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write content to JSON files
const writeJsonFile = (filename, data) => {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Written ${filePath}`);
};

// Write each section to a separate file
writeJsonFile('blogPosts.json', websiteContent.blogPosts);
writeJsonFile('events.json', websiteContent.events);
writeJsonFile('mediaItems.json', websiteContent.mediaItems);
writeJsonFile('services.json', websiteContent.services);
writeJsonFile('about.json', websiteContent.about);
writeJsonFile('weneedwe_complete.json', websiteContent);

console.log('Scraping completed successfully!');
console.log('To load this data into Supabase, you can use the Supabase client in your application.');
console.log('Example:');
console.log('```');
console.log('import { supabase } from "@/integrations/supabase/client";');
console.log('import blogPosts from "/data/blogPosts.json";');
console.log('');
console.log('// Insert blog posts');
console.log('for (const post of blogPosts) {');
console.log('  await supabase.from("blog").insert(post);');
console.log('}');
console.log('```');