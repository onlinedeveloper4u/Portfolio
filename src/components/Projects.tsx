import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Smartphone, Globe, Filter, Layers, Monitor, Server, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import leafIcon from "/lovable-uploads/0535b3ff-2532-4ceb-9b7d-02e62f7af27a.png";
import ombiIcon from "/lovable-uploads/24e71ac5-ca00-4833-89e1-cd14ba31993b.png";
import creatorIcon from "/lovable-uploads/49782510-2ca3-4464-acd4-d75f002421ba.png";
import trackIcon from "/lovable-uploads/bf6979bc-a5f4-431b-9be4-ebc88d57297c.png";
import vooconnectIcon from "/lovable-uploads/7185eb43-f0d7-495c-a39d-cdd65ceda626.png";
import mpowerIcon from "@/assets/mpower-app-icon.png";

const categories = ["All", "Full-Stack", "iOS", "Cross-Platform", "MERN"];

type ContributionType = "frontend" | "backend" | "fullstack";

// Define default projects as a fallback
const defaultProjects = [
  {
    title: "MPower Pro",
    description: "Music · Mind · Mastery Mobile App. The ultimate studio for music, mind and mastery. Contributed to both frontend (React Native) and backend (Strapi CMS). A creative platform that builds more than tracks - it builds you. Produce and record songs with multitrack DAW, add harmonies and effects, create instant music videos. Connect with rappers, singers, and producers globally. Features daily mood check-ins, goal tracking, challenges, masterclasses, and AI guidance. Seven apps in one - fusing music creation, collaboration, and personal development into one powerhouse platform.",
    technologies: "iOS, Android, React Native, Strapi Backend, AI Integration",
    imageUrl: mpowerIcon,
    link: "https://apps.apple.com/au/app/mpower-pro/id6443431786",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.mpower.online",
    websiteLink: "https://mpower.online/",
    isApp: true,
    category: "Cross-Platform",
    contribution: "fullstack" as ContributionType,
    period: "2023 - Present"
  },
  {
    title: "Leaf - Book Your Friends",
    description: "Planning a casual hangout or hobby meetup shouldn't feel like a full-time job. Meet Leaf – the playful, AI-powered event planner that makes organizing small group gatherings a breeze! Contributed to both iOS app development and backend services including APIs, cron jobs, and cloud functions. Whether you're the friend who always hosts or just getting into event planning, Leaf keeps event scheduling, task management, and social organizing all in one place. Import events from Partiful, Luma, Eventbrite, SeatGeek, and Fandango. Smart checklists, AI-generated descriptions, group scheduler, and micro-planner assistant help you focus on the fun while Leaf handles the details.",
    technologies: "iOS, Swift, SwiftUI, Node.js APIs, Cloud Functions, Cron Jobs, AI Integration",
    imageUrl: leafIcon,
    link: "https://apps.apple.com/lt/app/leaf-book-your-friends/id1040588046",
    isApp: true,
    category: "iOS",
    contribution: "fullstack" as ContributionType,
    period: "Nov 2020 - Present"
  },
  {
    title: "Ombi - Preview Restaurants",
    description: "An immersive iOS app that lets you preview and book authentic restaurants through video. Experience the ambiance and see the food before you visit. Discover restaurants through immersive video previews that showcase the atmosphere, cuisine, and dining experience. Book tables directly through the app and make informed dining decisions with real restaurant footage.",
    technologies: "iOS, Swift, UIKit, Video Streaming, Restaurant Booking",
    imageUrl: ombiIcon,
    link: "https://apps.apple.com/us/app/ombi-preview-restaurants/id1598753264",
    isApp: true,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    period: "Aug 2021 - Mar 2022"
  },
  {
    title: "Creator Music Studio",
    description: "This is an all-in-one app for making music on your phone. You can create songs in popular styles, generate lyrics and melodies with AI, record vocals, and add effects like Auto-Tune. It's beginner-friendly, yet powerful enough for serious creators. Share your tracks in the Creator Feed, get feedback, and grow your audience—all from one app.",
    technologies: "iOS, Swift, Audio Production, Music Creation, AI",
    imageUrl: creatorIcon,
    link: "https://apps.apple.com/us/app/creator-music-studio/id6445974873",
    isApp: true,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    period: "Jun 2022 - Apr 2023"
  },
  {
    title: "The Track App",
    description: "A fast and minimalistic calendar and scheduling platform designed to enhance productivity through real-time event syncing, intuitive user interface, and optimized backend APIs. Focused on delivering a seamless cross-device experience with responsive design, reliable performance, and streamlined workflows to help users plan and manage their time efficiently.",
    technologies: "Swift, SwiftUI, Event Planning",
    imageUrl: trackIcon,
    link: "https://thetrackapp.com/",
    isApp: true,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    period: "Apr 2022 - May 2022"
  },
  {
    title: "Leaf Admin Dashboard",
    description: "Admin dashboard for the Leaf iOS app featuring user management, analytics, event monitoring, and comprehensive reporting tools. Built with React.js and integrated with Node.js backend APIs for real-time data management and analytics visualization.",
    technologies: "React, Node.js, MongoDB, Express, Dashboard Analytics",
    imageUrl: leafIcon,
    link: "https://admin.joinleaf.com/",
    isApp: false,
    category: "MERN",
    contribution: "fullstack" as ContributionType,
    period: "Nov 2020 - Present"
  },
  {
    title: "Vooconnect",
    description: "Vooconnect is an all-in-one social networking platform designed to connect users through a variety of interactive features. Contributed to both iOS app development and Node.js backend APIs. The app offers functionalities such as full-screen posts, live streaming, chat with walkie-talkie capabilities, and a marketplace for local buying and selling. Users can also subscribe to content creators for exclusive access.",
    technologies: "iOS, Swift, SwiftUI, Node.js Backend, MongoDB, REST APIs",
    imageUrl: vooconnectIcon,
    link: "https://apps.apple.com/us/app/vooconnect/id1573637452",
    isApp: true,
    category: "iOS",
    contribution: "fullstack" as ContributionType,
    period: "Mar 2023 - Apr 2023"
  }
];

const getContributionBadge = (contribution: ContributionType) => {
  switch (contribution) {
    case "fullstack":
      return {
        label: "Full-Stack",
        icon: <Layers size={12} />,
        className: "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-500/30",
        tooltip: "Contributed to both frontend UI/UX development and backend services including APIs, databases, and server-side logic"
      };
    case "backend":
      return {
        label: "Backend",
        icon: <Server size={12} />,
        className: "bg-green-500/20 text-green-400 border border-green-500/30",
        tooltip: "Contributed to backend development including APIs, databases, cloud functions, and server-side architecture"
      };
    case "frontend":
    default:
      return {
        label: "Frontend",
        icon: <Monitor size={12} />,
        className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        tooltip: "Contributed to frontend development including UI design, user experience, and client-side functionality"
      };
  }
};

const MAX_DESCRIPTION_LENGTH = 150;

const ProjectCard = ({ project, index }: { project: typeof defaultProjects[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = project.description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded || !shouldTruncate 
    ? project.description 
    : project.description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-accent/10 group"
    >
      <div className="h-48 overflow-hidden bg-gradient-to-br from-background to-accent/5 flex items-center justify-center">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500 rounded-2xl shadow-lg"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
            {project.category}
          </span>
          {project.contribution && (() => {
            const badge = getContributionBadge(project.contribution);
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.span 
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded cursor-help ${badge.className}`}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 0 12px rgba(139, 92, 246, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {badge.icon}
                      </motion.span>
                      {badge.label}
                    </motion.span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-center">
                    <p>{badge.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })()}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
        
        {/* Description with Read More */}
        <div className="mb-4">
          <motion.p 
            className="text-muted-foreground text-sm leading-relaxed"
            layout
          >
            {displayDescription}
          </motion.p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {isExpanded ? (
                <>
                  Read Less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium bg-accent/10 text-accent-foreground px-3 py-1 rounded-full">
            {project.technologies}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <span>{project.isApp ? "App Store" : "View Project"}</span>
            {project.isApp ? (
              <img src="/lovable-uploads/e3d2fef8-1fe6-47de-857d-d0baaa452f90.png" alt="App Store" className="w-4 h-4" />
            ) : (
              <Smartphone size={14} />
            )}
          </a>
          {project.playStoreLink && (
            <a 
              href={project.playStoreLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span>Play Store</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
            </a>
          )}
          {project.websiteLink && (
            <a 
              href={project.websiteLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span>Website</span>
              <Globe size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    // Load projects from localStorage if available
    const storedProjects = localStorage.getItem("portfolioProjects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : activeFilter === "Full-Stack"
    ? projects.filter(p => p.contribution === "fullstack")
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-background to-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-accent/10 text-accent-foreground rounded-full mb-4">
            <Code size={16} />
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Explore some of my recent projects and development work
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-accent/10 text-accent-foreground hover:bg-accent/20"
              }`}
            >
              {category === "All" && <Filter size={14} className="inline mr-2" />}
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;