import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin, Category } from "@/contexts/AdminContext";
import { toast } from "sonner";

const AdminCategoriesPage: React.FC = () => {
  const { adminCategories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "active" as Category["status"],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      parentCategory: "",
      status: "active",
    });
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory || "",
      status: category.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name: formData.name,
      description: formData.description,
      parentCategory: formData.parentCategory || undefined,
      status: formData.status,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
      toast.success("Category updated successfully");
    } else {
      addCategory(categoryData);
      toast.success("Category added successfully");
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
      toast.success("Category deleted successfully");
    }
  };

  const parentCategories = adminCategories.filter(c => !c.parentCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">Categories</h1>
          <p className="text-muted-foreground">Organize your product categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Category Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label>Parent Category</Label>
                <Select 
                  value={formData.parentCategory || "none"} 
                  onValueChange={(value) => setFormData({...formData, parentCategory: value === "none" ? "" : value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {parentCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  {editingCategory ? "Update Category" : "Add Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderTree className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      {category.parentCategory && (
                        <p className="text-xs text-muted-foreground">
                          Parent: {adminCategories.find(c => c.id === category.parentCategory)?.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    category.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {category.status}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    <strong>{category.productCount}</strong> products
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {adminCategories.length === 0 && (
        <div className="text-center py-12">
          <FolderTree className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No categories found</p>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
