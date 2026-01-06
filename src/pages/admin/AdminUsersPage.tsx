import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserX, UserCheck, Mail, Phone, ShoppingBag, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

const AdminUsersPage: React.FC = () => {
  const { users, toggleUserStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    toggleUserStatus(userId);
    toast.success(`User ${currentStatus === "active" ? "blocked" : "activated"} successfully`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage registered customers</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{user.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={user.status === "active" ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleToggleStatus(user.id, user.status)}
                  >
                    {user.status === "active" ? (
                      <>
                        <UserX className="h-4 w-4 mr-1" />
                        Block
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{user.orderCount}</strong> orders
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>₹{user.totalSpent.toLocaleString()}</strong> spent
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
