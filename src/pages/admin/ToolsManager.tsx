import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, X, Loader2 } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  visible: boolean;
  sort_order: number;
}

const ToolsManager = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTool, setNewTool] = useState("");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Failed to load tools");
      console.error(error);
    } else {
      setTools(data || []);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newTool.trim()) return;

    setSaving(true);
    const { error } = await supabase
      .from("tools")
      .insert({ name: newTool.trim(), sort_order: tools.length });

    if (error) {
      toast.error("Failed to add tool");
      console.error(error);
    } else {
      toast.success("Tool added");
      setNewTool("");
      fetchTools();
    }
    setSaving(false);
  };

  const handleToggle = async (id: string, visible: boolean) => {
    const { error } = await supabase
      .from("tools")
      .update({ visible })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update tool");
      console.error(error);
    } else {
      setTools(tools.map(t => t.id === id ? { ...t, visible } : t));
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("tools")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete tool");
      console.error(error);
    } else {
      setTools(tools.filter(t => t.id !== id));
      toast.success("Tool deleted");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tools & Platforms</h1>
          <p className="text-muted-foreground">Manage tools shown in the skills section</p>
        </div>

        <div className="flex gap-2 max-w-md">
          <Input
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            placeholder="Add new tool..."
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} disabled={saving || !newTool.trim()}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                tool.visible 
                  ? "bg-muted border-border" 
                  : "bg-muted/50 border-dashed border-muted-foreground/30 opacity-50"
              }`}
            >
              <span className="text-sm font-medium">{tool.name}</span>
              <Switch
                checked={tool.visible}
                onCheckedChange={(v) => handleToggle(tool.id, v)}
                className="scale-75"
              />
              <button
                onClick={() => handleDelete(tool.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tools added yet. Add one above.
          </div>
        )}
      </div>
  );
};

export default ToolsManager;
