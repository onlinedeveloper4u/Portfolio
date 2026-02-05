import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import ImageUpload, { deleteImageFromStorage } from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  app_store_url: string | null;
  play_store_url: string | null;
  featured: boolean;
  visible: boolean;
  sort_order: number;
}

const categories = ['Full-Stack', 'iOS', 'Cross-Platform', 'MERN', 'Web'];

const SortableRow = ({ project, onEdit, onDelete, onToggleVisibility }: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (p: Project) => void;
  onToggleVisibility: (p: Project) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell>
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
            No img
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{project.title}</TableCell>
      <TableCell>{project.category}</TableCell>
      <TableCell>
        <button onClick={() => onToggleVisibility(project)} className="p-1 hover:bg-muted rounded">
          {project.visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(project)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Full-Stack',
    technologies: '',
    live_url: '',
    github_url: '',
    app_store_url: '',
    play_store_url: '',
    featured: false,
    visible: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch projects');
      console.error(error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateDialog = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'Full-Stack',
      technologies: '',
      live_url: '',
      github_url: '',
      app_store_url: '',
      play_store_url: '',
      featured: false,
      visible: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      category: project.category,
      technologies: project.technologies?.join(', ') || '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      app_store_url: project.app_store_url || '',
      play_store_url: project.play_store_url || '',
      featured: project.featured,
      visible: project.visible,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    const technologies = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);

    // Delete old image if it's being replaced
    if (editingProject && editingProject.image_url && editingProject.image_url !== formData.image_url) {
      await deleteImageFromStorage(editingProject.image_url);
    }

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      image_url: formData.image_url || null,
      category: formData.category,
      technologies,
      live_url: formData.live_url.trim() || null,
      github_url: formData.github_url.trim() || null,
      app_store_url: formData.app_store_url.trim() || null,
      play_store_url: formData.play_store_url.trim() || null,
      featured: formData.featured,
      visible: formData.visible,
    };

    let error;
    if (editingProject) {
      const result = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
      error = result.error;
    } else {
      const result = await supabase.from('projects').insert({ ...projectData, sort_order: projects.length });
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingProject ? 'Project updated' : 'Project created');
      setDialogOpen(false);
      fetchProjects();
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    setSaving(true);

    // Delete image from storage if exists
    if (deletingProject.image_url) {
      await deleteImageFromStorage(deletingProject.image_url);
    }

    const { error } = await supabase.from('projects').delete().eq('id', deletingProject.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Project deleted');
      setDeleteDialogOpen(false);
      setDeletingProject(null);
      fetchProjects();
    }
  };

  const toggleVisibility = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({ visible: !project.visible })
      .eq('id', project.id);

    if (error) {
      toast.error(error.message);
    } else {
      fetchProjects();
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    const newProjects = arrayMove(projects, oldIndex, newIndex);
    setProjects(newProjects);

    // Update sort_order in database
    const updates = newProjects.map((p, i) =>
      supabase.from('projects').update({ sort_order: i }).eq('id', p.id)
    );
    await Promise.all(updates);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-16">Visible</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  {projects.map(project => (
                    <SortableRow
                      key={project.id}
                      project={project}
                      onEdit={openEditDialog}
                      onDelete={(p) => { setDeletingProject(p); setDeleteDialogOpen(true); }}
                      onToggleVisibility={toggleVisibility}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
          {projects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects yet. Click "Add Project" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
            <ImageUpload
              value={formData.image_url}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              folder="projects"
              label="Project Image"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="live_url">Live URL</Label>
                <Input
                  id="live_url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app_store_url">App Store URL</Label>
                <Input
                  id="app_store_url"
                  value={formData.app_store_url}
                  onChange={(e) => setFormData({ ...formData, app_store_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="play_store_url">Play Store URL</Label>
                <Input
                  id="play_store_url"
                  value={formData.play_store_url}
                  onChange={(e) => setFormData({ ...formData, play_store_url: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                />
                <Label>Visible on portfolio</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label>Featured project</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editingProject ? 'Save Changes' : 'Create Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deletingProject?.title}"? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
};

export default ProjectsManager;
