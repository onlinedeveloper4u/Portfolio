import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

interface SiteSettings {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  availability: string;
}

const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    name: "",
    title: "",
    subtitle: "",
    bio: "",
    availability: "Available"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      toast.error("Failed to load settings");
      console.error(error);
    } else if (data) {
      const settingsObj: SiteSettings = {
        name: "",
        title: "",
        subtitle: "",
        bio: "",
        availability: "Available"
      };
      data.forEach((item: { key: string; value: string | null }) => {
        if (item.key in settingsObj) {
          (settingsObj as any)[item.key] = item.value || "";
        }
      });
      setSettings(settingsObj);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: update.value })
        .eq("key", update.key);

      if (error) {
        toast.error(`Failed to update ${update.key}`);
        console.error(error);
        setSaving(false);
        return;
      }
    }

    toast.success("Settings saved successfully");
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
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Site Settings</h1>
            <p className="text-muted-foreground">Manage your hero section and profile content</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle / Specializations</Label>
              <Input
                id="subtitle"
                value={settings.subtitle}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                placeholder="e.g., iOS Developer | MERN Stack Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Tagline</Label>
              <Textarea
                id="bio"
                value={settings.bio}
                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                placeholder="A short description about yourself"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability Status</Label>
              <Input
                id="availability"
                value={settings.availability}
                onChange={(e) => setSettings({ ...settings, availability: e.target.value })}
                placeholder="e.g., Available, Busy, Open to opportunities"
              />
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default SiteSettingsManager;
