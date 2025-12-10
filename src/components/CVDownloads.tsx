import { motion } from "framer-motion";
import { Download, Code, Smartphone } from "lucide-react";

const CVDownloads = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="cv-downloads" className="py-20 px-4 bg-gradient-to-br from-background to-background/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
          >
            Download My CVs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Download my professional CVs tailored for different technology stacks and specializations.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">MERN Stack Developer</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Full-stack development expertise with MongoDB, Express.js, React, and Node.js.
            </p>
            <motion.a
              href="https://rxresu.me/onlinedeveloper4u/aqib-mern-rxresu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
            >
              <Download size={18} />
              Download MERN CV
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">iOS Developer</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Native iOS development with Swift, UIKit, and modern iOS frameworks.
            </p>
            <motion.a
              href="https://rxresu.me/onlinedeveloper4u/aqib-ios-rxresu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
            >
              <Download size={18} />
              Download iOS CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVDownloads;