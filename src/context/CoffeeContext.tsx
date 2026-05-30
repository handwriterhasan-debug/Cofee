/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Drink, CartItem, CustomizeOptions } from '../types';
import { SIGNATURE_DRINKS } from '../data';

interface CoffeeContextType {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedDrinkForCustomizer: Drink;
  setSelectedDrinkForCustomizer: (drink: Drink) => void;
  addToCart: (drink: Drink, opts: CustomizeOptions, finalPrice: number, qty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const DEFAULT_CUSTOMIZATIONS: CustomizeOptions = {
  size: 'Regular',
  milk: 'Whole Milk',
  sweetener: 'None',
  iceLevel: 'Regular',
  sugarLevel: '50%',
  extraShot: false
};

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDrinkForCustomizer, setSelectedDrinkForCustomizer] = useState<Drink>(SIGNATURE_DRINKS[0]);

  // Load cart from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('veloura_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to restore Veloura Café Cart', e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('veloura_cart', JSON.stringify(newCart));
  };

  const addToCart = (drink: Drink, opts: CustomizeOptions, finalPrice: number, qty: number) => {
    // Generate an ID based on customizations to group identical designs together!
    const customKey = `${drink.id}-${opts.size}-${opts.milk}-${opts.sweetener}-${opts.iceLevel}-${opts.sugarLevel}-${opts.extraShot ? 'shot' : 'noshot'}`;
    
    const existingIndex = cart.findIndex(item => item.id === customKey);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: customKey,
        drink,
        quantity: qty,
        customizations: opts,
        finalPrice
      };
      saveCart([...cart, newItem]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    const updated = cart.filter(item => item.id !== cartItemId);
    saveCart(updated);
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updated = cart.map(item => {
      if (item.id === cartItemId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CoffeeContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      selectedDrinkForCustomizer,
      setSelectedDrinkForCustomizer,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used inside a CoffeeProvider');
  }
  return context;
}
