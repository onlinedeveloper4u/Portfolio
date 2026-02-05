
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
    FolderKanban,
    Briefcase,
    Zap,
    Wrench,
    Boxes,
    MessageSquareQuote,
    Link as LinkIcon,
    Globe,
    Code
} from 'lucide-react';

export type SearchResult = {
    id: string;
    title: string;
    type: string;
    url: string;
    icon: any;
};

export const useGlobalSearch = (query: string) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query || query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const [
                    projects,
                    experiences,
                    skills,
                    services,
                    testimonials,
                    contactLinks,
                    tools,
                    languages,
                    techStack
                ] = await Promise.all([
                    supabase.from('projects').select('id, title, description').ilike('title', `%${query}%`).limit(5),
                    supabase.from('experiences').select('id, title, company').ilike('title', `%${query}%`).limit(5),
                    supabase.from('skills').select('id, name').ilike('name', `%${query}%`).limit(5),
                    supabase.from('services').select('id, title').ilike('title', `%${query}%`).limit(5),
                    supabase.from('testimonials').select('id, name, content').ilike('name', `%${query}%`).limit(5),
                    supabase.from('contact_links').select('id, title').ilike('title', `%${query}%`).limit(5),
                    supabase.from('tools').select('id, name').ilike('name', `%${query}%`).limit(5),
                    supabase.from('languages').select('id, name').ilike('name', `%${query}%`).limit(5),
                    supabase.from('tech_stack').select('id, name').ilike('name', `%${query}%`).limit(5),
                ]);

                const newResults: SearchResult[] = [];

                projects.data?.forEach(p => newResults.push({
                    id: p.id,
                    title: p.title,
                    type: 'Project',
                    url: '/admin/projects',
                    icon: FolderKanban
                }));

                experiences.data?.forEach(e => newResults.push({
                    id: e.id,
                    title: `${e.title} at ${e.company}`,
                    type: 'Experience',
                    url: '/admin/experiences',
                    icon: Briefcase
                }));

                skills.data?.forEach(s => newResults.push({
                    id: s.id,
                    title: s.name,
                    type: 'Skill',
                    url: '/admin/skills',
                    icon: Zap
                }));

                services.data?.forEach(s => newResults.push({
                    id: s.id,
                    title: s.title,
                    type: 'Service',
                    url: '/admin/services',
                    icon: Boxes
                }));

                testimonials.data?.forEach(t => newResults.push({
                    id: t.id,
                    title: `Testimonial from ${t.name}`,
                    type: 'Testimonial',
                    url: '/admin/testimonials',
                    icon: MessageSquareQuote
                }));

                contactLinks.data?.forEach(c => newResults.push({
                    id: c.id,
                    title: c.title,
                    type: 'Contact Link',
                    url: '/admin/contact-links',
                    icon: LinkIcon
                }));

                tools.data?.forEach(t => newResults.push({
                    id: t.id,
                    title: t.name,
                    type: 'Tool',
                    url: '/admin/tools',
                    icon: Wrench
                }));

                languages.data?.forEach(l => newResults.push({
                    id: l.id,
                    title: l.name,
                    type: 'Language',
                    url: '/admin/languages',
                    icon: Globe
                }));

                techStack.data?.forEach(t => newResults.push({
                    id: t.id,
                    title: t.name,
                    type: 'Tech Stack',
                    url: '/admin/tech-stack',
                    icon: Code
                }));

                setResults(newResults);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce
        const timeoutId = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return { results, loading };
};
