/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CoffeeProvider } from '../src/context/CoffeeContext';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import FeaturedDrinks from '../src/components/FeaturedDrinks';
import DrinkCustomizer from '../src/components/DrinkCustomizer';
import AboutSection from '../src/components/AboutSection';
import CustomerReviews from '../src/components/CustomerReviews';
import MobileAppSection from '../src/components/MobileAppSection';
import Footer from '../src/components/Footer';
import CinemaIntro from '../src/components/CinemaIntro';
import ScrollToTop from '../src/components/ScrollToTop';
import ScrollProgress from '../src/components/ScrollProgress';
import SensoryCinema from '../src/components/SensoryCinema';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Set body class to lock scroll during Intro state
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  return (
    <CoffeeProvider>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="cinema-intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#DFD3C6]"
          >
            <CinemaIntro onExplore={() => setShowIntro(false)} />
          </motion.div>
        ) : (
          <motion.div
            id="veloura-layout-root"
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Sticky Top-level Navbar */}
            <Navbar />

            {/* Central Sections content */}
            <main className="flex-grow">
              
              {/* Home / Hero Intro */}
              <Hero />

              {/* Signature Recipes Grid List */}
              <FeaturedDrinks />

              {/* Artisan Customizer Laboratory Dashboard */}
              <DrinkCustomizer />

              {/* Sensorial Interactive Video Experience */}
              <SensoryCinema />

              {/* Philosophical Sustainability About block */}
              <AboutSection />

              {/* Guest Testimonials Experience section */}
              <CustomerReviews />

              {/* Digital Star Rewards Club Phone Interface */}
              <MobileAppSection />

            </main>

            {/* Premium Minimal Footer Contact Details */}
            <Footer />

            {/* Subtle Scroll to Top Navigation */}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </CoffeeProvider>
  );
}
