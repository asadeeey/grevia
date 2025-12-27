import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import bakeryCategory from "@/assets/bakery-category.jpg";
import picklesCategory from "@/assets/pickles-category.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: "sweeteners" | "bakery" | "pickles";
  badge?: string;
  inStock: boolean;
}

export const products: Product[] = [
  // Sweeteners
  {
    id: "stevia-jar",
    name: "Grevia Stevia Jar",
    description: "Premium stevia in elegant glass jar",
    longDescription: "Our signature Grevia Stevia Jar contains pure, organic stevia extract sourced from the finest stevia leaves. Perfect for everyday sweetening needs, this premium product comes in an elegant glass jar that preserves freshness and adds a touch of sophistication to your kitchen.",
    ingredients: ["Organic Stevia Leaf Extract", "Natural Fiber (Inulin)"],
    price: 499,
    rating: 4.9,
    reviews: 128,
    image: product1,
    images: [product1],
    category: "sweeteners",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "stevia-powder",
    name: "Grevia Stevia Powder",
    description: "Organic stevia in eco-friendly pouch",
    longDescription: "Grevia Stevia Powder offers the same exceptional quality as our jar variant, packaged in an eco-conscious pouch for minimal environmental impact. This versatile powder dissolves instantly in hot or cold beverages and works perfectly in baking recipes.",
    ingredients: ["Organic Stevia Leaf Extract", "Erythritol (Non-GMO)"],
    price: 349,
    rating: 4.8,
    reviews: 96,
    image: product2,
    images: [product2],
    category: "sweeteners",
    badge: "New",
    inStock: true,
  },
  {
    id: "monkfruit-drops",
    name: "Grevia Monkfruit Drops",
    description: "Liquid sweetener for beverages",
    longDescription: "Our Monkfruit Drops provide a convenient liquid form of natural sweetness. Made from pure monk fruit extract, these drops are perfect for sweetening your coffee, tea, smoothies, and other beverages without any bitter aftertaste.",
    ingredients: ["Monk Fruit Extract", "Purified Water", "Citric Acid"],
    price: 299,
    rating: 4.7,
    reviews: 74,
    image: product3,
    images: [product3],
    category: "sweeteners",
    badge: null,
    inStock: true,
  },
  // Bakery Items
  {
    id: "whole-grain-bread",
    name: "Artisan Whole Grain Bread",
    description: "Freshly baked with organic whole grains",
    longDescription: "Our Artisan Whole Grain Bread is crafted with a blend of organic whole grains, offering a hearty texture and rich, nutty flavor. Baked fresh daily with traditional methods and no artificial preservatives.",
    ingredients: ["Organic Whole Wheat Flour", "Oats", "Flax Seeds", "Honey", "Sea Salt", "Yeast"],
    price: 189,
    rating: 4.8,
    reviews: 64,
    image: bakeryCategory,
    images: [bakeryCategory],
    category: "bakery",
    badge: "Fresh Daily",
    inStock: true,
  },
  {
    id: "butter-croissants",
    name: "Classic Butter Croissants",
    description: "Flaky, golden croissants made with pure butter",
    longDescription: "Indulge in our Classic Butter Croissants, handcrafted with layers of pure butter and premium flour. Each croissant is perfectly flaky on the outside and soft on the inside, ideal for breakfast or an afternoon treat.",
    ingredients: ["Refined Flour", "Pure Butter", "Milk", "Sugar", "Salt", "Yeast"],
    price: 129,
    rating: 4.9,
    reviews: 89,
    image: bakeryCategory,
    images: [bakeryCategory],
    category: "bakery",
    badge: null,
    inStock: true,
  },
  {
    id: "almond-cookies",
    name: "Roasted Almond Cookies",
    description: "Crunchy cookies with roasted almonds",
    longDescription: "Our Roasted Almond Cookies are made with premium roasted almonds and traditional recipe. These crunchy, buttery cookies are perfect for tea time or as a healthy snack option.",
    ingredients: ["Refined Flour", "Butter", "Roasted Almonds", "Brown Sugar", "Vanilla Extract", "Salt"],
    price: 199,
    rating: 4.7,
    reviews: 52,
    image: bakeryCategory,
    images: [bakeryCategory],
    category: "bakery",
    badge: null,
    inStock: true,
  },
  // Pickles & Preserves
  {
    id: "mango-pickle",
    name: "Traditional Mango Pickle",
    description: "Authentic recipe with raw mangoes and spices",
    longDescription: "Our Traditional Mango Pickle is made using a time-honored family recipe. Fresh raw mangoes are carefully selected and pickled with a blend of aromatic spices and cold-pressed mustard oil, creating a perfect balance of tangy, spicy, and savory flavors.",
    ingredients: ["Raw Mango", "Mustard Oil", "Red Chili Powder", "Fenugreek Seeds", "Mustard Seeds", "Salt", "Turmeric"],
    price: 249,
    rating: 4.9,
    reviews: 112,
    image: picklesCategory,
    images: [picklesCategory],
    category: "pickles",
    badge: "Traditional",
    inStock: true,
  },
  {
    id: "lime-pickle",
    name: "Tangy Lime Pickle",
    description: "Zesty lime pickle with aromatic spices",
    longDescription: "Experience the perfect blend of citrus and spice with our Tangy Lime Pickle. Made with fresh limes and a carefully curated mix of spices, this pickle adds a burst of flavor to any meal.",
    ingredients: ["Fresh Lime", "Mustard Oil", "Red Chili", "Fenugreek", "Asafoetida", "Salt"],
    price: 219,
    rating: 4.8,
    reviews: 78,
    image: picklesCategory,
    images: [picklesCategory],
    category: "pickles",
    badge: null,
    inStock: true,
  },
  {
    id: "mixed-vegetable-pickle",
    name: "Mixed Vegetable Pickle",
    description: "A medley of garden vegetables in spiced oil",
    longDescription: "Our Mixed Vegetable Pickle brings together a colorful assortment of fresh vegetables including carrots, cauliflower, and green chilies. Each vegetable is carefully pickled to retain its crunch while absorbing the rich, spicy flavors.",
    ingredients: ["Carrot", "Cauliflower", "Green Chili", "Mustard Oil", "Spices", "Salt"],
    price: 279,
    rating: 4.7,
    reviews: 56,
    image: picklesCategory,
    images: [picklesCategory],
    category: "pickles",
    badge: "Popular",
    inStock: true,
  },
];

export const categories = [
  {
    id: "sweeteners",
    name: "Premium Sweeteners",
    description: "Natural sweeteners for health-conscious living",
  },
  {
    id: "bakery",
    name: "Bakery Items",
    description: "Freshly prepared, minimally processed baked goods made for everyday indulgence.",
    image: bakeryCategory,
  },
  {
    id: "pickles",
    name: "Pickles & Preserves",
    description: "Traditional recipes crafted with natural ingredients and no artificial preservatives.",
    image: picklesCategory,
  },
];

export const getProductsByCategory = (category: Product["category"]) => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
