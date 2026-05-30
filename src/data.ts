/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Drink } from './types';

export const SIGNATURE_DRINKS: Drink[] = [
  {
    id: 'veloura-01',
    name: 'Iced Caramel Latte',
    description: 'Double shot of signature Reserve espresso layered over cold organic oat milk, finished with buttery house-made slow-simmered caramel drizzle.',
    price: 6.25,
    calories: 190,
    rating: 4.9,
    category: 'Iced',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=800',
    badge: 'Popular'
  },
  {
    id: 'veloura-02',
    name: 'Vanilla Cream Cold Brew',
    description: 'Slow-steeped single-origin micro-lot beans for 20 hours, topped with a velvety crown of house-whipped Madagascar vanilla bean sweet cream.',
    price: 5.75,
    calories: 110,
    rating: 4.8,
    category: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    badge: 'Signature'
  },
  {
    id: 'veloura-03',
    name: 'Mocha Frappe Custom',
    description: 'Blended organic espresso, rich Venezuelan dark cocoa, and fresh whole milk, crowned with dark chocolate curls and a micro-foam canopy.',
    price: 6.50,
    calories: 320,
    rating: 4.7,
    category: 'Iced',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    badge: 'Classic'
  },
  {
    id: 'veloura-04',
    name: 'Matcha Espresso Fusion',
    description: 'Vibrant layers of stone-ground Uji matcha green tea, organic almond milk, finished with a suspended float of bold espresso ristretto.',
    price: 6.75,
    calories: 150,
    rating: 4.95,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800',
    badge: 'Organic'
  },
  {
    id: 'veloura-05',
    name: 'Velvet White Chocolate Latte',
    description: 'Silky espresso macchiato infused with organic white chocolate, steamed microfoam, dusted with flakes of luxury gold chocolate.',
    price: 5.95,
    calories: 240,
    rating: 4.8,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    badge: 'Artisan'
  },
  {
    id: 'veloura-06',
    name: 'Brown Sugar Boba Brew',
    description: 'Slow-cooked muscovado sugar tapioca pearls, steeped in a delicate milk tea espresso draft and topped with organic cold sweet milk.',
    price: 6.50,
    calories: 280,
    rating: 4.9,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=800',
    badge: 'Trending'
  },
  {
    id: 'veloura-07',
    name: 'Strawberry Cream Latte',
    description: 'Muddled fresh organic wild strawberries and house cane syrup, layered with chilled creamy whole milk and an organic single-origin lighter roast float.',
    price: 6.25,
    calories: 170,
    rating: 4.85,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&q=80&w=800',
    badge: 'Seasonal'
  },
  {
    id: 'veloura-08',
    name: 'Salted Caramel Macchiato',
    description: 'Freshly steamed whole milk marked with a bold ristretto shot of our premium espresso blend, finished with a grid of sea-salted caramel drizzle.',
    price: 6.00,
    calories: 220,
    rating: 4.9,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=800',
    badge: 'Popular'
  }
];

export const SUSTAINABILITY_PILLARS = [
  {
    title: '100% Traceable',
    description: 'We source exclusively from certified family co-ops and single estates in Antigua, Ethiopia, and Sumatra. Every bean has a name, a farm, and a story.'
  },
  {
    title: 'Carbon-Neutral Crafting',
    description: 'From energy-efficient electric drum roasters to fully biodegradable water-soluble takeaway cups, our ecological footprint is precisely offset to zero.'
  },
  {
    title: 'Artisan Water Profiles',
    description: 'We utilize state-of-the-art reverse osmosis minerals infusion to dial water TDS levels to exactly 150ppm, extracting perfect espresso parameters.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'review-1',
    name: 'Alexander Sterling',
    role: 'Creative Director, London',
    rating: 5,
    comment: 'Veloura Cafe is the Apple of visual coffee experiences. The Matcha Espresso Fusion is absolute perfection—perfectly balanced layers and pristine flavor notes.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'review-2',
    name: 'Elena Rostova',
    role: 'Gastronomy Journalist',
    rating: 5,
    comment: 'The Vanilla Cream Cold Brew is an industrial benchmark. The Madagascar cold foam is velvety, dense, and holds its structure beautifully over thirty minutes of sipping.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'review-3',
    name: 'Kenji Takahashi',
    role: 'Architect & Espresso Enthusiast',
    rating: 5,
    comment: 'Their customizer allowed me to tune extra shots and adjust sweetness dynamically. Exceptional UX design mirrored by impeccable double ristretto extractions.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  }
];
