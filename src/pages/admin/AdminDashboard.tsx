import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Clock, 
  CheckCircle, 
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";

const AdminDashboard: React.FC = () => {
  const { getStats, orders } = useAdmin();
  const stats = getStats();

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      trend: "+12%",
      trendUp: true,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      trend: "+8%",
      trendUp: true,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: Package,
      trend: "+3",
      trendUp: true,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      trend: "-2",
      trendUp: false,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      icon: CheckCircle,
      trend: "+15%",
      trendUp: true,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      trend: "+18%",
      trendUp: true,
      color: "bg-primary/10 text-primary",
    },
  ];

  // Recent orders for the table
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                      {stat.trendUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {stat.trend}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-semibold text-muted-foreground">Order #</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Customer</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Amount</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Status</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{order.orderNumber}</td>
                      <td className="py-4">{order.customer.name}</td>
                      <td className="py-4">₹{order.total.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          order.status === "delivered" ? "bg-green-100 text-green-700" :
                          order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                          order.status === "confirmed" ? "bg-purple-100 text-purple-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
