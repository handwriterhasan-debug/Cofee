/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  rating: number;
  category: 'Cold Brew' | 'Espresso' | 'Specialty' | 'Iced';
  image: string;
  badge?: string;
}

export interface CustomizeOptions {
  size: 'Regular' | 'Grande' | 'Velvet XL';
  milk: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Coconut Milk' | 'No Milk';
  sweetener: 'None' | 'Caramel Drizzle' | 'Vanilla Bean' | 'Brown Sugar Syrup' | 'Classic Cane';
  iceLevel: 'None' | 'Light' | 'Regular' | 'Extra Ice';
  sugarLevel: '0%' | '30%' | '50%' | '100%';
  extraShot: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (diff options of same drink = diff items)
  drink: Drink;
  quantity: number;
  customizations: CustomizeOptions;
  finalPrice: number;
}
