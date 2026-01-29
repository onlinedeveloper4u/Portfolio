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
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  visible: boolean;
  sort_order: number;
}

const SortableRow = ({ service, onEdit, onDelete, onToggleVisibility }: { 
  service: Service; 
  onEdit: (s: Service) => void; 
  onDelete: (s: Service) => void;
  onToggleVisibility: (s: Service) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: service.id });

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
      <TableCell className="font-medium">{service.title}</TableCell>
      <TableCell className="max-w-md truncate">{service.description || '-'}</TableCell>
      <TableCell>
        <button onClick={() => onToggleVisibility(service)} className="p-1 hover:bg-muted rounded">
          {service.visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </button>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(service)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(service)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    visible: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch services');
      console.error(error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
      visible: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      icon: service.icon || '',
      visible: service.visible,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);

    const serviceData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      icon: formData.icon.trim() || null,
      visible: formData.visible,
    };

    let error;
    if (editingService) {
      const result = await supabase.from('services').update(serviceData).eq('id', editingService.id);
      error = result.error;
    } else {
      const result = await supabase.from('services').insert({ ...serviceData, sort_order: services.length });
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingService ? 'Service updated' : 'Service created');
      setDialogOpen(false);
      fetchServices();
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;
    setSaving(true);
    const { error } = await supabase.from('services').delete().eq('id', deletingService.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Service deleted');
      setDeleteDialogOpen(false);
      setDeletingService(null);
      fetchServices();
    }
  };

  const toggleVisibility = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({ visible: !service.visible })
      .eq('id', service.id);

    if (error) {
      toast.error(error.message);
    } else {
      fetchServices();
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = services.findIndex(s => s.id === active.id);
    const newIndex = services.findIndex(s => s.id === over.id);
    const newServices = arrayMove(services, oldIndex, newIndex);
    setServices(newServices);

    const updates = newServices.map((s, i) => 
      supabase.from('services').update({ sort_order: i }).eq('id', s.id)
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
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your services offerings</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-16">Visible</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  {services.map(service => (
                    <SortableRow
                      key={service.id}
                      service={service}
                      onEdit={openEditDialog}
                      onDelete={(s) => { setDeletingService(s); setDeleteDialogOpen(true); }}
                      onToggleVisibility={toggleVisibility}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
          {services.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No services yet. Click "Add Service" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
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
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Lucide icon name)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., code, smartphone, globe"
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
                {editingService ? 'Save Changes' : 'Create Service'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Service?"
        description={`Are you sure you want to delete "${deletingService?.title}"? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
};

export default ServicesManager;
