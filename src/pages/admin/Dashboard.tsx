import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Briefcase, Zap, Wrench, MessageSquareQuote, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  projects: number;
  experiences: number;
  skills: number;
  services: number;
  testimonials: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    experiences: 0,
    skills: 0,
    services: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, experiences, skills, services, testimonials] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('experiences').select('id', { count: 'exact', head: true }),
          supabase.from('skills').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projects.count || 0,
          experiences: experiences.count || 0,
          skills: skills.count || 0,
          services: services.count || 0,
          testimonials: testimonials.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'from-blue-500 to-cyan-500' },
    { label: 'Experiences', value: stats.experiences, icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'Skills', value: stats.skills, icon: Zap, color: 'from-orange-500 to-yellow-500' },
    { label: 'Services', value: stats.services, icon: Wrench, color: 'from-green-500 to-emerald-500' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquareQuote, color: 'from-rose-500 to-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your portfolio admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? '...' : card.value}
                </div>
              </CardContent>
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar navigation to manage your portfolio sections. You can add, edit, delete, and reorder items in each section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
