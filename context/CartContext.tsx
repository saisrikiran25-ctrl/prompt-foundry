
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { db } from '../services/database';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const { showToast } = useToast();

  // 1. On Mount: Load from DB (if user) or LocalStorage (if guest)
  useEffect(() => {
    const loadCart = async () => {
        if (user) {
            // Load DB Cart
            const dbCart = await db.cart.get(user.uid);
            // Check for guest items to merge
            const guestCartStr = localStorage.getItem('pf_guest_cart');
            if (guestCartStr) {
                const guestItems: CartItem[] = JSON.parse(guestCartStr);
                // Simple merge logic: Guest items overwrite DB items if duplicates, otherwise add
                const mergedMap = new Map();
                [...dbCart, ...guestItems].forEach(item => mergedMap.set(item.id, item));
                const mergedItems = Array.from(mergedMap.values());
                
                setItems(mergedItems);
                await db.cart.save(user.uid, mergedItems);
                localStorage.removeItem('pf_guest_cart'); // Clear guest cart
            } else {
                setItems(dbCart);
            }
        } else {
            // Load Guest Cart
            const storedCart = localStorage.getItem('pf_guest_cart');
            if (storedCart) {
                setItems(JSON.parse(storedCart));
            }
        }
    };
    loadCart();
  }, [user]);

  // 2. Persistence: Save to DB (if user) or LocalStorage (if guest) on every change
  useEffect(() => {
    if (user) {
        db.cart.save(user.uid, items);
    } else {
        localStorage.setItem('pf_guest_cart', JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Increased quantity of ${product.name}`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`${product.name} added to cart`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    setItems((prev) => 
        prev.map((item) => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
