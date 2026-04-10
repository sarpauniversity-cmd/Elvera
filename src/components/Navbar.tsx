import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, User, Menu, X, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { bag, favorites } = useAppContext();
  const { user, signOut, isAdmin, loading } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Successfully logged out.');
      navigate('/');
      setMobileMenuOpen(false);
    } else {
      toast.error('Failed to sign out');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Combos', path: '/combos' },
    { name: 'Shoes', path: '/shoes' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-xl bg-white/80 shadow-sm' : 'py-5 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-semibold tracking-widest text-zinc-900 hover:text-zinc-700 transition-colors">
            ELVERA
          </Link>

          {/* Desktop Navigation - Pill Container with Pill Links */}
          <nav className="hidden md:flex items-center gap-2 bg-zinc-100/80 backdrop-blur-sm rounded-full px-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Favorites */}
            <Link 
              to="/favorites" 
              className="relative p-2.5 rounded-full hover:bg-zinc-100 transition-all duration-200 group hidden sm:block"
            >
              <Heart className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.8} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link 
              to="/bag" 
              className="relative p-2.5 rounded-full hover:bg-zinc-100 transition-all duration-200 group"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.8} />
              {bag.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-zinc-900 text-white text-[11px] flex items-center justify-center rounded-full font-semibold ring-2 ring-white">
                  {bag.length}
                </span>
              )}
            </Link>

            {/* User Authentication */}
            {!loading && user ? (
              isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Shield className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-semibold">Admin</span>
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all duration-200 border border-zinc-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-600 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">
                      {user.displayName?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase() ||
                        'U'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">
                    {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Profile'}
                  </span>
                </Link>
              )
            ) : !loading ? (
              <Link
                to="/login"
                className="hidden sm:block px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Login
              </Link>
            ) : null}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2.5 rounded-full hover:bg-zinc-100 transition-all duration-200 text-zinc-900" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Mobile Header */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-200">
              <span className="text-xl font-serif font-semibold tracking-widest text-zinc-900">ELVERA</span>
              <button 
                className="p-2 bg-zinc-100 rounded-full text-zinc-600 hover:bg-zinc-200 transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-2xl font-bold py-3 px-4 rounded-2xl transition-all ${
                    location.pathname === link.path
                      ? 'text-zinc-900 bg-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-zinc-200 flex flex-col gap-3">
              <Link 
                to="/favorites" 
                className="flex items-center gap-3 text-base font-medium text-zinc-600 hover:text-zinc-900 py-3 px-4 rounded-2xl hover:bg-zinc-50 transition-all"
              >
                <Heart className="w-5 h-5" strokeWidth={2} /> 
                <span>Saved Items ({favorites.length})</span>
              </Link>

              {!loading && user ? (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      className="w-full py-4 bg-zinc-900 text-white rounded-full text-center font-semibold shadow-lg hover:bg-zinc-800 transition-all"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="w-full py-4 bg-zinc-900 text-white rounded-full text-center font-semibold shadow-lg hover:bg-zinc-800 transition-all"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="w-full py-4 bg-zinc-100 text-zinc-900 rounded-full text-center font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" strokeWidth={2} />
                    Sign Out
                  </button>
                </>
              ) : !loading ? (
                <Link
                  to="/login"
                  className="w-full py-4 bg-zinc-900 text-white rounded-full text-center font-semibold shadow-lg hover:bg-zinc-800 transition-all"
                >
                  Login
                </Link>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
