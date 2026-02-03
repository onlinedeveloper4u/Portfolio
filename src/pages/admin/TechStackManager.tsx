import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface TechItem {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  sort_order: number;
}

const colorOptions = [
  { label: "Orange", value: "from-orange-500 to-orange-600" },
  { label: "Blue", value: "from-blue-500 to-blue-600" },
  { label: "Cyan", value: "from-cyan-500 to-cyan-600" },
  { label: "Green", value: "from-green-500 to-green-600" },
  { label: "Purple", value: "from-purple-500 to-purple-600" },
  { label: "Pink", value: "from-pink-500 to-pink-600" },
  { label: "Red", value: "from-red-500 to-red-600" },
  { label: "Yellow", value: "from-yellow-500 to-yellow-600" },
];

const TechStackManager = () => {
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("tech_stack")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Failed to load tech stack");
      console.error(error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newItem: TechItem = {
      id: `new-${Date.now()}`,
      name: "",
      color: "from-blue-500 to-blue-600",
      visible: true,
      sort_order: items.length
    };
    setItems([...items, newItem]);
  };

  const handleUpdate = (id: string, field: keyof TechItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    if (deleteId.startsWith("new-")) {
      setItems(items.filter(i => i.id !== deleteId));
    } else {
      const { error } = await supabase
        .from("tech_stack")
        .delete()
        .eq("id", deleteId);

      if (error) {
        toast.error("Failed to delete item");
        console.error(error);
      } else {
        setItems(items.filter(i => i.id !== deleteId));
        toast.success("Item deleted");
      }
    }
    setDeleteId(null);
  };

  const handleSave = async () => {
    setSaving(true);

    for (const item of items) {
      if (!item.name) {
        toast.error("Name is required for all items");
        setSaving(false);
        return;
      }

      const itemData = {
        name: item.name,
        color: item.color,
        visible: item.visible,
        sort_order: item.sort_order
      };

      if (item.id.startsWith("new-")) {
        const { error } = await supabase
          .from("tech_stack")
          .insert(itemData);
        if (error) {
          toast.error("Failed to create item");
          console.error(error);
          setSaving(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("tech_stack")
          .update(itemData)
          .eq("id", item.id);
        if (error) {
          toast.error("Failed to update item");
          console.error(error);
          setSaving(false);
          return;
        }
      }
    }

    toast.success("Tech stack saved");
    fetchItems();
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tech Stack</h1>
            <p className="text-muted-foreground">Manage the technology pills shown in the hero section</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tech
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Technology Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => handleUpdate(item.id, "name", e.target.value)}
                    placeholder="e.g., React"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={item.color}
                    onChange={(e) => handleUpdate(item.id, "color", e.target.value)}
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.visible}
                      onCheckedChange={(v) => handleUpdate(item.id, "visible", v)}
                    />
                    <Label className="text-sm">Visible</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                {/* Preview */}
                <div className="pt-2 border-t">
                  <span className={`px-4 py-1.5 text-sm font-medium text-white rounded-full bg-gradient-to-r ${item.color}`}>
                    {item.name || "Preview"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tech stack items yet. Click "Add Tech" to create one.
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Tech Item"
        description="Are you sure you want to delete this technology?"
      />
    </>
  );
};

export default TechStackManager;
