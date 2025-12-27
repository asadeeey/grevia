import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import greviaLogo from "@/assets/grevia-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, getCartCount, getCartTotal } = useCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const navLinks = [
    { name: "Benefits", href: "/#benefits" },
    { name: "Sweeteners", href: "/products/sweeteners" },
    { name: "Bakery", href: "/products/bakery" },
    { name: "Pickles", href: "/products/pickles" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={greviaLogo} 
              alt="Grevia - Healthy Natural Foods" 
              className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-lime after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-squircle hover:bg-secondary/50 transition-colors group"
              aria-label="Shopping cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-lime transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-lime text-foreground text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    {cartCount}
                  </span>
                )}
              </div>
              {cartTotal > 0 && (
                <span className="text-sm font-bold text-foreground">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
            <Button variant="default" size="default" asChild>
              <Link to="/products/sweeteners">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1 px-2 py-2 rounded-squircle hover:bg-secondary/50 transition-colors"
              aria-label="Shopping cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-lime text-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              {cartTotal > 0 && (
                <span className="text-xs font-bold text-foreground">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="default" size="lg" className="mt-4" asChild>
                <Link to="/products/sweeteners" onClick={() => setIsMenuOpen(false)}>Shop Now</Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
