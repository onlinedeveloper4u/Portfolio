import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Smartphone, Globe, Filter, Layers, Monitor, Server, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import leafIcon from "/assets/0535b3ff-2532-4ceb-9b7d-02e62f7af27a.png";
import ombiIcon from "/assets/24e71ac5-ca00-4833-89e1-cd14ba31993b.png";
import creatorIcon from "/assets/49782510-2ca3-4464-acd4-d75f002421ba.png";
import trackIcon from "/assets/bf6979bc-a5f4-431b-9be4-ebc88d57297c.png";
import vooconnectIcon from "/assets/7185eb43-f0d7-495c-a39d-cdd65ceda626.png";
import mpowerIcon from "@/assets/mpower-app-icon.png";

const categories = ["All", "Full-Stack", "iOS", "Cross-Platform", "MERN"];

type ContributionType = "frontend" | "backend" | "fullstack";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  app_store_url: string | null;
  play_store_url: string | null;
  featured: boolean;
  visible: boolean;
  sort_order: number;
}

// Define default projects as a fallback
const defaultProjects = [
  {
    id: "1",
    title: "MPower Pro",
    description: "Music · Mind · Mastery Mobile App. The ultimate studio for music, mind and mastery. Contributed to both frontend (React Native) and backend (Strapi CMS). A creative platform that builds more than tracks - it builds you.",
    technologies: ["iOS", "Android", "React Native", "Strapi Backend", "AI Integration"],
    image_url: mpowerIcon,
    live_url: "https://apps.apple.com/au/app/mpower-pro/id6443431786",
    play_store_url: "https://play.google.com/store/apps/details?id=com.mpower.online",
    github_url: null,
    app_store_url: "https://apps.apple.com/au/app/mpower-pro/id6443431786",
    category: "Cross-Platform",
    contribution: "fullstack" as ContributionType,
    featured: true,
    visible: true,
    sort_order: 0
  },
  {
    id: "2",
    title: "Leaf - Book Your Friends",
    description: "Planning a casual hangout or hobby meetup shouldn't feel like a full-time job. Meet Leaf – the playful, AI-powered event planner that makes organizing small group gatherings a breeze!",
    technologies: ["iOS", "Swift", "SwiftUI", "Node.js APIs", "Cloud Functions"],
    image_url: leafIcon,
    live_url: "https://apps.apple.com/lt/app/leaf-book-your-friends/id1040588046",
    github_url: null,
    app_store_url: "https://apps.apple.com/lt/app/leaf-book-your-friends/id1040588046",
    play_store_url: null,
    category: "iOS",
    contribution: "fullstack" as ContributionType,
    featured: true,
    visible: true,
    sort_order: 1
  },
  {
    id: "3",
    title: "Ombi - Preview Restaurants",
    description: "An immersive iOS app that lets you preview and book authentic restaurants through video. Experience the ambiance and see the food before you visit.",
    technologies: ["iOS", "Swift", "UIKit", "Video Streaming"],
    image_url: ombiIcon,
    live_url: "https://apps.apple.com/us/app/ombi-preview-restaurants/id1598753264",
    github_url: null,
    app_store_url: "https://apps.apple.com/us/app/ombi-preview-restaurants/id1598753264",
    play_store_url: null,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    featured: false,
    visible: true,
    sort_order: 2
  },
  {
    id: "4",
    title: "Creator Music Studio",
    description: "This is an all-in-one app for making music on your phone. You can create songs in popular styles, generate lyrics and melodies with AI, record vocals, and add effects like Auto-Tune.",
    technologies: ["iOS", "Swift", "Audio Production", "AI"],
    image_url: creatorIcon,
    live_url: "https://apps.apple.com/us/app/creator-music-studio/id6445974873",
    github_url: null,
    app_store_url: "https://apps.apple.com/us/app/creator-music-studio/id6445974873",
    play_store_url: null,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    featured: false,
    visible: true,
    sort_order: 3
  },
  {
    id: "5",
    title: "The Track App",
    description: "A fast and minimalistic calendar and scheduling platform designed to enhance productivity through real-time event syncing, intuitive user interface, and optimized backend APIs.",
    technologies: ["Swift", "SwiftUI", "Event Planning"],
    image_url: trackIcon,
    live_url: "https://thetrackapp.com/",
    github_url: null,
    app_store_url: null,
    play_store_url: null,
    category: "iOS",
    contribution: "frontend" as ContributionType,
    featured: false,
    visible: true,
    sort_order: 4
  },
  {
    id: "6",
    title: "Leaf Admin Dashboard",
    description: "Admin dashboard for the Leaf iOS app featuring user management, analytics, event monitoring, and comprehensive reporting tools.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image_url: leafIcon,
    live_url: "https://admin.joinleaf.com/",
    github_url: null,
    app_store_url: null,
    play_store_url: null,
    category: "MERN",
    contribution: "fullstack" as ContributionType,
    featured: false,
    visible: true,
    sort_order: 5
  },
  {
    id: "7",
    title: "Vooconnect",
    description: "Vooconnect is an all-in-one social networking platform designed to connect users through a variety of interactive features.",
    technologies: ["iOS", "Swift", "SwiftUI", "Node.js Backend"],
    image_url: vooconnectIcon,
    live_url: "https://apps.apple.com/us/app/vooconnect/id1573637452",
    github_url: null,
    app_store_url: "https://apps.apple.com/us/app/vooconnect/id1573637452",
    play_store_url: null,
    category: "iOS",
    contribution: "fullstack" as ContributionType,
    featured: false,
    visible: true,
    sort_order: 6
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

const ProjectCard = ({ project, index }: { project: Project & { contribution?: ContributionType }; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = project.description || '';
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded || !shouldTruncate
    ? description
    : description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  const isApp = project.app_store_url || project.category === 'iOS' || project.category === 'Cross-Platform';
  const technologies = project.technologies?.join(', ') || '';

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
          src={project.image_url || '/placeholder.svg'}
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
            {technologies}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {(project.app_store_url || project.live_url) && (
            <a
              href={project.app_store_url || project.live_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span>{isApp ? "App Store" : "View Project"}</span>
              {isApp ? (
                <img src="/assets/e3d2fef8-1fe6-47de-857d-d0baaa452f90.png" alt="App Store" className="w-4 h-4" />
              ) : (
                <Smartphone size={14} />
              )}
            </a>
          )}
          {project.play_store_url && (
            <a
              href={project.play_store_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span>Play Store</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
              </svg>
            </a>
          )}
          {project.live_url && !project.app_store_url && !isApp && (
            <a
              href={project.live_url}
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
  const [projects, setProjects] = useState<(Project & { contribution?: ContributionType })[]>(defaultProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
        // Keep default projects on error
      } else if (data && data.length > 0) {
        // Map database projects and add contribution type based on category
        const mappedProjects = data.map(p => ({
          ...p,
          contribution: (p.category === 'Full-Stack' || p.technologies?.some((t: string) =>
            t.toLowerCase().includes('node') ||
            t.toLowerCase().includes('backend') ||
            t.toLowerCase().includes('api')
          )) ? 'fullstack' as ContributionType : 'frontend' as ContributionType
        }));
        setProjects(mappedProjects);
      }
      setLoading(false);
    };

    fetchProjects();
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category
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
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
