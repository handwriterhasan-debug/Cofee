/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { SIGNATURE_DRINKS } from '../data';
import { ShoppingBag, Search, Menu as MenuIcon, X, Trash2, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Drink } from '../types';
import CheckoutConfetti from './CheckoutConfetti';

export default function Navbar() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart, setSelectedDrinkForCustomizer } = useCoffee();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drink[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'checking' | 'success'>('idle');
  const [isFirstCheckout, setIsFirstCheckout] = useState(false);

  // Handle scroll trigger for transparent active glass bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle drink search live updates
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = SIGNATURE_DRINKS.filter(drink =>
      drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Artisan Customizer', href: '#customizer' },
    { name: 'Our Café', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Mobile App', href: '#app' }
  ];

  const handleCheckout = () => {
    setCheckoutStep('checking');
    
    // Check if first checkout
    const hasCheckedOutBefore = localStorage.getItem('veloura_first_checkout') === 'true';
    setIsFirstCheckout(!hasCheckedOutBefore);

    setTimeout(() => {
      setCheckoutStep('success');
      localStorage.setItem('veloura_first_checkout', 'true');
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setCheckoutStep('idle');
    setCartOpen(false);
    clearCart();
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F7F3EE]/95 backdrop-blur-md shadow-sm border-b border-[#E7C9B2]/20 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO - Veloura Café */}
          <a id="nav-logo" href="#home" className="flex items-center space-x-2 group">
            <span className="w-8 h-8 rounded-full bg-[#6B3E26] flex items-center justify-center text-[#F7F3EE]">
              <span className="font-serif italic font-extrabold text-sm">V</span>
            </span>
            <div className="flex flex-col">
              <span className="font-serif italic font-extrabold text-[#2B1B16] text-xl tracking-tight leading-none group-hover:text-[#6B3E26] transition-colors">
                Veloura
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C67B3D] font-bold leading-normal">
                Café • Reserve
              </span>
            </div>
          </a>

          {/* DESKTOP MENU - Luxury typography */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item, idx) => (
              <a
                id={`nav-link-${idx}`}
                key={item.name}
                href={item.href}
                className="font-sans text-xs uppercase tracking-widest text-[#1B1B16] font-semibold hover:text-[#C67B3D] transition-colors relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C67B3D] transition-all duration-350 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CART & SEARCH BUTTONS */}
          <div id="nav-actions" className="flex items-center space-x-4">
            {/* Search Toggle Button */}
            <button
              id="search-toggle-btn"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#6B3E26]/5 text-[#2B1B16] transition-colors relative"
              aria-label="Search café menu"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Premium Shopping Bag with Animated Quantity Badge */}
            <button
              id="cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              className="px-4 py-2 rounded-full bg-[#2B1B16] hover:bg-[#6B3E26] text-white flex items-center space-x-2 transition-all duration-300 shadow-md shadow-[#2B1B16]/10 relative group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      id="cart-badge-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-2.5 text-[10px] bg-[#C67B3D] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs font-semibold tracking-wider font-sans uppercase hidden sm:inline-block">
                Bag
              </span>
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              id="mobile-drawer-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 lg:hidden text-[#2B1B16] hover:bg-[#6B3E26]/5 rounded-full transition-colors"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN GLASS SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            id="search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2B1B16]/80 backdrop-blur-md flex items-start justify-center pt-24 px-6"
          >
            <div className="bg-[#FFFDF9] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E7C9B2]/30 overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-[#E7C9B2]/20">
                <div className="flex items-center space-x-3 w-full">
                  <Search className="w-5 h-5 text-[#C67B3D]" />
                  <input
                    id="search-input-field"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search caramel, cold brew, matcha..."
                    className="w-full text-base font-sans text-[#1B1B1B] leading-none placeholder-[#777777] bg-transparent outline-none border-none py-1"
                    autoFocus
                  />
                </div>
                <button
                  id="close-search-modal"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1.5 rounded-full hover:bg-[#6B3E26]/10 text-[#777777] hover:text-[#1B1B1B] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live search result window */}
              <div className="p-6 max-h-[400px] overflow-y-auto bg-[#FFFDF9]">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-8 text-[#777777] text-sm">
                    Type to search Veloura Reserve signature recipes...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-8 text-[#777777] text-sm">
                    No beverages found matching "<span className="font-semibold">{searchQuery}</span>".
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-mono text-[10px] text-[#C67B3D] uppercase tracking-wider font-semibold">
                      Found {searchResults.length} creations
                    </p>
                    {searchResults.map((drink) => (
                      <div
                        id={`search-result-item-${drink.id}`}
                        key={drink.id}
                        className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-[#F7F3EE] transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedDrinkForCustomizer(drink);
                          setSearchOpen(false);
                          setSearchQuery('');
                          // Scroll to customizer section
                          const el = document.getElementById('customizer');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <img
                          src={drink.image}
                          alt={drink.name}
                          className="w-12 h-12 object-cover rounded-xl border border-[#E7C9B2]/20"
                        />
                        <div className="flex-1">
                          <h4 className="font-sans text-sm font-bold text-[#1B1B1B] group-hover:text-[#6B3E26] transition-colors">
                            {drink.name}
                          </h4>
                          <p className="font-sans text-xs text-[#777777] line-clamp-1">
                            {drink.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-[#2B1B16]">${drink.price.toFixed(2)}</span>
                          <span className="block font-mono text-[10px] text-[#C67B3D]">{drink.calories} Cal</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULL DRAWER NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2B1B16]/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              id="mobile-drawer-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-[#FFFDF9] p-8 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#E7C9B2]/20 pb-6 mb-8">
                <span className="font-serif italic font-extrabold text-[#2B1B16] text-xl">Veloura Café</span>
                <button
                  id="close-mobile-drawer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-[#F7F3EE] hover:bg-[#E7C9B2]/20 transition-all text-[#2B1B16]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div id="mobile-nav-links" className="flex flex-col space-y-6">
                {menuItems.map((item, idx) => (
                  <a
                    id={`mobile-nav-link-${idx}`}
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-lg font-bold text-[#1B1B1B] hover:text-[#C67B3D] transition-colors py-1"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto border-t border-[#E7C9B2]/20 pt-8 text-center">
                <p className="font-serif italic font-semibold text-sm text-[#6B3E26]">Artisan Sourcing • Handcrafted Experience</p>
                <p className="font-sans text-xs text-[#777777] mt-2">Open Daily: 6:00 AM – 9:00 PM</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY SHOPPING CART DRAWER (Checkout Overlay included) */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            id="cart-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2B1B16]/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              id="cart-drawer-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-[#FFFDF9] shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E7C9B2]/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#C67B3D]" />
                  <span className="font-sans text-base font-bold text-[#1B1B1B] uppercase tracking-wider">
                    Your Selection ({totalItems})
                  </span>
                </div>
                <button
                  id="close-cart-drawer"
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#F7F3EE] transition-colors text-[#777777] hover:text-[#1B1B1B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content */}
              <div id="cart-item-list" className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-[#F7F3EE] flex items-center justify-center text-[#C67B3D] mb-4">
                      <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif italic font-bold text-[#2B1B16] text-lg">Your bag is empty</h4>
                    <p className="font-sans text-xs text-[#777777] mt-2 max-w-[260px] mx-auto leading-relaxed">
                      Begin customizing your handcrafted espresso experience in our featured collection.
                    </p>
                    <button
                      id="cart-shop-now-btn"
                      onClick={() => {
                        setCartOpen(false);
                        const el = document.getElementById('menu');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 px-6 py-2.5 rounded-full bg-[#6B3E26] hover:bg-[#2B1B16] text-[#FFFDF9] font-sans text-xs font-semibold tracking-wider uppercase transition-colors shadow-m md"
                    >
                      Shop Featured Drinks
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      id={`cart-item-row-${item.id}`}
                      key={item.id}
                      className="flex items-start space-x-4 pb-6 border-b border-[#E7C9B2]/10 group"
                    >
                      <img
                        src={item.drink.image}
                        alt={item.drink.name}
                        className="w-16 h-16 object-cover rounded-2xl border border-[#E7C9B2]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-sans text-sm font-bold text-[#1B1B1B] leading-tight">
                            {item.drink.name}
                          </h4>
                          <span className="font-mono text-sm font-semibold text-[#2B1B16] ml-2">
                            ${(item.finalPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Customization Details Grid Tag list */}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#E7C9B2]/30 text-[#6B3E26]">
                            {item.customizations.size}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F7F3EE] text-[#777777]">
                            {item.customizations.milk}
                          </span>
                          {item.customizations.sweetener !== 'None' && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C67B3D]/10 text-[#C67B3D]">
                              {item.customizations.sweetener}
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F7F3EE] text-[#777777]">
                            Ice: {item.customizations.iceLevel}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F7F3EE] text-[#777777]">
                            Sugar: {item.customizations.sugarLevel}
                          </span>
                          {item.customizations.extraShot && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#6B3E26]/15 text-[#6B3E26] font-semibold">
                              +Double Shot
                            </span>
                          )}
                        </div>

                        {/* Interactive Quantity Stepper */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#E7C9B2]/40 rounded-full bg-[#FFFDF9] overflow-hidden">
                            <button
                              id={`cart-decrease-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2.5 hover:bg-[#F7F3EE] text-[#777777] hover:text-[#2B1B16] transition-all text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-semibold px-2 text-[#2B1B16]">
                              {item.quantity}
                            </span>
                            <button
                              id={`cart-increase-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2.5 hover:bg-[#F7F3EE] text-[#777777] hover:text-[#2B1B16] transition-all text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            id={`cart-remove-item-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#777777] hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer Bar with summary details */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#F7F3EE]/80 border-t border-[#E7C9B2]/20">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-[#777777] font-sans font-medium">
                      <span>Standard Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#777777] font-sans font-medium">
                      <span>Artisan Roaster Tax (8%)</span>
                      <span>${(cartSubtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#777777] font-sans font-medium">
                      <span>Eco-Delivery Fee</span>
                      <span className="font-mono text-[10px] text-[#C67B3D] uppercase font-bold">Complimentary</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#E7C9B2]/20 font-sans text-sm font-extrabold text-[#2B1B16]">
                      <span>Grand Total</span>
                      <span className="font-mono text-base">${(cartSubtotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    disabled={checkoutStep === 'checking'}
                    className="w-full py-4 rounded-full bg-[#2B1B16] hover:bg-[#C67B3D] disabled:bg-[#777777] text-white font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#2B1B16]/10 flex items-center justify-center space-x-2"
                  >
                    {checkoutStep === 'checking' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Securing Espresso parameters...</span>
                      </>
                    ) : (
                      <span>Place Digital Order • ${ (cartSubtotal * 1.08).toFixed(2) }</span>
                    )}
                  </button>
                </div>
              )}

              {/* checkout screen success overlay state */}
              <AnimatePresence>
                {checkoutStep === 'success' && (
                  <motion.div
                    id="checkout-success-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#FFFDF9] z-50 flex flex-col items-center justify-center p-8 text-center overflow-hidden"
                  >
                    {isFirstCheckout && <CheckoutConfetti />}

                    <motion.div
                      initial={{ scale: 0.6, rotate: -15, zIndex: 20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-16 h-16 rounded-full bg-[#C67B3D] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#C67B3D]/20 z-20"
                    >
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </motion.div>
                    <h3 className="font-serif italic font-extrabold text-[#2B1B16] text-2xl z-20">
                      Veloura Confirmed
                    </h3>
                    
                    {isFirstCheckout && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mt-2 px-3 py-1 bg-[#C67B3D]/10 rounded-full border border-[#C67B3D]/25 relative z-20"
                      >
                        <span className="font-mono text-[9px] text-[#C67B3D] uppercase font-extrabold tracking-widest flex items-center justify-center gap-1">
                          🎉 First-Order Celebration
                        </span>
                      </motion.div>
                    )}

                    <p className="font-mono text-[10px] text-[#C67B3D] font-bold uppercase tracking-widest mt-2 z-20">
                      Token #VEL-986D
                    </p>
                    <p className="font-sans text-xs text-[#777777] mt-4 max-w-xs leading-relaxed relative z-20">
                      Your premium barista team has been notified. Handcrafted creation is underway using organic single-origin beans. Expect your gourmet drink in 12 minutes!
                    </p>

                    <div className="w-full bg-[#F7F3EE] p-4 rounded-2xl border border-[#E7C9B2]/30 my-6 text-left relative z-20">
                      <p className="font-mono text-[10px] text-[#C67B3D] uppercase tracking-wider font-bold mb-2">Preparation timeline</p>
                      <div className="space-y-2 font-sans text-xs">
                        <div className="flex justify-between text-[#1B1B1B]">
                          <span>• Water extraction profiles calibrated</span>
                          <span className="font-semibold text-green-600">Complete</span>
                        </div>
                        <div className="flex justify-between text-[#1B1B1B]">
                          <span>• Madagascar Sweet cream froth</span>
                          <span className="font-semibold text-[#C67B3D] animate-pulse">Blending</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id="close-success-dialog-btn"
                      onClick={handleCloseSuccess}
                      className="px-8 py-3 rounded-full bg-[#2B1B16] hover:bg-[#6B3E26] text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors shadow-md relative z-20"
                    >
                      Done & Back to Café
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
