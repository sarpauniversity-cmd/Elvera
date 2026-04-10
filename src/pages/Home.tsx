import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ComboCard from '../components/ComboCard';
import { productsService } from '@/lib/firebase/products';
import { combosService } from '@/lib/firebase/combos';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const imageFloat = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const categories = ['Shirts', 'Pants', 'Shoes', 'Trousers'];

export default function Home() {
  // ---------------------------------------------------------
  // 🛑 BACKEND & LOGIC: 100% UNTOUCHED
  // ---------------------------------------------------------
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredCombos, setFeaturedCombos] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await productsService.getAllProducts();
        const combos = await combosService.getAllCombos();

        const formattedProducts = products.slice(0, 4).map((product: any) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          platform:
            product.platform?.charAt(0).toUpperCase() + product.platform?.slice(1),
          imageUrl: product.images?.[0]?.url || '',
          publicId: product.images?.[0]?.publicId || '',
          rating: product.rating || 4.5,
          reviewCount: product.reviews || 0,
          affiliateLink: product.affiliateLink,
        }));

        const formattedCombos = combos.slice(0, 2).map((combo: any) => ({
          ...combo,
          imageUrl: combo.images?.[0]?.url || '',
        }));

        setFeaturedProducts(formattedProducts);
        setFeaturedCombos(formattedCombos);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    loadData();
  }, []);
  // ---------------------------------------------------------

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="min-h-screen pt-24 pb-20 overflow-hidden"
    >
      {/* 
        ✨ PREMIUM HERO SECTION - Enhanced with Magazine-Style Layout
      */}
      <section className="relative px-6 lg:px-12 max-w-[1600px] mx-auto mb-32">
        {/* Main Hero Container */}
        <div className="relative h-[85vh] min-h-[700px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100 shadow-[0_8px_60px_rgb(0,0,0,0.08)] border border-zinc-200/50">
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 h-full grid lg:grid-cols-2 gap-0">
            
            {/* LEFT SIDE - Premium Text Content */}
            <motion.div 
              variants={fadeUp} 
              className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12"
            >
              {/* Badge */}
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-700 text-white text-[10px] font-bold tracking-[0.25em] uppercase inline-flex items-center gap-2 w-fit shadow-lg"
              >
                <Star className="w-3 h-3 fill-white" />
                Curated Excellence
              </motion.span>
              
              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-serif font-bold text-zinc-900 tracking-tight leading-[0.95] mb-6">
                ELVERA
                <span className="block text-5xl md:text-6xl xl:text-7xl text-zinc-400 mt-2">
                  Menswear
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-zinc-600 font-medium leading-relaxed max-w-lg mb-10">
                Discover the art of exceptional dressing. Premium fashion, 
                <span className="text-zinc-900 font-semibold"> handpicked from the world's finest platforms</span>, 
                curated exclusively for the modern gentleman.
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-8 mb-12 pb-8 border-b border-zinc-200">
                <div>
                  <p className="text-3xl font-serif font-bold text-zinc-900">500+</p>
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mt-1">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-zinc-900">50+</p>
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mt-1">Brands</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-zinc-900">4.9</p>
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mt-1">Rating</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/shop"
                  className="group px-12 py-5 bg-zinc-900 text-white rounded-full text-sm font-bold tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] hover:-translate-y-0.5 uppercase"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/combos"
                  className="group px-12 py-5 bg-white text-zinc-900 border-2 border-zinc-200 rounded-full text-sm font-bold tracking-[0.2em] hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center gap-3 uppercase"
                >
                  View Outfits
                </Link>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Premium Image Grid */}
            <motion.div 
              variants={imageFloat}
              className="relative h-full p-8 lg:p-12"
            >
              {/* Main Large Image */}
              <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=1200"
                  alt="Premium menswear model"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                />
                
                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/10 via-transparent to-transparent"></div>

                {/* Floating Small Image Card - Top Right */}
                <motion.div 
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute top-8 right-8 w-32 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400"
                    alt="Accessory detail"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Badge - Top Left */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute top-8 left-8 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-zinc-200/50"
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase">
                    New Arrivals
                  </p>
                </motion.div>

                {/* Bottom Info Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-200/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] text-zinc-500 uppercase mb-1">
                        Featured This Week
                      </p>
                      <p className="text-2xl font-serif font-bold text-zinc-900">
                        Premium Selection
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                        ))}
                        <span className="text-xs font-bold text-zinc-500 ml-2">5.0</span>
                      </div>
                    </div>
                    <Link 
                      to="/shop"
                      className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                    >
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {/* Small Floating Badge - Bottom Right */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute bottom-32 right-8 w-20 h-20 rounded-full bg-zinc-900 text-white flex flex-col items-center justify-center shadow-2xl border-4 border-white"
                >
                  <p className="text-xs font-bold tracking-widest">UP TO</p>
                  <p className="text-2xl font-serif font-bold">40%</p>
                  <p className="text-[8px] font-bold tracking-widest">OFF</p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-zinc-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-zinc-300 rounded-full blur-3xl opacity-40"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          EVERYTHING BELOW THIS LINE IS 100% YOUR ORIGINAL UI CODE
          --------------------------------------------------------- */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-4 font-bold tracking-widest text-xs uppercase">
              <Sparkles className="w-4 h-4" /> Discover
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest text-text hover:text-zinc-500 transition-colors uppercase"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div key={cat} variants={fadeUp}>
              <Link
                to={`/shop?category=${cat}`}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden block bg-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-zinc-100"
              >
                <img
                  src={`https://images.unsplash.com/photo-${['1596755094514-f87e34085b2c', '1624378439575-d8705ad7ae80', '1542272454315-4c01d7abdf4a', '1556821840-3a63f95609a7'][idx]}?auto=format&fit=crop&q=80&w=800`}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{cat}</h3>
                  <span className="text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-3 h-3 inline-block ml-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12 px-2 md:px-8"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-4 font-bold tracking-widest text-xs uppercase">
              <TrendingUp className="w-4 h-4" /> Trending
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text">
              Best Picks This Week
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest text-text hover:text-zinc-500 transition-colors uppercase"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 md:px-8"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-20 bg-zinc-900 rounded-[3rem] py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16 px-4"
          >
            <span className="mb-6 px-6 py-2 rounded-capsule bg-white/10 text-white text-xs font-bold tracking-[0.2em] uppercase border border-white/10">
              Style Guide
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Complete The Look
            </h2>
            <p className="text-lg text-zinc-400 font-medium max-w-2xl text-balance">
              Hand-picked, fully styled outfits. Shop the entire look across multiple platforms with a single click.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-12"
          >
            {featuredCombos.map((combo) => (
              <motion.div key={combo.id} variants={fadeUp}>
                <ComboCard combo={combo} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link
              to="/combos"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-text rounded-capsule text-sm font-bold tracking-widest hover:bg-zinc-100 transition-all shadow-xl group"
            >
              EXPLORE ALL OUTFITS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
