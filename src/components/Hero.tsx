import { motion } from "framer-motion";
import { Code } from "lucide-react";
import CVDownloadDialog from "@/components/CVDownloadDialog";
import ThemeToggle from "@/components/ThemeToggle";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 md:py-0 bg-gradient-to-br from-background to-secondary relative">
      {/* Header Actions - Fixed Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-6 right-6 z-10 flex items-center gap-3"
      >
        <ThemeToggle />
        <CVDownloadDialog />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6"
        >
          <Code size={20} className="text-primary" />
          <span className="text-foreground font-medium">Senior Software Engineer</span>
          <Code size={20} className="text-primary" />
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent-foreground to-primary text-transparent bg-clip-text animate-text"
        >
          Muhammad Aqib Rafiqe
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          iOS Developer | MERN Stack Developer | Building innovative mobile and web solutions with Swift, SwiftUI, React, and Node.js
        </motion.p>
        
      </motion.div>
    </section>
  );
};

export default Hero;
