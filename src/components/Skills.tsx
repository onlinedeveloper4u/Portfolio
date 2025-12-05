import { motion } from "framer-motion";
import { Code2, Database, Smartphone, Globe, Server, Brain } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "iOS Development",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Swift", level: 4, description: "iOS native development" },
        { name: "SwiftUI", level: 5, description: "Modern UI framework" },
        { name: "UIKit", level: 4, description: "Traditional iOS UI" },
        { name: "Core Data", level: 4, description: "Data persistence" },
        { name: "REST APIs", level: 5, description: "Backend integration" }
      ]
    },
    {
      title: "MERN Stack",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "MongoDB", level: 4, description: "NoSQL database" },
        { name: "Express.js", level: 5, description: "Backend framework" },
        { name: "React.js", level: 4, description: "Frontend library" },
        { name: "Node.js", level: 5, description: "Server runtime" },
        { name: "Redux Toolkit", level: 4, description: "State management" }
      ]
    },
    {
      title: "Backend & APIs",
      icon: <Server className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "RESTful APIs", level: 5, description: "API design" },
        { name: "Strapi", level: 4, description: "Headless CMS" },
        { name: "Authentication", level: 4, description: "JWT & OAuth" },
        { name: "Database Design", level: 4, description: "Schema optimization" },
        { name: "Real-time Features", level: 4, description: "WebSocket & Socket.io" }
      ]
    },
    {
      title: "AI & Innovation",
      icon: <Brain className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "OpenAI Integration", level: 4, description: "AI-powered features" },
        { name: "Event Planning AI", level: 5, description: "Smart automation" },
        { name: "Content Generation", level: 4, description: "Dynamic content" },
        { name: "Machine Learning APIs", level: 3, description: "ML integration" },
        { name: "Intelligent Systems", level: 4, description: "Smart recommendations" }
      ]
    }
  ];

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      />
    ));
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent/10 text-accent-foreground rounded-full mb-4">
            <Code2 size={16} />
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expertise & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(skill.level)}
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-card rounded-2xl p-8 shadow-lg border border-border/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Languages</h3>
            <p className="text-muted-foreground">Communication skills and language proficiency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "English", level: 4, flag: "🇺🇸" },
              { name: "Urdu", level: 4, flag: "🇵🇰" },
              { name: "Punjabi", level: 5, flag: "🗣️" }
            ].map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="text-3xl mb-2">{language.flag}</div>
                <h4 className="font-semibold mb-2">{language.name}</h4>
                <div className="flex justify-center gap-1">
                  {renderStars(language.level)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;