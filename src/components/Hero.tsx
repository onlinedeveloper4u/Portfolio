import { motion } from "framer-motion";
import { Code, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateCV } from "@/lib/cvGenerator";

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

  const handleDownloadCV = async (format: 'pdf' | 'docx') => {
    await generateCV(format);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 md:py-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative">
      {/* Download CV Button - Fixed Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-6 right-6 z-10"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className="gap-2 bg-gradient-to-r from-[#58a6ff] to-[#88d1f1] text-[#0d1117] hover:from-[#88d1f1] hover:to-[#58a6ff] shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <Download size={18} />
              Download CV
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#0d1117] border border-[#30363d] text-gray-200">
            <DropdownMenuItem 
              onClick={() => handleDownloadCV('pdf')}
              className="cursor-pointer hover:bg-[#161b22] focus:bg-[#161b22] gap-2"
            >
              <FileText size={16} className="text-red-400" />
              Download as PDF
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDownloadCV('docx')}
              className="cursor-pointer hover:bg-[#161b22] focus:bg-[#161b22] gap-2"
            >
              <FileText size={16} className="text-blue-400" />
              Download as DOCX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1117] border border-[#30363d] mb-6"
        >
          <Code size={20} className="text-[#58a6ff]" />
          <span className="text-gray-200 font-medium">Senior Software Engineer</span>
          <Code size={20} className="text-[#58a6ff]" />
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#58a6ff] via-[#88d1f1] to-[#58a6ff] text-transparent bg-clip-text animate-text"
        >
          Muhammad Aqib Rafiqe
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          iOS Developer | MERN Stack Developer | Building innovative mobile and web solutions with Swift, SwiftUI, React, and Node.js
        </motion.p>
        
      </motion.div>
    </section>
  );
};

export default Hero;