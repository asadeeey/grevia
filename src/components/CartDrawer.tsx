import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b border-border flex flex-row items-center justify-between">
          <SheetTitle className="text-lg font-black uppercase tracking-wide">
            Shopping Cart
          </SheetTitle>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Close <X className="w-4 h-4" />
          </button>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button onClick={() => setIsCartOpen(false)} asChild>
              <Link to="/products/sweeteners">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link 
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-semibold text-foreground hover:text-lime transition-colors line-clamp-2 text-sm"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-lime hover:border-lime hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-lime hover:border-lime hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-lime text-sm">
                        {item.quantity} × ₹{item.product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <SheetFooter className="border-t border-border p-4 mt-auto bg-background">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold uppercase text-sm tracking-wide">Subtotal:</span>
                  <span className="text-2xl font-black text-lime">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full" 
                    onClick={() => setIsCartOpen(false)}
                    asChild
                  >
                    <Link to="/products/sweeteners">View Cart</Link>
                  </Button>
                  <Button 
                    variant="limeLg" 
                    className="w-full rounded-full" 
                    onClick={() => setIsCartOpen(false)}
                    asChild
                  >
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
