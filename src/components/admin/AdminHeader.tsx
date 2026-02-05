
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ExternalLink,
    Loader2,
    LayoutDashboard,
    Settings,
    Code,
    FolderKanban,
    Briefcase,
    Zap,
    Wrench,
    Globe,
    Link as LinkIcon,
    Boxes,
    MessageSquareQuote,
    User,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useAuth } from '@/hooks/useAuth';

const AdminHeader = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { results, loading } = useGlobalSearch(query);
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    const navItems = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/site-settings', icon: Settings, label: 'Site Settings' },
        { to: '/admin/tech-stack', icon: Code, label: 'Tech Stack' },
        { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
        { to: '/admin/experiences', icon: Briefcase, label: 'Experiences' },
        { to: '/admin/skills', icon: Zap, label: 'Skills' },
        { to: '/admin/tools', icon: Wrench, label: 'Tools' },
        { to: '/admin/languages', icon: Globe, label: 'Languages' },
        { to: '/admin/contact-links', icon: LinkIcon, label: 'Contact Links' },
        { to: '/admin/services', icon: Boxes, label: 'Services' },
        { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
    ];

    const filteredNavItems = navItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
            <div className="flex-1 md:flex-none">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between sm:w-64 lg:w-80 text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 shrink-0 opacity-50" />
                                {query ? query : "Search admin..."}
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] sm:w-[500px] p-0" align="start">
                        <Command shouldFilter={false}>
                            <CommandInput
                                placeholder="Type to search..."
                                value={query}
                                onValueChange={setQuery}
                            />
                            <CommandList>
                                {loading ? (
                                    <div className="py-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Searching...
                                    </div>
                                ) : (
                                    <>
                                        <CommandEmpty>No results found.</CommandEmpty>

                                        {filteredNavItems.length > 0 && (
                                            <CommandGroup heading="Sections">
                                                {filteredNavItems.map((item) => (
                                                    <CommandItem
                                                        key={item.to}
                                                        value={item.label}
                                                        onSelect={() => runCommand(() => navigate(item.to))}
                                                        className="cursor-pointer"
                                                    >
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        <span>{item.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        )}

                                        {results.length > 0 && (
                                            <>
                                                <CommandSeparator />
                                                <CommandGroup heading="Content">
                                                    {results.map((result) => (
                                                        <CommandItem
                                                            key={`${result.type}-${result.id}`}
                                                            value={`${result.type} ${result.title}`}
                                                            onSelect={() => runCommand(() => navigate(result.url))}
                                                            className="cursor-pointer"
                                                        >
                                                            {result.icon && <result.icon className="mr-2 h-4 w-4" />}
                                                            <div className="flex flex-col">
                                                                <span>{result.title}</span>
                                                                <span className="text-xs text-muted-foreground">{result.type}</span>
                                                            </div>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </>
                                        )}
                                    </>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-muted-foreground hover:text-foreground"
                    title="View Public Portfolio"
                >
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                    </a>
                </Button>
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-2">
                            <Avatar className="h-9 w-9 border border-border">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Administrator</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default AdminHeader;
