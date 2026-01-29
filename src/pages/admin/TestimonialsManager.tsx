import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, GripVertical, Star } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatar_url: string | null;
  rating: number;
  visible: boolean;
  sort_order: number;
}

const SortableRow = ({ testimonial, onEdit, onDelete, onToggleVisibility }: { 
  testimonial: Testimonial; 
  onEdit: (t: Testimonial) => void; 
  onDelete: (t: Testimonial) => void;
  onToggleVisibility: (t: Testimonial) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: testimonial.id });

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
        {testimonial.avatar_url ? (
          <img src={testimonial.avatar_url} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
            {testimonial.name.charAt(0)}
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{testimonial.name}</TableCell>
      <TableCell>{testimonial.role || '-'} {testimonial.company ? `@ ${testimonial.company}` : ''}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <button onClick={() => onToggleVisibility(testimonial)} className="p-1 hover:bg-muted rounded">
          {testimonial.visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(testimonial)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(testimonial)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar_url: '',
    rating: 5,
    visible: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch testimonials');
      console.error(error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      avatar_url: '',
      rating: 5,
      visible: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      company: testimonial.company || '',
      content: testimonial.content,
      avatar_url: testimonial.avatar_url || '',
      rating: testimonial.rating,
      visible: testimonial.visible,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error('Name and Content are required');
      return;
    }

    setSaving(true);

    const testimonialData = {
      name: formData.name.trim(),
      role: formData.role.trim() || null,
      company: formData.company.trim() || null,
      content: formData.content.trim(),
      avatar_url: formData.avatar_url || null,
      rating: formData.rating,
      visible: formData.visible,
    };

    let error;
    if (editingTestimonial) {
      const result = await supabase.from('testimonials').update(testimonialData).eq('id', editingTestimonial.id);
      error = result.error;
    } else {
      const result = await supabase.from('testimonials').insert({ ...testimonialData, sort_order: testimonials.length });
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingTestimonial ? 'Testimonial updated' : 'Testimonial created');
      setDialogOpen(false);
      fetchTestimonials();
    }
  };

  const handleDelete = async () => {
    if (!deletingTestimonial) return;
    setSaving(true);
    const { error } = await supabase.from('testimonials').delete().eq('id', deletingTestimonial.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Testimonial deleted');
      setDeleteDialogOpen(false);
      setDeletingTestimonial(null);
      fetchTestimonials();
    }
  };

  const toggleVisibility = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ visible: !testimonial.visible })
      .eq('id', testimonial.id);

    if (error) {
      toast.error(error.message);
    } else {
      fetchTestimonials();
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = testimonials.findIndex(t => t.id === active.id);
    const newIndex = testimonials.findIndex(t => t.id === over.id);
    const newTestimonials = arrayMove(testimonials, oldIndex, newIndex);
    setTestimonials(newTestimonials);

    const updates = newTestimonials.map((t, i) => 
      supabase.from('testimonials').update({ sort_order: i }).eq('id', t.id)
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
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-14">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="w-16">Visible</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={testimonials.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  {testimonials.map(testimonial => (
                    <SortableRow
                      key={testimonial.id}
                      testimonial={testimonial}
                      onEdit={openEditDialog}
                      onDelete={(t) => { setDeletingTestimonial(t); setDeleteDialogOpen(true); }}
                      onToggleVisibility={toggleVisibility}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
          {testimonials.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No testimonials yet. Click "Add Testimonial" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., CEO"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <ImageUpload
              value={formData.avatar_url}
              onChange={(url) => setFormData({ ...formData, avatar_url: url })}
              folder="avatars"
              label="Avatar"
            />
            <div className="space-y-2">
              <Label htmlFor="content">Testimonial Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
              <Slider
                value={[formData.rating]}
                onValueChange={(v) => setFormData({ ...formData, rating: v[0] })}
                min={1}
                max={5}
                step={1}
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
                {editingTestimonial ? 'Save Changes' : 'Create Testimonial'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Testimonial?"
        description={`Are you sure you want to delete testimonial from "${deletingTestimonial?.name}"? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
};

export default TestimonialsManager;
