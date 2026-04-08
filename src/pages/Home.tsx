import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Play } from 'lucide-react';
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
        ✅ STUNNING HERO SECTION WITH CLOTHING VISUALS
      */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-32 h-[90vh] min-h-[700px] flex items-center">
        {/* Main Container with rounded corners */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden -z-10 shadow-2xl">
          {/* Split Screen Layout - Left: Image, Right: Content */}
          <div className="absolute inset-0 flex">
            {/* LEFT SIDE - STUNNING CLOTHING IMAGE */}
            <div className="w-full lg:w-3/5 relative overflow-hidden">
              {/* Main Hero Image - High Fashion Model/Clothing */}
              <img
                src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=2000"
                alt="Premium Menswear"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Gradient Overlay for text blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:to-black/80"></div>
              
              {/* Floating Product Cards - Showcase individual items */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-8 right-8 hidden lg:block"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=400"
                    alt="Featured Shirt"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Premium Cotton Shirt</h4>
                  <p className="text-xs text-zinc-600 mb-2">Classic Fit</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-900">$89</span>
                    <span className="text-xs text-emerald-600 font-semibold">In Stock</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute bottom-8 right-8 hidden lg:block"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400"
                    alt="Featured Sneakers"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Designer Sneakers</h4>
                  <p className="text-xs text-zinc-600 mb-2">Limited Edition</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-900">$149</span>
                    <span className="text-xs text-amber-600 font-semibold">Few Left</span>
                  </div>
                </div>
              </motion.div>

              {/* Video Play Button Overlay (Optional) */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-12 left-12 hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all group border border-white/30"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-zinc-900 fill-zinc-900 ml-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide">Watch Collection</span>
              </motion.button>
            </div>

            {/* RIGHT SIDE - CONTENT (Hidden on mobile, overlaid on image) */}
            <div className="hidden lg:block w-2/5 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              {/* Stats/Features */}
              <div className="absolute bottom-12 left-12 right-12">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Products</div>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">50+</div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">4.9</div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT OVERLAY - Centered on mobile, left-aligned on desktop */}
        <motion.div 
          variants={fadeUp} 
          className="relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-12"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase shadow-lg"
          >
            Premium Menswear Collection
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[0.9] mb-6"
          >
            ELEVATE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              YOUR STYLE
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-zinc-200 font-medium max-w-lg mb-8 leading-relaxed"
          >
            Discover curated premium fashion from the world's best brands. 
            <span className="text-white font-semibold"> Shop smarter, dress better.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              to="/shop"
              className="group w-full sm:w-auto px-10 py-5 bg-white text-zinc-900 rounded-full text-sm font-bold tracking-widest hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)] hover:-translate-y-0.5"
            >
              SHOP NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/combos"
              className="group w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-bold tracking-widest hover:bg-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-3"
            >
              VIEW OUTFITS
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-8 text-white/70 text-xs"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">Trusted by 10k+ customers</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="hidden sm:flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Verified Products</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
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
