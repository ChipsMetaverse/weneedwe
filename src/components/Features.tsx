import React from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { 
  HeartHandshake, 
  GraduationCap, 
  Home, 
  PlusCircle,
  BookOpen,
  Utensils,
  Users,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated services based on weneedwe.org content
const features = [
  {
    title: 'BW-SELF Advocacy',
    description: 'Our advocacy program empowers Black Women to navigate healthcare systems, pursue education, and access community resources.',
    icon: HeartHandshake,
    delay: 0,
    color: 'bg-red-100 text-red-700',
    link: '/programs/bw-self',
    featured: true
  },
  {
    title: 'HIV Support Services',
    description: 'We provide comprehensive support for individuals living with HIV, including linkage to medical care, counseling, and peer support groups.',
    icon: PlusCircle,
    delay: 0.1,
    color: 'bg-red-50 text-red-600',
    link: '#',
    featured: false
  },
  {
    title: 'Youth Empowerment',
    description: 'Our youth programs focus on developing leadership skills, promoting academic achievement, and fostering civic engagement among young people.',
    icon: BookOpen,
    delay: 0.2,
    color: 'bg-rose-100 text-rose-700',
    link: '#',
    featured: false
  },
  {
    title: 'Community Health Education',
    description: 'We offer workshops and educational programs on various health topics, including nutrition, physical activity, and chronic disease prevention.',
    icon: Utensils,
    delay: 0.3,
    color: 'bg-red-100 text-red-800',
    link: '/webinars',
    featured: true
  },
  {
    title: 'Education Programs',
    description: 'Offering educational resources, tutoring, and mentorship for children and adults in underserved communities.',
    icon: GraduationCap,
    delay: 0.4,
    color: 'bg-rose-50 text-rose-600',
    link: '/resources',
    featured: true
  },
  {
    title: 'Housing Assistance',
    description: 'Helping families and individuals find safe, affordable housing and providing emergency shelter services.',
    icon: Home,
    delay: 0.5,
    color: 'bg-red-50 text-red-700',
    link: '#',
    featured: false
  },
  {
    title: 'Senior Services',
    description: 'Supporting elderly community members with companionship, assistance, and specialized programs.',
    icon: Users,
    delay: 0.6,
    color: 'bg-rose-100 text-rose-800',
    link: '#',
    featured: false
  },
  {
    title: 'Environmental Initiatives',
    description: 'Working to create cleaner, greener neighborhoods through community-based environmental projects.',
    icon: Leaf,
    delay: 0.7,
    color: 'bg-red-100 text-red-600',
    link: '#',
    featured: false
  }
];

const FeatureCard = ({ title, description, icon: Icon, delay, color, link, featured }: {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
  color: string;
  link: string;
  featured?: boolean;
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  // Extract color values for gradient
  const colorClass = color.split(' ')[0]; // e.g. "bg-red-100"
  const textColorClass = color.split(' ')[1]; // e.g. "text-red-600"
  
  // Get the base color (red, blue, etc.)
  const baseColor = colorClass.split('-')[1]; // e.g. "red"
  
  const CardContent = () => (
    <div className="tilt-content">
      <div className={cn(
        "w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
        `bg-${baseColor}-100`,
        textColorClass,
        "shadow-md shadow-" + baseColor + "-200/50"
      )}>
        <Icon className="w-8 h-8" />
      </div>
      {featured && (
        <div className="mb-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          Featured Program
        </div>
      )}
      <h3 className={`text-xl font-bold mb-4 ${textColorClass}`}>{title}</h3>
      <p className="text-foreground/80 leading-relaxed">{description}</p>
      
      {link !== '#' && (
        <div className={`mt-6 flex items-center gap-2 ${textColorClass} font-medium`}>
          <span>Learn more</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      
      <div className={`mt-4 w-10 h-1 ${textColorClass.replace('text', 'bg')} rounded-full opacity-60 transition-all duration-300 group-hover:w-16`}></div>
    </div>
  );
  
  // Return clickable or non-clickable version based on link
  return link === '#' ? (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "gradient-card group tilt-card p-8 transition-all duration-500",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
      style={{ 
        animationDelay: `${0.2 + delay}s`,
        background: `linear-gradient(135deg, var(--${baseColor}-50) 0%, var(--${baseColor}-100) 100%)`,
      }}
    >
      <CardContent />
    </div>
  ) : (
    <Link 
      to={link}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={cn(
        "gradient-card group tilt-card p-8 transition-all duration-500 block",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
      style={{ 
        animationDelay: `${0.2 + delay}s`,
        background: `linear-gradient(135deg, var(--${baseColor}-50) 0%, var(--${baseColor}-100) 100%)`,
      }}
    >
      <CardContent />
    </Link>
  );
};

// Featured statistics
const stats = [
  { label: 'People Served', value: '15,000+', prefix: '' },
  { label: 'Volunteer Hours', value: '25,000+', prefix: '' },
  { label: 'Community Partners', value: '120+', prefix: '' },
  { label: 'Years of Service', value: '25+', prefix: '' }
];

const StatItem = ({ label, value, prefix }: { label: string; value: string; prefix: string }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "text-center group",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
    >
      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block mb-3 
                    transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-4px]">
        {prefix}{value}
      </div>
      <div className="text-foreground/80 font-medium text-lg">{label}</div>
      <div className="mt-3 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60 mx-auto
                   transition-all duration-300 group-hover:w-24 group-hover:opacity-100"></div>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  // Filter to show only featured programs by default
  const featuredPrograms = features.filter(feature => feature.featured);
  
  return (
    <section id="features" className="py-24 md:py-32 bg-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-2xl mx-auto mb-20",
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          )}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Programs
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent">
            Supporting Our Community
          </h2>
          
          <p className="text-foreground/80 text-lg leading-relaxed">
            We offer a comprehensive range of services designed to meet the diverse needs of our community members, 
            with a focus on dignity, respect, and empowerment.
          </p>
        </div>
        
        {/* Featured Programs */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
                color={feature.color}
                link={feature.link}
                featured={feature.featured}
              />
            ))}
          </div>
        </div>
        
        {/* Statistics section - simplified */}
        <div className="glass p-10 rounded-2xl shadow-md max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                label={stat.label}
                value={stat.value}
                prefix={stat.prefix}
              />
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center max-w-2xl mx-auto glass p-10 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to make a difference?</h3>
          <p className="text-lg text-foreground/70 mb-6">
            Join our community of volunteers and supporters to create positive change.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/volunteer" className="button-primary py-3 text-base">
              Volunteer With Us
            </Link>
            <Link to="/programs/bw-self" className="button-secondary py-3 text-base">
              Explore Our Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;