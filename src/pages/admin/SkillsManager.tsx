import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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
import { Progress } from '@/components/ui/progress';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  visible: boolean;
  sort_order: number;
}

const categories = ['iOS Development', 'MERN Stack', 'Backend & APIs', 'AI & Innovation', 'Tools & Platforms'];

const SortableRow = ({ skill, onEdit, onDelete, onToggleVisibility }: { 
  skill: Skill; 
  onEdit: (s: Skill) => void; 
  onDelete: (s: Skill) => void;
  onToggleVisibility: (s: Skill) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: skill.id });

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
      <TableCell className="font-medium">{skill.name}</TableCell>
      <TableCell>{skill.category}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Progress value={skill.proficiency} className="w-20 h-2" />
          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
        </div>
      </TableCell>
      <TableCell>
        <button onClick={() => onToggleVisibility(skill)} className="p-1 hover:bg-muted rounded">
          {skill.visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(skill)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(skill)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'iOS Development',
    proficiency: 80,
    icon: '',
    visible: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch skills');
      console.error(error);
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateDialog = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'iOS Development',
      proficiency: 80,
      icon: '',
      visible: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || '',
      visible: skill.visible,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);

    const skillData = {
      name: formData.name.trim(),
      category: formData.category,
      proficiency: formData.proficiency,
      icon: formData.icon.trim() || null,
      visible: formData.visible,
    };

    let error;
    if (editingSkill) {
      const result = await supabase.from('skills').update(skillData).eq('id', editingSkill.id);
      error = result.error;
    } else {
      const result = await supabase.from('skills').insert({ ...skillData, sort_order: skills.length });
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingSkill ? 'Skill updated' : 'Skill created');
      setDialogOpen(false);
      fetchSkills();
    }
  };

  const handleDelete = async () => {
    if (!deletingSkill) return;
    setSaving(true);
    const { error } = await supabase.from('skills').delete().eq('id', deletingSkill.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Skill deleted');
      setDeleteDialogOpen(false);
      setDeletingSkill(null);
      fetchSkills();
    }
  };

  const toggleVisibility = async (skill: Skill) => {
    const { error } = await supabase
      .from('skills')
      .update({ visible: !skill.visible })
      .eq('id', skill.id);

    if (error) {
      toast.error(error.message);
    } else {
      fetchSkills();
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = skills.findIndex(s => s.id === active.id);
    const newIndex = skills.findIndex(s => s.id === over.id);
    const newSkills = arrayMove(skills, oldIndex, newIndex);
    setSkills(newSkills);

    const updates = newSkills.map((s, i) => 
      supabase.from('skills').update({ sort_order: i }).eq('id', s.id)
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
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your skills and proficiencies</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Proficiency</TableHead>
                  <TableHead className="w-16">Visible</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={skills.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  {skills.map(skill => (
                    <SortableRow
                      key={skill.id}
                      skill={skill}
                      onEdit={openEditDialog}
                      onDelete={(s) => { setDeletingSkill(s); setDeleteDialogOpen(true); }}
                      onToggleVisibility={toggleVisibility}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
          {skills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No skills yet. Click "Add Skill" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
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
              <div className="flex items-center justify-between">
                <Label>Proficiency</Label>
                <span className="text-sm text-muted-foreground">{formData.proficiency}%</span>
              </div>
              <Slider
                value={[formData.proficiency]}
                onValueChange={(v) => setFormData({ ...formData, proficiency: v[0] })}
                min={0}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Lucide icon name, e.g., "code")</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Optional"
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
                {editingSkill ? 'Save Changes' : 'Create Skill'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Skill?"
        description={`Are you sure you want to delete "${deletingSkill?.name}"? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
};

export default SkillsManager;
