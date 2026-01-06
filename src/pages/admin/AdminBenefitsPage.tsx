import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Award, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin, Benefit } from "@/contexts/AdminContext";
import { toast } from "sonner";

const iconOptions = [
  { value: "Leaf", label: "🌿 Leaf" },
  { value: "Heart", label: "❤️ Heart" },
  { value: "Sparkles", label: "✨ Sparkles" },
  { value: "Shield", label: "🛡️ Shield" },
  { value: "Zap", label: "⚡ Zap" },
  { value: "Star", label: "⭐ Star" },
  { value: "Check", label: "✓ Check" },
  { value: "Award", label: "🏆 Award" },
];

const AdminBenefitsPage: React.FC = () => {
  const { benefits, addBenefit, updateBenefit, deleteBenefit } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Leaf",
    order: 1,
    status: "active" as Benefit["status"],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "Leaf",
      order: benefits.length + 1,
      status: "active",
    });
    setEditingBenefit(null);
  };

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
      order: benefit.order,
      status: benefit.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBenefit) {
      updateBenefit(editingBenefit.id, formData);
      toast.success("Benefit updated successfully");
    } else {
      addBenefit(formData);
      toast.success("Benefit added successfully");
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this benefit?")) {
      deleteBenefit(id);
      toast.success("Benefit deleted successfully");
    }
  };

  const sortedBenefits = [...benefits].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">Benefits CMS</h1>
          <p className="text-muted-foreground">Manage the benefits displayed on your site</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBenefit ? "Edit Benefit" : "Add New Benefit"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icon</Label>
                  <Select 
                    value={formData.icon} 
                    onValueChange={(value) => setFormData({...formData, icon: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(icon => (
                        <SelectItem key={icon.value} value={icon.value}>{icon.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input 
                    type="number"
                    value={formData.order} 
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 1})}
                    min={1}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={formData.status === "active"} 
                  onCheckedChange={(checked) => setFormData({...formData, status: checked ? "active" : "inactive"})}
                />
                <Label>Active</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBenefit ? "Update Benefit" : "Add Benefit"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Benefits List */}
      <div className="space-y-4">
        {sortedBenefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground cursor-grab">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <span className="text-xs text-muted-foreground">#{benefit.order}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        benefit.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {benefit.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{benefit.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Icon: {benefit.icon}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(benefit)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(benefit.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {benefits.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No benefits added yet</p>
        </div>
      )}

      {/* Info Note */}
      <Card className="border-dashed">
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>💡 These benefits will be displayed on the Benefits page of your website.</p>
          <p className="text-sm mt-2">Drag to reorder (feature ready for backend integration).</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBenefitsPage;
