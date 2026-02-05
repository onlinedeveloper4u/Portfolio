import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Braces, Database, Cpu, GitBranch, Layers, Zap } from "lucide-react";
import CVDownloadDialog from "@/components/CVDownloadDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  availability: string;
  profile_image: string;
  show_profile_image: string;
}

interface TechItem {
  id: string;
  name: string;
  color: string;
}

const Hero = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    name: "",
    title: "",
    subtitle: "",
    bio: "",
    availability: "",
    profile_image: "",
    show_profile_image: "false"
  });
  const [techStack, setTechStack] = useState<TechItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch site settings
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("*");

      if (settingsData && settingsData.length > 0) {
        const settingsObj: SiteSettings = {
          name: "",
          title: "",
          subtitle: "",
          bio: "",
          availability: "",
          profile_image: "",
          show_profile_image: "false"
        };
        settingsData.forEach((item: { key: string; value: string | null }) => {
          if (item.key in settingsObj) {
            (settingsObj as any)[item.key] = item.value || "";
          }
        });
        setSettings(settingsObj);
      }

      // Fetch tech stack
      const { data: techData } = await supabase
        .from("tech_stack")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (techData) {
        setTechStack(techData);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Floating tech icons
  const floatingIcons = [
    { icon: Terminal, delay: 0, x: "10%", y: "20%" },
    { icon: Braces, delay: 0.5, x: "85%", y: "15%" },
    { icon: Database, delay: 1, x: "15%", y: "75%" },
    { icon: Cpu, delay: 1.5, x: "80%", y: "70%" },
    { icon: GitBranch, delay: 2, x: "5%", y: "45%" },
    { icon: Layers, delay: 2.5, x: "90%", y: "45%" },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 md:py-0 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradient orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
      />

      {/* Floating tech icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.15,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: item.delay, duration: 1 },
            y: {
              delay: item.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute hidden md:block text-primary/50"
          style={{ left: item.x, top: item.y }}
        >
          <item.icon size={40} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
        className="absolute top-6 right-6 z-10 flex items-center gap-3"
      >
        <ThemeToggle />
        <CVDownloadDialog />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        {/* Terminal-style badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border mb-8 shadow-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code size={20} className="text-primary" />
          </motion.div>
          <span className="text-foreground font-medium">{settings.title}</span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{settings.availability}</span>
          </motion.div>
        </motion.div>

        {/* Profile Image - conditionally displayed */}
        {settings.show_profile_image === "true" && settings.profile_image && (
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <motion.img
              src={settings.profile_image}
              alt={settings.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-primary/30 shadow-2xl object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        )}

        {/* Name with typing effect style */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 relative"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
            {settings.name}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 h-12 md:h-16 bg-primary ml-2 align-middle"
          />
        </motion.h1>

        {/* Tech stack pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {techStack.map((tech, index) => (
            <motion.span
              key={tech.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-4 py-1.5 text-sm font-medium text-white rounded-full bg-gradient-to-r ${tech.color} shadow-md cursor-default`}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          <span className="text-primary font-medium">{settings.subtitle}</span>
          <br />
          {settings.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
          >
            <Zap size={18} />
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1.5 rounded-full bg-muted-foreground"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
