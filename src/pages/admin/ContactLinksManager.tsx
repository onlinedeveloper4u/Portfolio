import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Save, Trash2, Loader2, GripVertical } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface ContactLink {
  id: string;
  title: string;
  icon: string | null;
  url: string;
  display_text: string | null;
  visible: boolean;
  sort_order: number;
}

const iconOptions = ["Mail", "Linkedin", "Github", "Phone", "MessageCircle", "Video", "Briefcase", "Globe", "Twitter", "Instagram"];

const ContactLinksManager = () => {
  const [links, setLinks] = useState<ContactLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from("contact_links")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Failed to load contact links");
      console.error(error);
    } else {
      setLinks(data || []);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newLink: ContactLink = {
      id: `new-${Date.now()}`,
      title: "",
      icon: "Globe",
      url: "",
      display_text: "",
      visible: true,
      sort_order: links.length
    };
    setLinks([...links, newLink]);
  };

  const handleUpdate = (id: string, field: keyof ContactLink, value: any) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    if (deleteId.startsWith("new-")) {
      setLinks(links.filter(l => l.id !== deleteId));
    } else {
      const { error } = await supabase
        .from("contact_links")
        .delete()
        .eq("id", deleteId);

      if (error) {
        toast.error("Failed to delete link");
        console.error(error);
      } else {
        setLinks(links.filter(l => l.id !== deleteId));
        toast.success("Link deleted");
      }
    }
    setDeleteId(null);
  };

  const handleSave = async () => {
    setSaving(true);

    for (const link of links) {
      if (!link.title || !link.url) {
        toast.error("Title and URL are required for all links");
        setSaving(false);
        return;
      }

      const linkData = {
        title: link.title,
        icon: link.icon,
        url: link.url,
        display_text: link.display_text,
        visible: link.visible,
        sort_order: link.sort_order
      };

      if (link.id.startsWith("new-")) {
        const { error } = await supabase
          .from("contact_links")
          .insert(linkData);
        if (error) {
          toast.error("Failed to create link");
          console.error(error);
          setSaving(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("contact_links")
          .update(linkData)
          .eq("id", link.id);
        if (error) {
          toast.error("Failed to update link");
          console.error(error);
          setSaving(false);
          return;
        }
      }
    }

    toast.success("Contact links saved");
    fetchLinks();
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
            <h1 className="text-3xl font-bold">Contact Links</h1>
            <p className="text-muted-foreground">Manage your contact and social links</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <Card key={link.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={link.title}
                        onChange={(e) => handleUpdate(link.id, "title", e.target.value)}
                        placeholder="e.g., Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <select
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={link.icon || ""}
                        onChange={(e) => handleUpdate(link.id, "icon", e.target.value)}
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={link.url}
                        onChange={(e) => handleUpdate(link.id, "url", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Display Text</Label>
                      <Input
                        value={link.display_text || ""}
                        onChange={(e) => handleUpdate(link.id, "display_text", e.target.value)}
                        placeholder="e.g., Connect with me"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={link.visible}
                        onCheckedChange={(v) => handleUpdate(link.id, "visible", v)}
                      />
                      <Label className="text-sm">Visible</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(link.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {links.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No contact links yet. Click "Add Link" to create one.
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Contact Link"
        description="Are you sure you want to delete this contact link?"
      />
    </>
  );
};

export default ContactLinksManager;
