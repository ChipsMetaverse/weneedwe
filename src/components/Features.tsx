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
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "bg-white rounded-2xl p-8 shadow-sm border border-border transition-all",
        "hover:shadow-md hover:border-primary/30 hover:translate-y-[-4px]",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
      style={{ animationDelay: `${0.2 + delay}s` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
        color
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
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
        "text-center",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
    >
      <div className="text-4xl font-bold text-primary mb-2">
        {prefix}{value}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          )}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-white text-primary">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Supporting Our Community
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            We offer a comprehensive range of services designed to meet the diverse needs of our community members, with a focus on dignity, respect, and empowerment.
          </p>
        </div>
        
        {/* Statistics section */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
            Want to learn more about our services or how you can get involved?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="button-primary min-w-[160px]">
              Contact Us
            </a>
            <a href="#" className="button-secondary min-w-[160px]">
              Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
