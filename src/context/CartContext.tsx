import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  createCart,
  addCartLine,
  updateCartLine,
  removeCartLine,
  fetchCart,
  type ShopifyCart,
} from '../lib/shopify';

const CART_ID_STORAGE_KEY = 'climatpro_cart_id';

interface CartContextValue {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isOpen: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rehydrate an existing cart on load (carts persist ~10 days on Shopify's side)
  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (!storedId) return;
    fetchCart(storedId)
      .then((existing) => {
        if (existing) setCart(existing);
        else localStorage.removeItem(CART_ID_STORAGE_KEY);
      })
      .catch(() => localStorage.removeItem(CART_ID_STORAGE_KEY));
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        let updated: ShopifyCart;
        if (cart?.id) {
          updated = await addCartLine(cart.id, variantId, quantity);
        } else {
          updated = await createCart(variantId, quantity);
          localStorage.setItem(CART_ID_STORAGE_KEY, updated.id);
        }
        setCart(updated);
        setIsOpen(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not add item to cart');
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const updated =
          quantity <= 0 ? await removeCartLine(cart.id, lineId) : await updateCartLine(cart.id, lineId, quantity);
        setCart(updated);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not update cart');
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const updated = await removeCartLine(cart.id, lineId);
        setCart(updated);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not remove item');
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const itemCount = cart?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        error,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        updateQuantity,
        removeLine,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
