import { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, FolderOpen, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show nav after initial load
    const timer = setTimeout(() => setIsVisible(true), 1000);

    // Track active section
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className={`
          fixed bottom-6 right-6 z-50 transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg
            hover:shadow-xl transition-all duration-300 hover:scale-110
            flex items-center justify-center
            ${isOpen ? 'rotate-45' : 'rotate-0'}
          `}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Floating Navigation Menu */}
      <div
        className={`
          fixed bottom-24 right-6 z-40 transition-all duration-500
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
        `}
      >
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-2xl border border-border/50 p-4">
          <div className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    group relative w-12 h-12 rounded-xl transition-all duration-300
                    flex items-center justify-center
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50' 
                      : 'bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }
                    hover:scale-110 hover:rotate-3
                  `}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <Icon size={20} />
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 px-3 py-1 bg-card text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.name}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-card border-t-2 border-t-transparent border-b-2 border-b-transparent" />
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Connection lines */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-t from-primary to-transparent" />
      </div>

      {/* Background blur when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}; 