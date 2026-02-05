import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Award, Code2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  type: string;
  visible: boolean;
  sort_order: number;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('visible', true)
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error fetching experiences:', error);
      } else if (data) {
        setExperiences(data);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    // User requested "day in number at start separated by comma" with leading zero -> "05 Jan 2023" (Comma removed per latest request)
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  };

  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-cyan-500/10 relative overflow-hidden">
      {/* ... (keep existing background elements) ... */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* ... (keep existing header) ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-cyan-500/20 text-violet-700 dark:text-violet-300 rounded-full mb-6 border border-violet-500/30 backdrop-blur-sm">
            <Briefcase size={16} className="animate-bounce text-pink-500" />
            Professional Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-transparent bg-clip-text animate-pulse">
            Career Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional growth and key achievements in software development
          </p>
        </motion.div>

        <div className="relative">
          {/* ... (keep timeline line) ... */}
          <div className="absolute left-4 md:left-1/2 md:-ml-1 top-0 bottom-0 w-2 bg-gradient-to-b from-violet-500 via-pink-500 via-cyan-500 to-emerald-500 rounded-full shadow-lg"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* ... (keep timeline dot) ... */}
                <div className={`absolute left-4 md:left-1/2 md:-ml-4 w-8 h-8 rounded-full border-4 border-background shadow-xl z-10 flex items-center justify-center ${index === 0 ? 'bg-gradient-to-r from-violet-500 to-purple-600' :
                  index === 1 ? 'bg-gradient-to-r from-pink-500 to-rose-600' :
                    index === 2 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                      'bg-gradient-to-r from-emerald-500 to-green-600'
                  }`}>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-inner"></div>
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -10px rgba(139, 92, 246, 0.3)" }}
                    className={`p-8 rounded-2xl shadow-xl border-2 transition-all duration-300 backdrop-blur-sm ${index === 0 ? 'bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-700 hover:border-violet-400 dark:hover:border-violet-500' :
                      index === 1 ? 'bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-500' :
                        index === 2 ? 'bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-700 hover:border-cyan-400 dark:hover:border-cyan-500' :
                          'bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500'
                      }`}
                  >
                    {/* ... (keep company icon) ... */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${index === 0 ? 'bg-gradient-to-br from-violet-400 to-purple-500' :
                        index === 1 ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                          index === 2 ? 'bg-gradient-to-br from-cyan-400 to-blue-500' :
                            'bg-gradient-to-br from-emerald-400 to-green-500'
                        }`}>
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={14} />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Colorful Duration */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Calendar size={14} className={
                        index === 0 ? 'text-violet-500' :
                          index === 1 ? 'text-pink-500' :
                            index === 2 ? 'text-cyan-500' :
                              'text-emerald-500'
                      } />
                      <span className={`px-3 py-1 rounded-full font-medium shadow-sm ${index === 0 ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' :
                        index === 1 ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                          index === 2 ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' :
                            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        }`}>
                        {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Colorful Achievement badge */}
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <div className={`flex items-center gap-2 text-xs font-medium ${index === 0 ? 'text-violet-600 dark:text-violet-400' :
                        index === 1 ? 'text-pink-600 dark:text-pink-400' :
                          index === 2 ? 'text-cyan-600 dark:text-cyan-400' :
                            'text-emerald-600 dark:text-emerald-400'
                        }`}>
                        <Award size={12} className="animate-pulse" />
                        <span>Key Contributor</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
