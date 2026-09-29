
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
const RESOURCE_UNLOCK_DELAY = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

const parseJsonSafely = <T>(value: string | null, fallback: T, key: string): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Invalid data found for storage key "${key}". Resetting key.`, error);
    localStorage.removeItem(key);
    return fallback;
  }
};

// Helper to read table
const getTable = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  const parsed = parseJsonSafely<unknown>(data, [], key);
  if (!Array.isArray(parsed)) {
    localStorage.removeItem(key);
    return [];
  }
  return parsed as T[];
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
            pendingPrompts: [], // Initialize for new users
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
      const user = users.find(u => u.uid === uid);
      
      // Ensure backward compatibility - initialize pendingPrompts if missing
      if (user && !user.pendingPrompts) {
        user.pendingPrompts = [];
      }
      
      return user || null;
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
    // UPDATED: Create order with pending status and 3-hour delay
    async create(userId: string, items: CartItem[], total: number): Promise<Order> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = getTable<Order>(STORAGE_KEYS.ORDERS);
                const purchaseTime = new Date();
                const resourcesAvailableTime = new Date(purchaseTime.getTime() + RESOURCE_UNLOCK_DELAY);
                
                const newOrder: Order = {
                    id: `ord_${Math.random().toString(36).substr(2, 9)}`,
                    userId,
                    items,
                    total,
                    date: purchaseTime.toISOString(),
                    status: 'pending', // Changed from 'completed' to 'pending'
                    purchaseTimestamp: purchaseTime.toISOString(),
                    resourcesAvailableAt: resourcesAvailableTime.toISOString()
                };
                
                orders.unshift(newOrder); // Add to top
                saveTable(STORAGE_KEYS.ORDERS, orders);

                // Update User's Pending Prompts (not immediately available)
                const users = getTable<User>(STORAGE_KEYS.USERS);
                const userIndex = users.findIndex(u => u.uid === userId);
                if (userIndex >= 0) {
                    const newIds = items.map(i => i.id);
                    // Initialize pendingPrompts if it doesn't exist
                    if (!users[userIndex].pendingPrompts) {
                        users[userIndex].pendingPrompts = [];
                    }
                    // Add unique IDs to pending prompts
                    users[userIndex].pendingPrompts = Array.from(new Set([...users[userIndex].pendingPrompts, ...newIds]));
                    saveTable(STORAGE_KEYS.USERS, users);
                }

                resolve(newOrder);
            }, DELAY);
        });
    },

    async getHistory(userId: string): Promise<Order[]> {
        const orders = getTable<Order>(STORAGE_KEYS.ORDERS);
        return orders.filter(o => o.userId === userId);
    },

    // NEW: Unlock resources for orders where 3 hours have passed
    async unlockResources(userId: string): Promise<void> {
        const orders = getTable<Order>(STORAGE_KEYS.ORDERS);
        const users = getTable<User>(STORAGE_KEYS.USERS);
        const userIndex = users.findIndex(u => u.uid === userId);
        
        if (userIndex < 0) return;
        
        const now = new Date();
        let ordersUpdated = false;
        let resourcesUnlocked: string[] = [];
        
        // Check each pending order
        orders.forEach(order => {
            if (order.userId === userId && order.status === 'pending' && order.resourcesAvailableAt) {
                const availableAt = new Date(order.resourcesAvailableAt);
                
                // If 3 hours have passed, unlock the resources
                if (now >= availableAt) {
                    order.status = 'completed';
                    ordersUpdated = true;
                    resourcesUnlocked.push(...order.items.map(item => item.id));
                }
            }
        });
        
        // Update orders if any were unlocked
        if (ordersUpdated) {
            saveTable(STORAGE_KEYS.ORDERS, orders);
            
            // Move products from pending to purchased
            if (resourcesUnlocked.length > 0) {
                const user = users[userIndex];
                
                // Add to purchasedPrompts
                user.purchasedPrompts = Array.from(new Set([...user.purchasedPrompts, ...resourcesUnlocked]));
                
                // Remove from pendingPrompts
                if (user.pendingPrompts) {
                    user.pendingPrompts = user.pendingPrompts.filter(id => !resourcesUnlocked.includes(id));
                }
                
                saveTable(STORAGE_KEYS.USERS, users);
            }
        }
    }
  }
};