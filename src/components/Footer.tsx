import { Leaf, Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "#products" },
      { name: "Stevia", href: "#" },
      { name: "Monkfruit", href: "#" },
      { name: "Bundles", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Story", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "Contact", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16 md:py-20" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-lime rounded-squircle flex items-center justify-center">
                <Leaf className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                PureSweet
              </span>
            </a>
            <p className="text-primary-foreground/70 max-w-sm mb-6 leading-relaxed">
              Experience the pure taste of nature with our premium organic sweeteners. 
              Zero calories, zero guilt, endless flavor.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 bg-primary-foreground/10 rounded-squircle pl-12 pr-4 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 focus:border-lime focus:outline-none transition-colors"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                className="h-12 px-6 bg-lime text-foreground font-bold rounded-squircle hover:bg-lime-glow transition-colors"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {currentYear} PureSweet. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-10 h-10 bg-primary-foreground/10 rounded-squircle flex items-center justify-center hover:bg-lime hover:text-foreground transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
