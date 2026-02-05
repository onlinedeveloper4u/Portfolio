import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Database, Smartphone, Globe, Server, Brain, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Tool {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
  level: string;
  flag: string | null;
}

const categoryIcons: Record<string, { icon: typeof Smartphone; color: string; shadowColor: string }> = {
  "iOS Development": { icon: Smartphone, color: "from-orange-500 to-pink-500", shadowColor: "shadow-orange-500/20" },
  "MERN Stack": { icon: Globe, color: "from-green-500 to-emerald-500", shadowColor: "shadow-green-500/20" },
  "Backend & APIs": { icon: Server, color: "from-purple-500 to-violet-500", shadowColor: "shadow-purple-500/20" },
  "AI & Innovation": { icon: Brain, color: "from-cyan-500 to-blue-500", shadowColor: "shadow-cyan-500/20" },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skillCategories, setSkillCategories] = useState<{ title: string; skills: { name: string; level: number }[] }[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ name: string; level: string; flag: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch skills
      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (skillsData && skillsData.length > 0) {
        // Group skills by category
        const grouped: Record<string, { name: string; level: number }[]> = {};
        skillsData.forEach((skill: Skill) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }
          grouped[skill.category].push({ name: skill.name, level: skill.proficiency || 80 });
        });

        const categories = Object.entries(grouped).map(([title, skills]) => ({
          title,
          skills
        }));

        setSkillCategories(categories);
      }

      // Fetch tools
      const { data: toolsData } = await supabase
        .from("tools")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (toolsData) {
        setTools(toolsData.map((t: Tool) => t.name));
      }

      // Fetch languages
      const { data: languagesData } = await supabase
        .from("languages")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (languagesData) {
        setLanguages(languagesData.map((l: Language) => ({
          name: l.name,
          level: l.level,
          flag: l.flag || "🌐"
        })));
      }
    };

    fetchData();
  }, []);

  return (
    <section id="skills" className="py-24 px-4 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6 border border-primary/20"
          >
            <Code2 size={16} />
            Technical Skills
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Expertise & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const iconData = categoryIcons[category.title] || { icon: Code2, color: "from-gray-500 to-gray-600", shadowColor: "shadow-gray-500/20" };
            const IconComponent = iconData.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${iconData.shadowColor}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${iconData.color} text-white shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${iconData.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Tools & Platforms</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 p-8 rounded-2xl bg-card border border-border"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Languages</h3>
            <p className="text-muted-foreground text-sm">Communication skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languages.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="text-3xl mb-2">{language.flag}</div>
                <h4 className="font-semibold mb-1">{language.name}</h4>
                <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">
                  {language.level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
