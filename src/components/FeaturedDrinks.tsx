/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCoffee, DEFAULT_CUSTOMIZATIONS } from '../context/CoffeeContext';
import { SIGNATURE_DRINKS } from '../data';
import { Sparkles, ShoppingBag, SlidersHorizontal, Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Drink } from '../types';

export default function FeaturedDrinks() {
  const { addToCart, setSelectedDrinkForCustomizer } = useCoffee();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cold Brew' | 'Espresso' | 'Specialty' | 'Iced'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedPopup, setAddedPopup] = useState<string | null>(null);

  const categories: ('All' | 'Cold Brew' | 'Espresso' | 'Specialty' | 'Iced')[] = [
    'All',
    'Espresso',
    'Cold Brew',
    'Specialty',
    'Iced'
  ];

  const filteredDrinks = SIGNATURE_DRINKS.filter(drink => {
    if (activeCategory === 'All') return true;
    return drink.category === activeCategory;
  });

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleQuickAdd = (drink: Drink, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(drink, DEFAULT_CUSTOMIZATIONS, drink.price, 1);
    
    setAddedPopup(drink.id);
    setTimeout(() => {
      setAddedPopup(null);
    }, 2000);
  };

  const handleOpenInCustomizer = (drink: Drink) => {
    setSelectedDrinkForCustomizer(drink);
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#FFFDF9] relative overflow-hidden">
      {/* Structural abstract layouts */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7F3EE] rounded-bl-full pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E7C9B2]/10 rounded-tr-full pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C67B3D] font-extrabold flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Signature Menu</span>
          </p>
          <h3 className="font-serif italic font-extrabold text-[#2B1B16] text-3xl sm:text-4xl leading-tight">
            Curated Artisan Drinks
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed font-semibold">
            Explore our eight meticulously crafted signature beverages, formulated with single-origin beans, house sweet milk formulas, and cold-pressed elixirs.
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div id="category-tabs" className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto mb-16 px-4 py-1.5 bg-[#F7F3EE] rounded-full border border-[#E7C9B2]/20">
          {categories.map((cat) => (
            <button
              id={`filter-tab-${cat}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#2B1B16] text-white shadow-md'
                  : 'text-[#777777] hover:text-[#1B1B1B] hover:bg-white/40'
              }`}
            >
              {cat === 'All' ? 'All Recipes' : cat}
            </button>
          ))}
        </div>

        {/* Drinks Grid layout */}
        <motion.div
          id="drinks-grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDrinks.map((drink) => (
              <motion.div
                id={`product-card-${drink.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={drink.id}
                className="bg-[#FFFDF9] rounded-3xl border border-[#E7C9B2]/20 shadow-xs hover:shadow-xl transition-all duration-350 overflow-hidden flex flex-col group relative"
              >
                {/* Heart/Favorite Button */}
                <button
                  id={`favorite-btn-${drink.id}`}
                  onClick={() => toggleFavorite(drink.id)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#777777] hover:text-red-500 transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      favorites.includes(drink.id) ? 'fill-red-500 stroke-red-500' : ''
                    }`}
                  />
                </button>

                {/* Badge if present */}
                {drink.badge && (
                  <span className="absolute top-4 left-4 z-20 font-mono text-[8px] uppercase tracking-widest font-extrabold bg-[#C67B3D] text-[#FFFDF9] px-2.5 py-1 rounded-full shadow-xs">
                    {drink.badge}
                  </span>
                )}

                {/* Product Image Panel */}
                <div
                  id={`drink-img-frame-${drink.id}`}
                  onClick={() => handleOpenInCustomizer(drink)}
                  className="relative h-64 overflow-hidden bg-[#F7F3EE] cursor-pointer"
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle details strip */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B16]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="bg-[#FFFDF9] text-[#2B1B16] text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-md flex items-center space-x-1.5">
                      <SlidersHorizontal className="w-3 h-3 text-[#C67B3D]" />
                      <span>Artisan Customizer</span>
                    </span>
                  </div>
                </div>

                {/* Product card lower content */}
                <div id={`drink-details-${drink.id}`} className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category specification */}
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#C67B3D] uppercase tracking-wider">
                      <span>{drink.category}</span>
                      <div className="flex items-center space-x-1 text-[#C67B3D]">
                        <Star className="w-3.5 h-3.5 fill-[#C67B3D]" />
                        <span>{drink.rating}</span>
                      </div>
                    </div>

                    {/* Drink Name */}
                    <h4
                      onClick={() => handleOpenInCustomizer(drink)}
                      className="font-serif italic font-extrabold text-[#2B1B16] text-lg hover:text-[#6B3E26] cursor-pointer transition-colors mt-2"
                    >
                      {drink.name}
                    </h4>

                    {/* Drink description specs */}
                    <p className="font-sans text-xs text-[#777777] line-clamp-3 leading-relaxed mt-2">
                      {drink.description}
                    </p>

                    {/* Calories metadata */}
                    <span className="inline-block mt-3 font-mono text-[10px] text-[#777777] font-medium bg-[#F7F3EE] px-2.5 py-0.5 rounded-md">
                      {drink.calories} Cal
                    </span>
                  </div>

                  {/* Pricing and CTAs */}
                  <div className="pt-6 mt-4 border-t border-[#E7C9B2]/10 flex items-center justify-between">
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-widest text-[#777777] font-medium leading-none">Standard Price</span>
                      <span className="font-mono text-base font-bold text-[#2B1B16] mt-1 inline-block">
                        ${drink.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Double CTA layout */}
                    <div className="flex items-center space-x-2">
                      <button
                        id={`quick-add-${drink.id}`}
                        onClick={(e) => handleQuickAdd(drink, e)}
                        className="p-2.5 rounded-full bg-[#2B1B16] hover:bg-[#6B3E26] text-white transition-all shadow-xs relative"
                        aria-label="Quick Add Standard Recipe"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        
                        {/* Interactive Add success indicator */}
                        <AnimatePresence>
                          {addedPopup === drink.id && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: -20 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C67B3D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
                            >
                              Added!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Secondary banner info below catalog */}
        <div id="additional-blend-spotlight" className="mt-16 bg-[#F7F3EE] rounded-3xl p-8 border border-[#E7C9B2]/20 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:max-w-xl">
            <h5 className="font-serif italic text-xl font-extrabold text-[#2B1B16]">
              Looking for our Custom Slow Drips?
            </h5>
            <p className="font-sans text-xs text-[#777777] mt-2 mb-4 md:mb-0 max-w-lg font-medium leading-relaxed">
              We roast micro-lots on rotation. Ask our roastery counter directly or jump straight into designing your custom size, double espresso shot parameters, and milk milkings below.
            </p>
          </div>
          <button
            id="jump-to-customizer-btn"
            onClick={() => {
              const el = document.getElementById('customizer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#6B3E26]/5 text-[#2B1B16] border border-[#E7C9B2]/40 font-sans text-xs font-bold tracking-widest uppercase transition-colors shrink-0"
          >
            Open Recipe Board
          </button>
        </div>

      </div>
    </section>
  );
}
