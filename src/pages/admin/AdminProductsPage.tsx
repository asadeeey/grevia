import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Package, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAdmin } from "@/contexts/AdminContext";
import { Product } from "@/data/products";
import { toast } from "sonner";

const AdminProductsPage: React.FC = () => {
  const { adminProducts, addProduct, updateProduct, deleteProduct, adminCategories } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    originalPrice: "",
    category: "sweeteners" as Product["category"],
    subcategory: "" as Product["subcategory"] | "",
    badge: "",
    inStock: true,
  });

  const filteredProducts = adminProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      longDescription: "",
      price: "",
      originalPrice: "",
      category: "sweeteners",
      subcategory: "",
      badge: "",
      inStock: true,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      subcategory: product.subcategory || "",
      badge: product.badge || "",
      inStock: product.inStock,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      longDescription: formData.longDescription,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      badge: formData.badge || undefined,
      inStock: formData.inStock,
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
      image: editingProduct?.image || "/placeholder.svg",
      images: editingProduct?.images || ["/placeholder.svg"],
      ingredients: editingProduct?.ingredients || [],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success("Product updated successfully");
    } else {
      addProduct(productData as Omit<Product, "id">);
      toast.success("Product added successfully");
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Product Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Short Description</Label>
                  <Input 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Long Description</Label>
                  <Textarea 
                    value={formData.longDescription} 
                    onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Price (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Original Price (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.originalPrice} 
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value: Product["category"]) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweeteners">Sweeteners</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="pickles">Pickles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subcategory</Label>
                  <Select 
                    value={formData.subcategory || "none"} 
                    onValueChange={(value) => setFormData({...formData, subcategory: value === "none" ? "" : value as Product["subcategory"]})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="stevia">Stevia</SelectItem>
                      <SelectItem value="monkfruit">Monkfruit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Badge</Label>
                  <Input 
                    value={formData.badge} 
                    onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    placeholder="e.g., Best Seller, New"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={formData.inStock} 
                    onCheckedChange={(checked) => setFormData({...formData, inStock: checked})}
                  />
                  <Label>In Stock</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid gap-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      {product.badge && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="font-bold text-primary">₹{product.price}</span>
                      <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
