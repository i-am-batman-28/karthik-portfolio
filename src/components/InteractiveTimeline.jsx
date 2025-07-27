import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Building, Award } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    year: "2021",
    title: "Started BTech AI & Data Science",
    subtitle: "IIIT Sri City",
    description: "Began my journey in Artificial Intelligence and Data Science",
    type: "education"
  },
  {
    id: 2,
    year: "2024",
    title: "Core Member",
    subtitle: "TEDxIIITSriCity, GDG, Matrix",
    description: "Active involvement in tech communities and event management",
    type: "community"
  },
  {
    id: 3,
    year: "Jan 2025",
    title: "AI Intern",
    subtitle: "Excelerate",
    description: "Global job dataset analysis and employer trust scoring",
    type: "work"
  },
  {
    id: 4,
    year: "Jul 2025",
    title: "Software Engineer",
    subtitle: "Ontune AI",
    description: "Scalable AI agents and multilingual RAG systems",
    type: "work"
  },
  {
    id: 5,
    year: "Jul 2025",
    title: "Software Developer Engineer",
    subtitle: "NLightN",
    description: "LLM-powered APIs and data extraction flows",
    type: "work"
  },
  {
    id: 6,
    year: "Jul 2025",
    title: "Data Analyst",
    subtitle: "OmniSageAI",
    description: "E-commerce analytics and fraud detection systems",
    type: "work"
  },
  {
    id: 7,
    year: "2027",
    title: "Expected Graduation",
    subtitle: "IIIT Sri City",
    description: "Completing BTech in AI & Data Science",
    type: "education"
  }
];

export const InteractiveTimeline = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case 'education': return 'border-blue-500 bg-blue-500/10';
      case 'work': return 'border-green-500 bg-green-500/10';
      case 'community': return 'border-purple-500 bg-purple-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'education': return <Calendar className="h-4 w-4" />;
      case 'work': return <Building className="h-4 w-4" />;
      case 'community': return <Award className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Journey</span>
        </h2>
        
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          A timeline of my academic and professional growth in AI and technology.
        </p>

        <div 
          ref={timelineRef}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-transparent opacity-30" />
          
          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveNode(index)}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-primary">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-primary font-medium mb-2">{item.subtitle}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-8 h-8 rounded-full border-4 transition-all duration-300
                      ${activeNode === index 
                        ? 'scale-125 shadow-lg shadow-primary/50' 
                        : 'scale-100'
                      }
                      ${getTypeColor(item.type)}
                    `}
                  >
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div
                    className={`
                      absolute inset-0 rounded-full transition-all duration-300
                      ${activeNode === index 
                        ? 'bg-primary/30 scale-150 blur-md' 
                        : 'bg-transparent scale-100'
                      }
                    `}
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 