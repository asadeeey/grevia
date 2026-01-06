import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, FileText, Image, Link as LinkIcon, Type, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin, HomepageSection } from "@/contexts/AdminContext";
import { toast } from "sonner";

const AdminHomepagePage: React.FC = () => {
  const { homepageSections, updateHomepageSection } = useAdmin();
  const [editedSections, setEditedSections] = useState<Record<string, Partial<HomepageSection>>>({});

  const handleChange = (sectionId: string, field: keyof HomepageSection, value: string | boolean) => {
    setEditedSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }));
  };

  const handleSave = (sectionId: string) => {
    const changes = editedSections[sectionId];
    if (changes) {
      updateHomepageSection(sectionId, changes);
      setEditedSections(prev => {
        const next = { ...prev };
        delete next[sectionId];
        return next;
      });
      toast.success("Section updated successfully");
    }
  };

  const getValue = (section: HomepageSection, field: keyof HomepageSection) => {
    return editedSections[section.id]?.[field] ?? section[field];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground">Homepage CMS</h1>
        <p className="text-muted-foreground">Customize your homepage content</p>
      </div>

      {/* Sections */}
      <Tabs defaultValue={homepageSections[0]?.id} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          {homepageSections.map(section => (
            <TabsTrigger key={section.id} value={section.id} className="capitalize">
              {section.sectionKey}
            </TabsTrigger>
          ))}
        </TabsList>

        {homepageSections.map((section, index) => (
          <TabsContent key={section.id} value={section.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {section.sectionKey.charAt(0).toUpperCase() + section.sectionKey.slice(1)} Section
                  </CardTitle>
                  <CardDescription>
                    Edit the content for the {section.sectionKey} section of your homepage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Type className="h-4 w-4" />
                        Title
                      </Label>
                      <Input 
                        value={getValue(section, "title") as string}
                        onChange={(e) => handleChange(section.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Type className="h-4 w-4" />
                        Subtitle
                      </Label>
                      <Input 
                        value={(getValue(section, "subtitle") as string) || ""}
                        onChange={(e) => handleChange(section.id, "subtitle", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <AlignLeft className="h-4 w-4" />
                      Description
                    </Label>
                    <Textarea 
                      value={(getValue(section, "description") as string) || ""}
                      onChange={(e) => handleChange(section.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <LinkIcon className="h-4 w-4" />
                        CTA Button Text
                      </Label>
                      <Input 
                        value={(getValue(section, "ctaText") as string) || ""}
                        onChange={(e) => handleChange(section.id, "ctaText", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <LinkIcon className="h-4 w-4" />
                        CTA Button Link
                      </Label>
                      <Input 
                        value={(getValue(section, "ctaLink") as string) || ""}
                        onChange={(e) => handleChange(section.id, "ctaLink", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Image className="h-4 w-4" />
                        Badge Text
                      </Label>
                      <Input 
                        value={(getValue(section, "badge") as string) || ""}
                        onChange={(e) => handleChange(section.id, "badge", e.target.value)}
                        placeholder="e.g., 100% Natural"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <Switch 
                        checked={(getValue(section, "status") as string) === "active"}
                        onCheckedChange={(checked) => handleChange(section.id, "status", checked ? "active" : "inactive")}
                      />
                      <Label>Section Active</Label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      onClick={() => handleSave(section.id)}
                      disabled={!editedSections[section.id]}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Preview Note */}
      <Card className="border-dashed">
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>💡 Changes will be reflected on your homepage once connected to Laravel Filament backend.</p>
          <p className="text-sm mt-2">Currently using localStorage for demo purposes.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomepagePage;
