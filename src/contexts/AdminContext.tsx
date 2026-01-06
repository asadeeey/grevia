import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, products as initialProducts, categories as initialCategories } from "@/data/products";

// ============= TYPES =============
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager";
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: { productId: string; productName: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "manual";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "blocked";
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  parentCategory?: string;
  status: "active" | "inactive";
  productCount: number;
}

export interface HomepageSection {
  id: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  badge?: string;
  order: number;
  status: "active" | "inactive";
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  status: "active" | "inactive";
}

// ============= MOCK DATA =============
const generateMockOrders = (): Order[] => {
  const statuses: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  const names = ["Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Gupta", "Vikram Singh"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `order-${i + 1}`,
    orderNumber: `GRV-${String(1000 + i).padStart(6, "0")}`,
    customer: {
      name: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@email.com`,
      phone: `+91 98765${String(43210 + i).slice(-5)}`,
    },
    shippingAddress: {
      address: `${100 + i}, Example Street`,
      city: cities[i % cities.length],
      state: "Maharashtra",
      pincode: `40000${i % 10}`,
    },
    items: [
      { productId: "stevia-jar", productName: "Grevia Stevia Jar", quantity: 2, price: 499 },
      { productId: "monkfruit-drops", productName: "Grevia Monkfruit Drops", quantity: 1, price: 299 },
    ],
    subtotal: 1297,
    tax: 233,
    shipping: i % 3 === 0 ? 0 : 50,
    total: 1297 + 233 + (i % 3 === 0 ? 0 : 50),
    status: statuses[i % statuses.length],
    paymentMethod: i % 2 === 0 ? "cod" : "manual",
    createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
};

const generateMockUsers = (): User[] => {
  const names = ["Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Gupta", "Vikram Singh", "Anita Desai", "Ravi Verma", "Meera Joshi"];
  return names.map((name, i) => ({
    id: `user-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
    phone: `+91 98765${String(43210 + i).slice(-5)}`,
    status: i === 5 ? "blocked" : "active",
    createdAt: new Date(Date.now() - i * 86400000 * 10).toISOString(),
    orderCount: Math.floor(Math.random() * 10) + 1,
    totalSpent: Math.floor(Math.random() * 5000) + 500,
  }));
};

const generateMockCategories = (): Category[] => {
  return initialCategories.map((cat, i) => ({
    ...cat,
    status: "active" as const,
    productCount: initialProducts.filter(p => p.category === cat.id || p.subcategory === cat.id).length,
  }));
};

const generateMockHomepageSections = (): HomepageSection[] => [
  {
    id: "hero",
    sectionKey: "hero",
    title: "Sweetness Without Sacrifice",
    subtitle: "Nature's Perfect Sweeteners",
    description: "Discover the pure taste of nature with our premium Stevia and Monk Fruit sweeteners. Zero calories, zero guilt, all the sweetness you love.",
    ctaText: "Shop Now",
    ctaLink: "/products/sweeteners",
    badge: "100% Natural",
    order: 1,
    status: "active",
  },
  {
    id: "sweeteners-section",
    sectionKey: "sweeteners",
    title: "Nature's Finest Sweeteners",
    subtitle: "Choose Your Perfect Match",
    description: "Explore our range of premium natural sweeteners",
    order: 2,
    status: "active",
  },
  {
    id: "cta-section",
    sectionKey: "cta",
    title: "Ready to Make the Switch?",
    subtitle: "Join thousands of happy customers",
    description: "Start your journey to healthier sweetening today",
    ctaText: "Get Started",
    ctaLink: "/products/sweeteners",
    badge: "Special Offer",
    order: 3,
    status: "active",
  },
];

const generateMockBenefits = (): Benefit[] => [
  { id: "benefit-1", title: "Zero Calories", description: "Enjoy sweetness without adding calories to your diet", icon: "Leaf", order: 1, status: "active" },
  { id: "benefit-2", title: "Blood Sugar Friendly", description: "Safe for diabetics with zero glycemic impact", icon: "Heart", order: 2, status: "active" },
  { id: "benefit-3", title: "100% Natural", description: "No artificial ingredients or chemicals", icon: "Sparkles", order: 3, status: "active" },
  { id: "benefit-4", title: "Tooth Friendly", description: "Does not contribute to tooth decay", icon: "Shield", order: 4, status: "active" },
];

// ============= STORAGE KEYS =============
const STORAGE_KEYS = {
  adminUser: "grevia-admin-user",
  products: "grevia-admin-products",
  orders: "grevia-admin-orders",
  users: "grevia-admin-users",
  categories: "grevia-admin-categories",
  homepageSections: "grevia-admin-homepage",
  benefits: "grevia-admin-benefits",
};

// ============= CONTEXT =============
interface AdminContextType {
  // Auth
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  
  // Products
  adminProducts: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  
  // Users
  users: User[];
  toggleUserStatus: (userId: string) => void;
  
  // Categories
  adminCategories: Category[];
  addCategory: (category: Omit<Category, "id" | "productCount">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // CMS
  homepageSections: HomepageSection[];
  updateHomepageSection: (id: string, section: Partial<HomepageSection>) => void;
  benefits: Benefit[];
  addBenefit: (benefit: Omit<Benefit, "id">) => void;
  updateBenefit: (id: string, benefit: Partial<Benefit>) => void;
  deleteBenefit: (id: string) => void;
  
  // Stats
  getStats: () => {
    totalOrders: number;
    totalUsers: number;
    activeProducts: number;
    pendingOrders: number;
    deliveredOrders: number;
    totalRevenue: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ============= PROVIDER =============
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.adminUser);
    return stored ? JSON.parse(stored) : null;
  });

  const [adminProducts, setAdminProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.products);
    return stored ? JSON.parse(stored) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.orders);
    return stored ? JSON.parse(stored) : generateMockOrders();
  });

  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.users);
    return stored ? JSON.parse(stored) : generateMockUsers();
  });

  const [adminCategories, setAdminCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.categories);
    return stored ? JSON.parse(stored) : generateMockCategories();
  });

  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.homepageSections);
    return stored ? JSON.parse(stored) : generateMockHomepageSections();
  });

  const [benefits, setBenefits] = useState<Benefit[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.benefits);
    return stored ? JSON.parse(stored) : generateMockBenefits();
  });

  // Persist to localStorage
  useEffect(() => {
    if (adminUser) localStorage.setItem(STORAGE_KEYS.adminUser, JSON.stringify(adminUser));
    else localStorage.removeItem(STORAGE_KEYS.adminUser);
  }, [adminUser]);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(adminProducts)); }, [adminProducts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(adminCategories)); }, [adminCategories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.homepageSections, JSON.stringify(homepageSections)); }, [homepageSections]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.benefits, JSON.stringify(benefits)); }, [benefits]);

  // Auth
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call Laravel API
    if (email === "admin@grevia.com" && password === "admin123") {
      const user: AdminUser = { id: "admin-1", email, name: "Admin User", role: "admin" };
      setAdminUser(user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAdminUser(null);
  }, []);

  // Products
  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: `product-${Date.now()}` } as Product;
    setAdminProducts(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setAdminProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setAdminProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Orders
  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  }, []);

  // Users
  const toggleUserStatus = useCallback((userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
  }, []);

  // Categories
  const addCategory = useCallback((category: Omit<Category, "id" | "productCount">) => {
    const newCategory: Category = { ...category, id: `category-${Date.now()}`, productCount: 0 };
    setAdminCategories(prev => [...prev, newCategory]);
  }, []);

  const updateCategory = useCallback((id: string, category: Partial<Category>) => {
    setAdminCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setAdminCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // CMS
  const updateHomepageSection = useCallback((id: string, section: Partial<HomepageSection>) => {
    setHomepageSections(prev => prev.map(s => s.id === id ? { ...s, ...section } : s));
  }, []);

  const addBenefit = useCallback((benefit: Omit<Benefit, "id">) => {
    const newBenefit: Benefit = { ...benefit, id: `benefit-${Date.now()}` };
    setBenefits(prev => [...prev, newBenefit]);
  }, []);

  const updateBenefit = useCallback((id: string, benefit: Partial<Benefit>) => {
    setBenefits(prev => prev.map(b => b.id === id ? { ...b, ...benefit } : b));
  }, []);

  const deleteBenefit = useCallback((id: string) => {
    setBenefits(prev => prev.filter(b => b.id !== id));
  }, []);

  // Stats
  const getStats = useCallback(() => ({
    totalOrders: orders.length,
    totalUsers: users.length,
    activeProducts: adminProducts.filter(p => p.inStock).length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    deliveredOrders: orders.filter(o => o.status === "delivered").length,
    totalRevenue: orders.filter(o => o.status === "delivered").reduce((sum, o) => sum + o.total, 0),
  }), [orders, users, adminProducts]);

  return (
    <AdminContext.Provider value={{
      adminUser,
      login,
      logout,
      isAuthenticated: !!adminUser,
      adminProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      updateOrderStatus,
      users,
      toggleUserStatus,
      adminCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      homepageSections,
      updateHomepageSection,
      benefits,
      addBenefit,
      updateBenefit,
      deleteBenefit,
      getStats,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
