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

const categories = ['Shirts', 'Pants', 'Shoes', 'Hoddy'];

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
      className="min-h-screen pt-20 md:pt-24 pb-20 overflow-hidden"
    >
      {/* 
        ✨ PREMIUM HERO SECTION - Centered with Background Image
      */}
      <section className="relative px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto mb-20 md:mb-32">
        {/* Main Hero Container */}
        <div className="relative h-[90vh] min-h-[600px] md:min-h-[700px] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-[0_8px_60px_rgb(0,0,0,0.12)]">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&q=80&w=1600"
              alt="Premium menswear collection"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            {/* Additional side gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          </div>

          {/* Centered Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-12">
            
            {/* Top Badge */}
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 md:mb-8 px-5 md:px-6 py-2 md:py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase inline-flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <Star className="w-3 h-3 fill-white" />
              Premium Collection
            </motion.span>
            
            {/* Main Heading - ELVERA */}
            <motion.h1 
              variants={fadeUp}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tight leading-none mb-4 md:mb-6"
            >
              ELVERA
            </motion.h1>
            
            {/* Simple Tagline */}
            <motion.p 
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide mb-8 md:mb-12 max-w-3xl"
            >
              Dress Better, Feel Confident
            </motion.p>

            {/* Stats Row - Mobile Optimized */}
            <motion.div 
              variants={fadeUp}
              className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 md:mb-12 pb-6 md:pb-8 border-b border-white/20 w-full max-w-lg"
            >
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">500+</p>
                <p className="text-[9px] sm:text-xs font-bold tracking-widest text-white/70 uppercase mt-1">Products</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">50+</p>
                <p className="text-[9px] sm:text-xs font-bold tracking-widest text-white/70 uppercase mt-1">Brands</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">4.9</p>
                <p className="text-[9px] sm:text-xs font-bold tracking-widest text-white/70 uppercase mt-1">Rating</p>
              </div>
            </motion.div>

            {/* CTA Buttons - Mobile Stacked */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
            >
              <Link
                to="/shop"
                className="group w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-zinc-900 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.4)] hover:-translate-y-0.5 uppercase"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/combos"
                className="group w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent text-white border-2 border-white/30 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-3 uppercase"
              >
                View Outfits
              </Link>
            </motion.div>

            {/* Floating Elements - Hidden on Mobile for Cleaner Look */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="hidden md:block absolute top-8 right-8 lg:top-12 lg:right-12 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/50"
            >
              <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase">
                New Arrivals
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="hidden md:flex absolute bottom-8 right-8 lg:bottom-12 lg:right-12 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white text-zinc-900 flex-col items-center justify-center shadow-2xl border-4 border-white/20"
            >
              <p className="text-[9px] lg:text-xs font-bold tracking-widest">UP TO</p>
              <p className="text-2xl lg:text-3xl font-serif font-bold">40%</p>
              <p className="text-[7px] lg:text-[8px] font-bold tracking-widest">OFF</p>
            </motion.div>

            {/* Star Rating Badge - Mobile Friendly */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 lg:bottom-12 lg:left-12 px-6 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-zinc-900 text-zinc-900" />
                ))}
                <span className="text-xs md:text-sm font-bold text-zinc-900 ml-2">5.0 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Blur Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-48 md:h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          EVERYTHING BELOW THIS LINE IS 100% YOUR ORIGINAL UI CODE
          (Made Mobile Responsive)
          --------------------------------------------------------- */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-3 md:mb-4 font-bold tracking-widest text-xs uppercase">
              <Sparkles className="w-4 h-4" /> Discover
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex md:hidden lg:flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest text-text hover:text-zinc-500 transition-colors uppercase"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div key={cat} variants={fadeUp}>
              <Link
                to={`/shop?category=${cat}`}
                className="group relative aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden block bg-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-zinc-100"
              >
                <img
                  src={`https://images.unsplash.com/photo-${['1596755094514-f87e34085b2c', '1624378439575-d8705ad7ae80', '1542272454315-4c01d7abdf4a', '1556821840-3a63f95609a7'][idx]}?auto=format&fit=crop&q=80&w=800`}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-1 md:mb-2">{cat}</h3>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-3 h-3 inline-block ml-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-20 md:mb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-3 md:mb-4 font-bold tracking-widest text-xs uppercase">
              <TrendingUp className="w-4 h-4" /> Trending
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text">
              Best Picks This Week
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex md:hidden lg:flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest text-text hover:text-zinc-500 transition-colors uppercase"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 md:mb-20 bg-zinc-900 rounded-3xl md:rounded-[3rem] py-16 md:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-12 md:mb-16 px-4"
          >
            <span className="mb-4 md:mb-6 px-5 md:px-6 py-2 rounded-capsule bg-white/10 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-white/10">
              Style Guide
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6">
              Complete The Look
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-medium max-w-2xl text-balance">
              Hand-picked, fully styled outfits. Shop the entire look across multiple platforms with a single click.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
          >
            {featuredCombos.map((combo) => (
              <motion.div key={combo.id} variants={fadeUp}>
                <ComboCard combo={combo} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 md:mt-16 text-center">
            <Link
              to="/combos"
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-text rounded-capsule text-xs md:text-sm font-bold tracking-widest hover:bg-zinc-100 transition-all shadow-xl group"
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
