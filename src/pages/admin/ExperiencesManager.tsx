import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Card, CardContent } from '@/components/ui/card';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';

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

const experienceTypes = ['work', 'education', 'freelance'];

const ExperiencesManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [deletingExperience, setDeletingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
    type: 'work',
    visible: true,
    currentlyWorking: false,
  });

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: true }); // Ascending order (Oldest first)

      if (error) {
        toast.error('Failed to fetch experiences');
        console.error(error);
      } else {
        setExperiences(data || []);
      }
    } catch (err) {
      console.error('Error in fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreateDialog = () => {
    setEditingExperience(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
      type: 'work',
      visible: true,
      currentlyWorking: false,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location || '',
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      description: experience.description || '',
      type: experience.type,
      visible: experience.visible,
      currentlyWorking: !experience.end_date, // If no end date, assume currently working
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.company.trim() || !formData.start_date.trim()) {
      toast.error('Title, Company, and Start Date are required');
      return;
    }

    if (!formData.currentlyWorking && !formData.end_date.trim()) {
      toast.error('End Date is required unless you are currently working there');
      return;
    }

    setSaving(true);

    const experienceData = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim() || null,
      start_date: formData.start_date.trim(),
      end_date: formData.currentlyWorking ? null : formData.end_date.trim(),
      description: formData.description.trim() || null,
      type: formData.type,
      visible: formData.visible,
    };

    let error;
    if (editingExperience) {
      const result = await supabase.from('experiences').update(experienceData).eq('id', editingExperience.id);
      error = result.error;
    } else {
      const result = await supabase.from('experiences').insert({ ...experienceData, sort_order: experiences.length });
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingExperience ? 'Experience updated' : 'Experience created');
      setDialogOpen(false);
      fetchExperiences();
    }
  };

  const handleDelete = async () => {
    if (!deletingExperience) return;
    setSaving(true);
    const { error } = await supabase.from('experiences').delete().eq('id', deletingExperience.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Experience deleted');
      setDeleteDialogOpen(false);
      setDeletingExperience(null);
      fetchExperiences();
    }
  };

  const toggleVisibility = async (experience: Experience) => {
    const { error } = await supabase
      .from('experiences')
      .update({ visible: !experience.visible })
      .eq('id', experience.id);

    if (error) {
      toast.error(error.message);
    } else {
      fetchExperiences();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  };

  return (
    <div className="space-y-6">
      {/* ... (existing header) ... */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiences</h1>
          <p className="text-muted-foreground">Manage your work experiences</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="w-16">Visible</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell className="font-medium">{experience.title}</TableCell>
                  <TableCell>{experience.company}</TableCell>
                  <TableCell className="capitalize">{experience.type}</TableCell>
                  <TableCell>{formatDate(experience.start_date)} - {formatDate(experience.end_date)}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleVisibility(experience)} className="p-1 hover:bg-muted rounded">
                      {experience.visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(experience)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeletingExperience(experience); setDeleteDialogOpen(true); }}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {experiences.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No experiences yet. Click "Add Experience" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExperience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceTypes.map(type => (
                      <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <div className="space-y-2">
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    disabled={formData.currentlyWorking}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="currentlyWorking"
                      checked={formData.currentlyWorking}
                      onCheckedChange={(checked) => {
                        setFormData({
                          ...formData,
                          currentlyWorking: checked as boolean,
                          end_date: checked ? '' : formData.end_date
                        });
                      }}
                    />
                    <Label htmlFor="currentlyWorking" className="text-sm font-normal cursor-pointer">
                      Currently working here
                    </Label>
                  </div>
                </div>
              </div>
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
            <div className="flex items-center gap-2 pt-4 border-t">
              <Switch
                checked={formData.visible}
                onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
              />
              <Label>Visible on portfolio</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editingExperience ? 'Save Changes' : 'Create Experience'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Experience?"
        description={`Are you sure you want to delete "${deletingExperience?.title}"? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
};

export default ExperiencesManager;
