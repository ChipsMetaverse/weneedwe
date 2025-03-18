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

const features = [
  {
    title: 'Community Support',
    description: 'Providing essential resources and support to families and individuals facing challenging situations.',
    icon: HeartHandshake,
    delay: 0,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Education Programs',
    description: 'Offering educational resources, tutoring, and mentorship for children and adults in underserved communities.',
    icon: GraduationCap,
    delay: 0.1,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Housing Assistance',
    description: 'Helping families and individuals find safe, affordable housing and providing emergency shelter services.',
    icon: Home,
    delay: 0.2,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Healthcare Access',
    description: 'Connecting community members with affordable healthcare services and wellness resources.',
    icon: PlusCircle,
    delay: 0.3,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Youth Development',
    description: 'Creating opportunities for youth to learn, grow, and develop leadership skills through mentorship and activities.',
    icon: BookOpen,
    delay: 0.4,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Food Security',
    description: 'Providing nutritious meals, food pantry services, and nutrition education to combat hunger in our community.',
    icon: Utensils,
    delay: 0.5,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Senior Services',
    description: 'Supporting elderly community members with companionship, assistance, and specialized programs.',
    icon: Users,
    delay: 0.6,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    title: 'Environmental Initiatives',
    description: 'Working to create cleaner, greener neighborhoods through community-based environmental projects.',
    icon: Leaf,
    delay: 0.7,
    color: 'bg-emerald-100 text-emerald-600'
  }
];

const FeatureCard = ({ title, description, icon: Icon, delay, color }: {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
  color: string;
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  // Extract color values for gradient
  const colorClass = color.split(' ')[0]; // e.g. "bg-red-100"
  const textColorClass = color.split(' ')[1]; // e.g. "text-red-600"
  
  // Get the base color (red, blue, etc.)
  const baseColor = colorClass.split('-')[1]; // e.g. "red"
  
  return (
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
      <div className="tilt-content">
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
          `bg-${baseColor}-100`,
          textColorClass,
          "shadow-md shadow-" + baseColor + "-200/50"
        )}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className={`text-xl font-bold mb-4 ${textColorClass}`}>{title}</h3>
        <p className="text-foreground/80 leading-relaxed">{description}</p>
        
        <div className={`mt-6 w-10 h-1 ${textColorClass.replace('text', 'bg')} rounded-full opacity-60 transition-all duration-300 group-hover:w-16`}></div>
      </div>
    </div>
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
  
  return (
    <section id="features" className="py-28 bg-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto mb-20",
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          )}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Services
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent">
            Supporting Our Community
          </h2>
          
          <p className="text-foreground/80 text-lg text-balance leading-relaxed">
            We offer a comprehensive range of services designed to meet the diverse needs of our community members, 
            with a focus on <span className="font-semibold text-foreground">dignity, respect, and empowerment</span>.
          </p>
        </div>
        
        {/* Statistics section */}
        <div className="glass p-12 mb-20 rounded-3xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-24 text-center max-w-3xl mx-auto glass p-10 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to make a difference?</h3>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Join our community of volunteers and supporters to create positive change in the lives of those who need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#contact" className="button-primary min-w-[180px] py-4 text-base">
              Contact Us
            </a>
            <a href="#" className="button-secondary min-w-[180px] py-4 text-base">
              Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
