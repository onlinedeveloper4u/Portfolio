import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Globe, Layers, Terminal, GitBranch, Rocket, Coffee } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "4+", label: "Years Experience", icon: Coffee },
    { number: "20+", label: "Projects Delivered", icon: Rocket },
    { number: "15+", label: "Technologies", icon: Terminal },
    { number: "100%", label: "Client Satisfaction", icon: GitBranch },
  ];

  const expertise = [
    { icon: Smartphone, label: "iOS Development", desc: "Swift, SwiftUI, UIKit", color: "from-orange-500 to-pink-500" },
    { icon: Globe, label: "MERN Stack", desc: "MongoDB, Express, React, Node", color: "from-green-500 to-cyan-500" },
    { icon: Code2, label: "React Native", desc: "Cross-platform mobile apps", color: "from-blue-500 to-purple-500" },
    { icon: Layers, label: "Full-Stack", desc: "End-to-end solutions", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6 border border-primary/20"
          >
            <Terminal size={16} />
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground text-transparent bg-clip-text">
              Professional Background
            </span>
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 rounded-2xl bg-card border border-border text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.5 + index * 0.1, stiffness: 200 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a <span className="text-foreground font-medium">Senior Software Engineer</span> with extensive experience in modern development tools and technologies. Currently working as a freelance developer, I specialize in <span className="text-primary font-medium">iOS development</span> using Swift, SwiftUI, and UIKit, as well as full-stack development with the <span className="text-primary font-medium">MERN stack</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At iParagons, I've contributed significantly to the development of the <span className="text-foreground font-medium">Leaf app</span> and various web applications, implementing key features and enhancing user experiences through innovative solutions including <span className="text-primary font-medium">AI-powered features</span>.
            </p>
            
            {/* Code block decoration */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-4 rounded-lg bg-card border border-border font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-muted-foreground">
                <span className="text-purple-500">const</span> <span className="text-blue-500">developer</span> = {"{"}
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-green-500">passion</span>: <span className="text-orange-500">"Building great apps"</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-green-500">focus</span>: <span className="text-orange-500">"Clean code & UX"</span>
              </div>
              <div className="text-muted-foreground">{"}"}</div>
            </motion.div>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {expertise.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-5 rounded-2xl bg-card border border-border group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
