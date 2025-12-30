import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import greviaLogo from "@/assets/grevia-logo.png";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const { setIsCartOpen, getCartCount, getCartTotal } = useCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Benefits", href: "/benefits" },
    {
      name: "Sweeteners",
      dropdown: [
        { name: "Stevia Sweeteners", href: "/products/sweeteners/stevia" },
        { name: "Monkfruit Sweeteners", href: "/products/sweeteners/monkfruit" },
      ],
    },
    {
      name: "Other Products",
      dropdown: [
        { name: "Bakery Items", href: "/products/bakery" },
        { name: "Pickles & Preserves", href: "/products/pickles" },
      ],
    },
    { name: "Contact Us", href: "/contact" },
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
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button
                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.href!}
                    className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-lime after:transition-all after:duration-300 hover:after:w-full py-2"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[200px]"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-lime/10 hover:text-lime transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
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
          <div className="lg:hidden flex items-center gap-2">
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-6 overflow-hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-lg font-semibold text-foreground py-3 px-2"
                        >
                          {item.name}
                          <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 overflow-hidden"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.href}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setMobileDropdown(null);
                                  }}
                                  className="block text-base text-muted-foreground hover:text-lime py-2 px-2"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href!}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-lg font-semibold text-foreground hover:text-primary transition-colors py-3 px-2"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Button variant="default" size="lg" className="mt-4" asChild>
                  <Link to="/products/sweeteners" onClick={() => setIsMenuOpen(false)}>Shop Now</Link>
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
