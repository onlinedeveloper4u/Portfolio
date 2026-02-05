import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderKanban, Briefcase, Zap, Wrench, MessageSquareQuote, TrendingUp, Users, ExternalLink, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Stats {
  projects: number;
  experiences: number;
  skills: number;
  services: number;
  testimonials: number;
  contactLinks: number;
  tools: number;
  languages: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    experiences: 0,
    skills: 0,
    services: 0,
    testimonials: 0,
    contactLinks: 0,
    tools: 0,
    languages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          projects,
          experiences,
          skills,
          services,
          testimonials,
          contactLinks,
          tools,
          languages
        ] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('experiences').select('id', { count: 'exact', head: true }),
          supabase.from('skills').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
          supabase.from('contact_links').select('id', { count: 'exact', head: true }),
          supabase.from('tools').select('id', { count: 'exact', head: true }),
          supabase.from('languages').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projects.count || 0,
          experiences: experiences.count || 0,
          skills: skills.count || 0,
          services: services.count || 0,
          testimonials: testimonials.count || 0,
          contactLinks: contactLinks.count || 0,
          tools: tools.count || 0,
          languages: languages.count || 0,
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
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/admin/projects' },
    { label: 'Experiences', value: stats.experiences, icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/admin/experiences' },
    { label: 'Skills', value: stats.skills, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', link: '/admin/skills' },
    { label: 'Tools', value: stats.tools, icon: Wrench, color: 'text-green-500', bg: 'bg-green-500/10', link: '/admin/tools' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquareQuote, color: 'text-rose-500', bg: 'bg-rose-500/10', link: '/admin/testimonials' },
  ];

  const chartData = [
    { name: 'Projects', value: stats.projects, color: '#3b82f6' },
    { name: 'Skills', value: stats.skills, color: '#f97316' },
    { name: 'Tools', value: stats.tools, color: '#22c55e' },
    { name: 'Experiences', value: stats.experiences, color: '#a855f7' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Track your portfolio content and performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Live Site
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <Link key={card.label} to={card.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.bg}`}>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                    ) : (
                      card.value
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Chart Section */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Content Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of your portfolio content items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No data to display
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Tips */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your portfolio effectively.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start h-auto py-4 px-4" asChild>
                <Link to="/admin/projects" className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-full mt-0.5">
                    <FolderKanban className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Manage Projects</div>
                    <div className="text-xs text-muted-foreground">Add or update your work portfolio</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4 px-4" asChild>
                <Link to="/admin/site-settings" className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Profile Settings</div>
                    <div className="text-xs text-muted-foreground">Update your bio and personal info</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4 px-4" asChild>
                <Link to="/admin/contact-links" className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full mt-0.5">
                    <ExternalLink className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Contact Links</div>
                    <div className="text-xs text-muted-foreground">Manage social media and contact info</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
