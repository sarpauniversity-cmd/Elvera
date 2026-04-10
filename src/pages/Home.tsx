import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
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
      className="min-h-screen pt-20 md:pt-24 pb-20 overflow-hidden font-sans"
    >
      {/* 
        ✨ PREMIUM HERO SECTION - Ultra Clean & Minimal
      */}
      <section className="relative px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto mb-20 md:mb-32">
        {/* Main Hero Container */}
        <div className="relative h-[90vh] min-h-[650px] md:min-h-[800px] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_100px_rgb(0,0,0,0.2)]">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1600"
              alt="Premium menswear collection"
              className="w-full h-full object-cover object-center"
            />
            {/* Clean, sophisticated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          </div>

          {/* Centered Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-12">
            
            {/* Top Badge */}
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-10 md:mb-12 px-7 md:px-9 py-3 md:py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase inline-flex items-center border border-white/20"
            >
              Premium Menswear
            </motion.span>
            
            {/* Main Heading - ELVERA */}
            <motion.h1 
              variants={fadeUp}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light text-white tracking-[0.05em] leading-none mb-8 md:mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ELVERA
            </motion.h1>
            
            {/* Simple Tagline */}
            <motion.p 
              variants={fadeUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 font-light tracking-[0.05em] mb-16 md:mb-20 max-w-4xl"
            >
              Dress Better, Feel Confident
            </motion.p>

            {/* CTA Buttons - Mobile Stacked */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
            >
              <Link
                to="/shop"
                className="group w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-white text-zinc-900 rounded-full text-xs md:text-sm font-semibold tracking-[0.25em] hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 shadow-[0_10px_50px_rgb(0,0,0,0.4)] hover:shadow-[0_15px_60px_rgb(0,0,0,0.5)] hover:-translate-y-1 uppercase"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/combos"
                className="group w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-transparent text-white border-2 border-white/40 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold tracking-[0.25em] hover:bg-white/10 hover:border-white/60 transition-all flex items-center justify-center gap-3 uppercase"
              >
                View Outfits
              </Link>
            </motion.div>
          </div>

          {/* Minimal Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          REST OF THE SECTIONS - CLEAN DESIGN
          --------------------------------------------------------- */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-5 font-medium tracking-[0.25em] text-[11px] uppercase">
              <Sparkles className="w-4 h-4" /> Discover
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 tracking-wide">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-zinc-900 hover:text-zinc-600 transition-colors uppercase"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div key={cat} variants={fadeUp}>
              <Link
                to={`/shop?category=${cat}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden block bg-zinc-100 shadow-[0_8px_40px_rgb(0,0,0,0.1)] hover:shadow-[0_12px_50px_rgb(0,0,0,0.15)] transition-all duration-500"
              >
                <img
                  src={`https://images.unsplash.com/photo-${['1596755094514-f87e34085b2c', '1624378439575-d8705ad7ae80', '1542272454315-4c01d7abdf4a', '1556821840-3a63f95609a7'][idx]}?auto=format&fit=crop&q=80&w=800`}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">{cat}</h3>
                  <span className="text-[11px] md:text-xs font-medium tracking-[0.2em] text-white/70 uppercase group-hover:text-white transition-colors inline-flex items-center gap-2">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-5 font-medium tracking-[0.25em] text-[11px] uppercase">
              <TrendingUp className="w-4 h-4" /> Trending
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 tracking-wide">
              Best Picks This Week
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-zinc-900 hover:text-zinc-600 transition-colors uppercase"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto mb-16 md:mb-20 bg-zinc-900 rounded-3xl md:rounded-[3rem] py-20 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16 md:mb-20 px-4"
          >
            <span className="mb-8 px-7 md:px-9 py-3 rounded-full bg-white/10 text-white text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase border border-white/10">
              Style Guide
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-7 tracking-wide">
              Complete The Look
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              Curated outfits for every occasion
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

          <div className="mt-16 md:mt-20 text-center">
            <Link
              to="/combos"
              className="inline-flex items-center gap-3 px-12 md:px-16 py-5 md:py-6 bg-white text-zinc-900 rounded-full text-xs md:text-sm font-semibold tracking-[0.25em] hover:bg-zinc-100 transition-all shadow-2xl hover:shadow-[0_20px_70px_rgb(0,0,0,0.3)] hover:-translate-y-1 group uppercase"
            >
              View All Outfits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
