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

interface Language {
  id: string;
  name: string;
  level: string;
  flag: string | null;
  visible: boolean;
  sort_order: number;
}

const LanguagesManager = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    const { data, error } = await supabase
      .from("languages")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Failed to load languages");
      console.error(error);
    } else {
      setLanguages(data || []);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newLang: Language = {
      id: `new-${Date.now()}`,
      name: "",
      level: "Basic",
      flag: "🌐",
      visible: true,
      sort_order: languages.length
    };
    setLanguages([...languages, newLang]);
  };

  const handleUpdate = (id: string, field: keyof Language, value: any) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    if (deleteId.startsWith("new-")) {
      setLanguages(languages.filter(l => l.id !== deleteId));
    } else {
      const { error } = await supabase
        .from("languages")
        .delete()
        .eq("id", deleteId);

      if (error) {
        toast.error("Failed to delete language");
        console.error(error);
      } else {
        setLanguages(languages.filter(l => l.id !== deleteId));
        toast.success("Language deleted");
      }
    }
    setDeleteId(null);
  };

  const handleSave = async () => {
    setSaving(true);

    for (const lang of languages) {
      if (!lang.name || !lang.level) {
        toast.error("Name and level are required");
        setSaving(false);
        return;
      }

      const langData = {
        name: lang.name,
        level: lang.level,
        flag: lang.flag,
        visible: lang.visible,
        sort_order: lang.sort_order
      };

      if (lang.id.startsWith("new-")) {
        const { error } = await supabase
          .from("languages")
          .insert(langData);
        if (error) {
          toast.error("Failed to create language");
          console.error(error);
          setSaving(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("languages")
          .update(langData)
          .eq("id", lang.id);
        if (error) {
          toast.error("Failed to update language");
          console.error(error);
          setSaving(false);
          return;
        }
      }
    }

    toast.success("Languages saved");
    fetchLanguages();
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
            <h1 className="text-3xl font-bold">Languages</h1>
            <p className="text-muted-foreground">Manage languages shown in the skills section</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <Card key={lang.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    value={lang.flag || ""}
                    onChange={(e) => handleUpdate(lang.id, "flag", e.target.value)}
                    className="w-16 text-2xl text-center"
                    placeholder="🌐"
                  />
                  <div className="flex-1 space-y-2">
                    <Input
                      value={lang.name}
                      onChange={(e) => handleUpdate(lang.id, "name", e.target.value)}
                      placeholder="Language name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Proficiency Level</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={lang.level}
                    onChange={(e) => handleUpdate(lang.id, "level", e.target.value)}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Professional">Professional</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={lang.visible}
                      onCheckedChange={(v) => handleUpdate(lang.id, "visible", v)}
                    />
                    <Label className="text-sm">Visible</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(lang.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {languages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No languages added yet. Click "Add Language" to create one.
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Language"
        description="Are you sure you want to delete this language?"
      />
    </>
  );
};

export default LanguagesManager;
