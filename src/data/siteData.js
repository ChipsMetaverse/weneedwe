// Site data for the We Need We website

// Organization Information
export const organizationInfo = {
  name: "We Need We",
  foundedYear: 1976,
  yearsOfService: "45+",
  missionStatement: "We Need We is a community-focused nonprofit dedicated to promoting HIV awareness, providing support services, and creating safe spaces for education and empowerment.",
  visionStatement: "Our vision is a community where all individuals have equal access to opportunities for growth, health, and well-being."
};

// Core Values
export const coreValues = [
  {
    title: "Support",
    description: "We provide emotional and educational support for individuals and communities affected by HIV."
  },
  {
    title: "Education",
    description: "We believe in the power of knowledge to prevent new HIV infections and combat stigma."
  },
  {
    title: "Advocacy",
    description: "We advocate for policies that protect the rights and dignity of those living with HIV."
  }
];

// Organization Stats
export const organizationStats = [
  { label: "People Served", value: "15,000+" },
  { label: "Volunteer Hours", value: "25,000+" },
  { label: "Community Partners", value: "120+" },
  { label: "Years of Service", value: "45+" }
];

// Main Programs
export const mainPrograms = [
  {
    id: "bw-self",
    title: "BW-SELF Advocacy Program",
    shortDescription: "Building Women's Self-Empowerment, Leadership, and Freedom - a program empowering Black Women to navigate healthcare, pursue education, and access community resources.",
    fullDescription: "The BW-SELF (Black Women - Self Empowerment Leadership Framework) Advocacy program empowers Black Women to navigate healthcare systems, pursue education, and access community resources. As an agency of change on how women access healthcare, the BW-SELF addresses health disparities that Black women face.",
    slogan: "OUR POWER, OUR VOICE, OUR CONTROL!",
    featuredImageUrl: "/photos/7534503d-1c6b-438b-98ea-4f706a856228.webp",
    keyFeatures: [
      "Self-advocacy skills development",
      "Healthcare system navigation",
      "Educational advancement",
      "Community resource access",
      "Support networks for Black women"
    ],
    path: "/programs/bw-self"
  },
  {
    id: "hiv-services",
    title: "HIV Support Services",
    shortDescription: "Comprehensive support for individuals living with HIV, including linkage to medical care, counseling, and peer support groups.",
    fullDescription: "Our comprehensive HIV support program provides essential services for individuals living with HIV, including linkage to medical care, counseling, and peer support groups.",
    featuredImageUrl: "/photos/04e7dda9-6f51-47a6-8a6e-5525a4f77623.webp",
    keyFeatures: [
      "HIV education and prevention workshops",
      "Linkage to medical care and treatment",
      "Individual and group counseling",
      "Peer support groups and mentorship",
      "Assistance with medication adherence"
    ],
    path: "/programs/hiv-services"
  },
  {
    id: "webinars",
    title: "Educational Webinars",
    shortDescription: "Online learning opportunities covering topics related to HIV awareness, health education, and community resources.",
    fullDescription: "Our webinar series titled 'Our Power, Our Voice, Our Control' features presentations by Black women doctors/providers on topics related to discretion in medical practices and biases that create health disparities.",
    featuredImageUrl: "/photos/c33bfad4-561f-4676-875a-ae1a8bc3f3b1.webp",
    keyFeatures: [
      "HIV Prevention Updates",
      "Self-Advocacy in Healthcare",
      "Understanding HIV Treatment",
      "Community Support Networks",
      "Health Literacy"
    ],
    path: "/webinars"
  },
  {
    id: "resources",
    title: "Resource Center",
    shortDescription: "Comprehensive resources for individuals and communities, including educational materials, support services listings, and self-help guides.",
    fullDescription: "Our resource center provides access to a wide range of educational materials, support services listings, and self-help guides to help individuals navigate healthcare systems and access the support they need.",
    featuredImageUrl: "/photos/6d0c83a6-6696-4e57-84c8-339e101b1483.webp",
    keyFeatures: [
      "HIV Testing Resources",
      "Healthcare Provider Directory",
      "Support Group Listings",
      "Educational Materials",
      "Community Resources"
    ],
    path: "/resources"
  }
];

// Blog Posts (She/Stories Blog)
export const blogPosts = [
  {
    id: "1",
    title: "My Journey to Health Advocacy",
    content: "A personal story of how I found my voice in healthcare settings and became an advocate for myself and others. The journey began when I faced challenges navigating the healthcare system and realized many others in my community experienced similar issues. Through education and support from organizations like We Need We, I developed the confidence to speak up for myself and help others do the same.",
    author: "Community Member",
    published_at: "2023-12-10T14:00:00Z"
  },
  {
    id: "2",
    title: "Finding Community in Health Challenges",
    content: "How connecting with others facing similar health issues can provide support, resources, and empowerment. When facing a health challenge, isolation can make everything more difficult. Finding a supportive community through We Need We's programs helped me access resources I didn't know existed and connected me with people who understood my experience.",
    author: "Community Member",
    published_at: "2023-11-15T14:00:00Z"
  },
  {
    id: "3",
    title: "Resources for Women in Transition",
    content: "A comprehensive guide to resources available for women going through major life transitions. From healthcare access to housing assistance, educational opportunities to emotional support, this guide compiles key resources that can help women navigate periods of change in their lives with greater confidence and support.",
    author: "Program Coordinator",
    published_at: "2023-10-20T14:00:00Z"
  }
];

// Upcoming Events
export const upcomingEvents = [
  {
    id: "evt-001",
    title: "HIV Prevention Workshop",
    description: "Learn about the latest advances in HIV prevention methods and strategies.",
    date: "2025-05-15T18:00:00Z",
    location: "Community Center, Chicago",
    imageUrl: "/photos/04e7dda9-6f51-47a6-8a6e-5525a4f77623.webp"
  },
  {
    id: "evt-002",
    title: "BW-SELF Advocacy Training",
    description: "A workshop designed to help Black women develop effective self-advocacy skills in healthcare settings.",
    date: "2025-05-22T17:30:00Z",
    location: "Women's Resource Center, Chicago",
    imageUrl: "/photos/7534503d-1c6b-438b-98ea-4f706a856228.webp"
  },
  {
    id: "evt-003",
    title: "Community Health Fair",
    description: "Free health screenings, resources, and education for community members of all ages.",
    date: "2025-06-05T10:00:00Z",
    location: "Lincoln Park, Chicago",
    imageUrl: "/photos/8cf0f025-b7de-4ab8-bcd7-a98ad9e14a0a.webp"
  }
];

// Webinar Series
export const webinarSeries = {
  title: "Our Power, Our Voice, Our Control!",
  description: "A series of educational webinars presented by Black women doctors and healthcare providers, focusing on topics related to healthcare navigation, self-advocacy, and addressing healthcare disparities.",
  upcomingWebinars: [
    {
      id: "web-001",
      title: "HIV Prevention Updates",
      description: "Learn about the latest advances in HIV prevention methods and strategies.",
      date: "2025-05-20T18:00:00Z",
      presenter: "Dr. Angela Thompson",
      registrationLink: "#"
    },
    {
      id: "web-002",
      title: "Self-Advocacy in Healthcare",
      description: "Strategies for effective communication with healthcare providers and advocating for your needs.",
      date: "2025-06-10T18:00:00Z",
      presenter: "Dr. Michelle Carter",
      registrationLink: "#"
    }
  ],
  pastWebinars: [
    {
      id: "web-003",
      title: "Understanding HIV Treatment",
      description: "An overview of current HIV treatment options and management strategies.",
      date: "2023-04-15T18:00:00Z",
      presenter: "Dr. Jasmine Wilson",
      recordingLink: "#"
    }
  ]
};

// Gallery Photos with metadata
export const galleryPhotos = [
  {
    id: 1,
    title: "Community Event",
    description: "Participants engaging in a community health education workshop.",
    imageUrl: "/photos/04e7dda9-6f51-47a6-8a6e-5525a4f77623.webp",
    category: "Events",
    date: "2023-09-15"
  },
  {
    id: 2,
    title: "Program Participant",
    description: "A participant sharing her experience with the BW-SELF advocacy program.",
    imageUrl: "/photos/1c385c77-1c79-4e16-bf82-9f29677b32a6.webp",
    category: "Testimonials",
    date: "2023-10-22"
  },
  {
    id: 3,
    title: "Youth Workshop",
    description: "Young people participating in an educational workshop about health awareness.",
    imageUrl: "/photos/2959ab36-6657-40bf-8a8e-9a541f3e28a7.webp",
    category: "Programs",
    date: "2023-08-30"
  },
  {
    id: 4,
    title: "Volunteer Engagement",
    description: "Volunteers working with community members during a health screening event.",
    imageUrl: "/photos/3b2354da-1232-4b42-aed6-666c76648ee0.webp",
    category: "Community",
    date: "2023-11-05"
  },
  {
    id: 5,
    title: "Health Education Workshop",
    description: "A health education workshop focusing on prevention strategies.",
    imageUrl: "/photos/6d0c83a6-6696-4e57-84c8-339e101b1483.webp",
    category: "Education",
    date: "2023-07-18"
  },
  {
    id: 6,
    title: "Advocacy Meeting",
    description: "Community advocates discussing healthcare access strategies.",
    imageUrl: "/photos/7534503d-1c6b-438b-98ea-4f706a856228.webp",
    category: "Advocacy",
    date: "2023-09-29"
  },
  {
    id: 7,
    title: "Support Network Gathering",
    description: "Members of a support network sharing experiences and resources.",
    imageUrl: "/photos/8cf0f025-b7de-4ab8-bcd7-a98ad9e14a0a.webp",
    category: "Support",
    date: "2023-10-12"
  },
  {
    id: 8,
    title: "Educational Program",
    description: "Participants engaged in an educational program about health resources.",
    imageUrl: "/photos/c33bfad4-561f-4676-875a-ae1a8bc3f3b1.webp",
    category: "Education",
    date: "2023-08-05"
  },
  {
    id: 9,
    title: "Senior Services Program",
    description: "Senior participants in a health information session.",
    imageUrl: "/photos/cfc5e148-bc3e-4f56-9ff1-ca356061a665.webp",
    category: "Programs",
    date: "2023-11-20"
  },
  {
    id: 10,
    title: "Community Project",
    description: "Community members collaborating on a health awareness project.",
    imageUrl: "/photos/e9377f10-a7e5-492b-a09e-7df3e78ebfb3.webp",
    category: "Community",
    date: "2023-07-29"
  }
];

// Navigation data
export const navigation = {
  main: [
    { title: "About Us", path: "/about-us" },
    { title: "BW-SELF Advocacy", path: "/programs/bw-self" },
    { title: "Webinars", path: "/webinars" },
    { title: "Resources", path: "/resources" },
    { title: "Events", path: "/events" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" }
  ],
  actions: [
    { title: "Volunteer", path: "/volunteer", isPrimary: false },
    { title: "Donate", path: "/donate", isPrimary: true }
  ],
  social: [
    { platform: "facebook", url: "https://facebook.com/weneedwe" },
    { platform: "instagram", url: "https://instagram.com/weneedwe" },
    { platform: "twitter", url: "https://twitter.com/weneedwe" }
  ]
};

// Export all data for ease of access
export default {
  organizationInfo,
  coreValues,
  organizationStats,
  mainPrograms,
  blogPosts,
  upcomingEvents,
  webinarSeries,
  galleryPhotos,
  navigation
};