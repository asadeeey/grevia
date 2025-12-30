import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Heart, Zap, Scale, Brain, Sparkles } from "lucide-react";
import steviaPlant from "@/assets/stevia-plant.jpg";
import monkfruit from "@/assets/monkfruit.jpg";

const BenefitsPage = () => {
  const steviaBenefits = [
    {
      icon: Scale,
      title: "Zero Calories",
      description: "Stevia contains no calories, making it perfect for weight management and calorie-conscious diets.",
    },
    {
      icon: Heart,
      title: "Blood Sugar Friendly",
      description: "Does not raise blood sugar levels, making it suitable for diabetics and those monitoring glucose.",
    },
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Derived from the stevia rebaudiana plant, a natural herb native to South America.",
    },
    {
      icon: Zap,
      title: "300x Sweeter",
      description: "Up to 300 times sweeter than sugar, so a little goes a long way.",
    },
    {
      icon: Brain,
      title: "No Bitter Aftertaste",
      description: "Our premium extraction process ensures a clean, sweet taste without bitterness.",
    },
    {
      icon: Sparkles,
      title: "Heat Stable",
      description: "Perfect for baking and cooking as it doesn't break down at high temperatures.",
    },
  ];

  const monkfruitBenefits = [
    {
      icon: Scale,
      title: "Zero Glycemic Impact",
      description: "Monk fruit sweetener has zero glycemic index, ideal for keto and low-carb lifestyles.",
    },
    {
      icon: Heart,
      title: "Antioxidant Properties",
      description: "Contains mogrosides, natural antioxidants that help fight free radicals.",
    },
    {
      icon: Leaf,
      title: "Ancient Wisdom",
      description: "Used for centuries in Traditional Chinese Medicine for its healing properties.",
    },
    {
      icon: Zap,
      title: "150-200x Sweeter",
      description: "Intensely sweet, requiring only small amounts for desired sweetness.",
    },
    {
      icon: Brain,
      title: "No Aftertaste",
      description: "Clean, pure sweetness without the metallic or bitter notes of artificial sweeteners.",
    },
    {
      icon: Sparkles,
      title: "Versatile Use",
      description: "Works beautifully in beverages, desserts, sauces, and everyday cooking.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-lime/10 to-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-lime/20 text-foreground text-sm font-medium rounded-full mb-6"
            >
              Natural Sweetness
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6"
            >
              The Benefits of Natural Sweeteners
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Discover why stevia and monk fruit are the smartest choices for health-conscious sweetening. Pure, natural, and backed by science.
            </motion.p>
          </div>
        </section>

        {/* Stevia Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-lime/20 text-foreground text-sm font-medium rounded-full mb-4">
                  Stevia
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  The Gift from Nature's Garden
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Stevia rebaudiana, a plant native to Paraguay, has been used for centuries by indigenous peoples to sweeten beverages and medicines. Today, it stands as one of the most trusted natural alternatives to sugar.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our premium stevia is carefully extracted to preserve its natural sweetness while eliminating any bitter compounds. The result is a clean, pure sweetener that enhances your food and beverages without compromising your health goals.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={steviaPlant} 
                    alt="Fresh stevia plant leaves" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-lime/30 rounded-full blur-3xl" />
              </motion.div>
            </div>

            {/* Stevia Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steviaBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-lime/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-lime/20 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-lime" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Monk Fruit Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-2 lg:order-1"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={monkfruit} 
                    alt="Fresh monk fruit" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/30 rounded-full blur-3xl" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <span className="inline-block px-3 py-1 bg-amber-400/20 text-foreground text-sm font-medium rounded-full mb-4">
                  Monk Fruit
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Ancient Treasure, Modern Wellness
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Monk fruit, also known as Luo Han Guo, has been cultivated in the remote mountains of Southern China for centuries. Revered by Buddhist monks for its medicinal properties, this remarkable fruit offers sweetness without the downsides of sugar.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The sweetness comes from mogrosides—natural compounds that are not metabolized by the body, meaning zero calories and zero impact on blood sugar. It's nature's perfect sweetener for the modern health-conscious consumer.
                </p>
              </motion.div>
            </div>

            {/* Monk Fruit Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monkfruitBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-amber-400/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Natural vs. Artificial
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See why choosing natural sweeteners is the smarter choice for your health
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Regular Sugar</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li>❌ High in calories</li>
                    <li>❌ Spikes blood sugar</li>
                    <li>❌ Contributes to weight gain</li>
                    <li>❌ Causes energy crashes</li>
                    <li>❌ Harmful for teeth</li>
                  </ul>
                </div>
                <div className="p-8 text-center bg-lime/5">
                  <h3 className="text-xl font-semibold text-lime mb-4">Natural Sweeteners</h3>
                  <ul className="space-y-3 text-foreground text-sm">
                    <li>✅ Zero calories</li>
                    <li>✅ No blood sugar impact</li>
                    <li>✅ Supports weight management</li>
                    <li>✅ Sustained energy</li>
                    <li>✅ Tooth-friendly</li>
                  </ul>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Artificial Sweeteners</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li>⚠️ Chemical compounds</li>
                    <li>⚠️ Potential health concerns</li>
                    <li>⚠️ Metallic aftertaste</li>
                    <li>⚠️ May affect gut health</li>
                    <li>⚠️ Synthetic processing</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BenefitsPage;
