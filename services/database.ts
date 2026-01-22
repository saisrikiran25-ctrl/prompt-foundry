
import { User, Order, CartItem } from '../types';

/**
 * DATABASE SERVICE LAYER
 * ----------------------
 * Acts as a strict facade for data persistence.
 * Mimics Firebase Firestore architecture using LocalStorage for "Up and Running" reliability without keys.
 */

const STORAGE_KEYS = {
  USERS: 'pf_db_users', // Table: Users
  ORDERS: 'pf_db_orders', // Table: Orders
  CARTS: 'pf_db_carts', // Table: Carts (User specific)
  SESSION: 'pf_session' // Session Token
};

const DELAY = 1500; // Increased latency to simulate Stripe Backend verification

// Helper to read table
const getTable = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper to write table
const saveTable = (key: string, data: any[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  auth: {
    async login(email: string): Promise<User> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = getTable<User>(STORAGE_KEYS.USERS);
          const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          
          if (user) {
            localStorage.setItem(STORAGE_KEYS.SESSION, user.uid);
            resolve(user);
          } else {
            reject(new Error('Invalid email or password.'));
          }
        }, 800);
      });
    },

    async register(email: string, displayName: string): Promise<User> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = getTable<User>(STORAGE_KEYS.USERS);
          if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            reject(new Error('User already exists with this email.'));
            return;
          }

          const newUser: User = {
            uid: `usr_${Math.random().toString(36).substr(2, 9)}`,
            email,
            displayName,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=38bdf8&color=0f172a`,
            purchasedPrompts: [],
            createdAt: new Date().toISOString(),
            role: 'user'
          };

          users.push(newUser);
          saveTable(STORAGE_KEYS.USERS, users);
          localStorage.setItem(STORAGE_KEYS.SESSION, newUser.uid);
          resolve(newUser);
        }, 800);
      });
    },

    async logout(): Promise<void> {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      return Promise.resolve();
    },

    async getSession(): Promise<User | null> {
      const uid = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!uid) return null;
      const users = getTable<User>(STORAGE_KEYS.USERS);
      return users.find(u => u.uid === uid) || null;
    }
  },

  cart: {
    async get(userId: string): Promise<CartItem[]> {
        const allCarts = getTable<{userId: string, items: CartItem[]}>(STORAGE_KEYS.CARTS);
        return allCarts.find(c => c.userId === userId)?.items || [];
    },

    async save(userId: string, items: CartItem[]): Promise<void> {
        let allCarts = getTable<{userId: string, items: CartItem[]}>(STORAGE_KEYS.CARTS);
        const existingIndex = allCarts.findIndex(c => c.userId === userId);
        
        if (existingIndex >= 0) {
            allCarts[existingIndex].items = items;
        } else {
            allCarts.push({ userId, items });
        }
        saveTable(STORAGE_KEYS.CARTS, allCarts);
    }
  },

  orders: {
    // UPDATED: Removed stripePaymentId dependency
    async create(userId: string, items: CartItem[], total: number): Promise<Order> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = getTable<Order>(STORAGE_KEYS.ORDERS);
                const newOrder: Order = {
                    id: `ord_${Math.random().toString(36).substr(2, 9)}`,
                    userId,
                    items,
                    total,
                    date: new Date().toISOString(),
                    status: 'completed'
                };
                
                orders.unshift(newOrder); // Add to top
                saveTable(STORAGE_KEYS.ORDERS, orders);

                // Update User's Purchased Prompts
                const users = getTable<User>(STORAGE_KEYS.USERS);
                const userIndex = users.findIndex(u => u.uid === userId);
                if (userIndex >= 0) {
                    const newIds = items.map(i => i.id);
                    // Add unique IDs
                    users[userIndex].purchasedPrompts = Array.from(new Set([...users[userIndex].purchasedPrompts, ...newIds]));
                    saveTable(STORAGE_KEYS.USERS, users);
                }

                resolve(newOrder);
            }, DELAY);
        });
    },

    async getHistory(userId: string): Promise<Order[]> {
        const orders = getTable<Order>(STORAGE_KEYS.ORDERS);
        return orders.filter(o => o.userId === userId);
    }
  }
};