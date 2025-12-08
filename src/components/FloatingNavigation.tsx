import { motion } from "framer-motion";
import { Home, User, Code, Briefcase, Calendar, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navigationItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "experience", icon: Calendar, label: "Experience" },
  { id: "cv-downloads", icon: FileDown, label: "CV" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const FloatingNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }

      // Show navigation on scroll
      setIsVisible(true);
      
      // Clear existing timeout
      clearTimeout(hideTimeout);
      
      // Hide after 2 seconds of no scrolling (unless hovered)
      hideTimeout = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    // Show initially then hide after delay
    setIsVisible(true);
    hideTimeout = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 3000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
    };
  }, [isHovered]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div 
      className="fixed z-50"
      style={{ 
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)"
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        // Hide after a short delay when mouse leaves
        setTimeout(() => {
          if (!isHovered) {
            setIsVisible(false);
          }
        }, 1500);
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0.15, 
          x: isVisible ? 0 : 40,
          scale: isVisible ? 1 : 0.9
        }}
        transition={{ 
          duration: 0.4, 
          type: "spring",
          stiffness: 150,
          damping: 20
        }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
      >
        {/* Glass morphism container */}
        <div className="relative flex flex-col gap-3 p-2 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/20 shadow-2xl">
          {/* Animated background gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10 animate-pulse" />
          
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.7 + (0.1 * index),
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <Button
                  size="icon"
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative w-11 h-11 rounded-xl transition-all duration-300",
                    "hover:shadow-lg hover:shadow-primary/20",
                    isActive ? [
                      "bg-gradient-to-br from-primary to-primary/80",
                      "shadow-lg shadow-primary/30",
                      "scale-110 border-0"
                    ] : [
                      "bg-background/50 hover:bg-background/80",
                      "border border-border/30 hover:border-primary/30"
                    ]
                  )}
                >
                  <motion.div
                    animate={{ 
                      rotate: isActive ? 360 : 0,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? "text-primary-foreground" : "text-foreground/70 group-hover:text-primary"
                    )} />
                  </motion.div>
                  
                  {/* Active indicator pulse */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-xl bg-primary/20"
                    />
                  )}
                </Button>
                
                {/* Enhanced Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className={cn(
                    "absolute right-full mr-3 top-1/2 -translate-y-1/2",
                    "px-3 py-1.5 bg-gradient-to-r from-background to-background/95",
                    "text-foreground text-sm font-medium rounded-lg",
                    "shadow-xl border border-border/20 backdrop-blur-xl",
                    "whitespace-nowrap opacity-0 group-hover:opacity-100",
                    "pointer-events-none"
                  )}
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-background border-y-4 border-y-transparent" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingNavigation;