import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, DEMO_USER } from '../data/bearStoreData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: UserProfile;
  activeTab: 'shop' | 'tracker' | 'dashboard' | 'admin';
  setActiveTab: (tab: 'shop' | 'tracker' | 'dashboard' | 'admin') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPromptVaultOpen: boolean;
  setIsPromptVaultOpen: (open: boolean) => void;
  isSeoInspectorOpen: boolean;
  setIsSeoInspectorOpen: (open: boolean) => void;
  reviewModalProduct: Product | null;
  setReviewModalProduct: (product: Product | null) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, customEmbroidery?: string, giftWrap?: boolean) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders & Tracking
  placeOrder: (order: Order) => void;
  updateOrderStage: (orderId: string, stageIndex: number) => void;
  simulateOrderProgression: (orderId: string) => void;
  isSimulatingTracker: boolean;

  // Product & Inventory actions
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => void;
  updateProduct: (product: Product) => void;
  adjustStock: (productId: string, amount: number) => void;
  deleteProduct: (productId: string) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  voteHelpful: (productId: string, reviewId: string) => void;
  redeemHoneyPoints: (points: number, rewardTitle: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ursus_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ursus_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ursus_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['bear-001', 'bear-004'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ursus_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // User
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ursus_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEMO_USER;
  });

  // Navigation and Modals state
  const [activeTab, setActiveTab] = useState<'shop' | 'tracker' | 'dashboard' | 'admin'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPromptVaultOpen, setIsPromptVaultOpen] = useState(false);
  const [isSeoInspectorOpen, setIsSeoInspectorOpen] = useState(false);
  const [reviewModalProduct, setReviewModalProduct] = useState<Product | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('URS-849201');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [isSimulatingTracker, setIsSimulatingTracker] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ursus_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ursus_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ursus_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ursus_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ursus_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3800);
  };

  const addToCart = (product: Product, quantity = 1, customEmbroidery?: string, giftWrap = false) => {
    if (product.stockCount <= 0) {
      showToast(`${product.name} is currently out of stock.`, 'warning');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.customEmbroidery === customEmbroidery && item.giftWrap === giftWrap
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, product.stockCount);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stockCount), customEmbroidery, giftWrap }];
      }
    });

    showToast(`Added ${product.name} to your adoption bag!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const max = item.product.stockCount || 99;
          return { ...item, quantity: Math.min(quantity, max) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from adoption bag', 'info');
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.customEmbroidery) itemPrice += 15; // custom embroidery fee
    if (item.giftWrap) itemPrice += 8; // gift wrap
    return acc + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const targetProduct = products.find(p => p.id === productId);
      if (exists) {
        showToast(`Removed ${targetProduct?.name || 'bear'} from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved ${targetProduct?.name || 'bear'} to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const placeOrder = (newOrder: Order) => {
    // Deduct stock from products
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const matchedCartItem = newOrder.items.find(i => i.product.id === p.id);
        if (matchedCartItem) {
          const updatedStock = Math.max(0, p.stockCount - matchedCartItem.quantity);
          return {
            ...p,
            stockCount: updatedStock,
            inStock: updatedStock > 0,
          };
        }
        return p;
      })
    );

    // Add to orders list at front
    setOrders(prev => [newOrder, ...prev]);

    // Reward user with Honey Points (1 point per $1 spent)
    const earnedPoints = Math.floor(newOrder.payment.total);
    setUser(prev => ({
      ...prev,
      honeyPoints: prev.honeyPoints + earnedPoints,
    }));

    // Clear cart
    clearCart();
    setActiveTrackingOrderId(newOrder.id);
    setActiveTab('tracker');
    showToast(`Order #${newOrder.id} confirmed! Live courier tracking activated.`, 'success');
  };

  const updateOrderStage = (orderId: string, stageIndex: number) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        const validIndex = Math.min(Math.max(0, stageIndex), o.tracking.stages.length - 1);
        const updatedStages = o.tracking.stages.map((stage, idx) => ({
          ...stage,
          completed: idx < validIndex || (idx === validIndex && validIndex === o.tracking.stages.length - 1),
          current: idx === validIndex && validIndex < o.tracking.stages.length - 1,
        }));

        let newStatusNote = o.tracking.courier.statusNote;
        let newDistance = o.tracking.courier.currentDistanceMiles;
        let newEta = o.tracking.courier.etaMinutes;

        if (validIndex === 0) {
          newStatusNote = 'Order received and being queued.';
          newDistance = 14.5;
          newEta = 180;
        } else if (validIndex === 1) {
          newStatusNote = 'Master artisan is handcrafting joints and stitching mohair.';
          newDistance = 12.0;
          newEta = 120;
        } else if (validIndex === 2) {
          newStatusNote = 'Bear is being fluffed, ribboned, and packed into embossed wood crate.';
          newDistance = 8.5;
          newEta = 75;
        } else if (validIndex === 3) {
          newStatusNote = 'Package loaded on delivery van. En route to regional depot.';
          newDistance = 5.2;
          newEta = 45;
        } else if (validIndex === 4) {
          newStatusNote = 'Barnaby has your bear safely buckled up. Out for delivery!';
          newDistance = 1.8;
          newEta = 25;
        } else if (validIndex === 5) {
          newStatusNote = 'Package safely delivered to doorstep! Enjoy your new companion.';
          newDistance = 0;
          newEta = 0;
        }

        return {
          ...o,
          tracking: {
            ...o.tracking,
            currentStageIndex: validIndex,
            stages: updatedStages,
            courier: {
              ...o.tracking.courier,
              statusNote: newStatusNote,
              currentDistanceMiles: newDistance,
              etaMinutes: newEta,
            },
          },
        };
      })
    );
  };

  const simulateOrderProgression = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;
    if (isSimulatingTracker) return;

    setIsSimulatingTracker(true);
    showToast('Starting real-time live fulfillment simulation...', 'info');

    let current = targetOrder.tracking.currentStageIndex;
    const interval = setInterval(() => {
      if (current >= 5) {
        clearInterval(interval);
        setIsSimulatingTracker(false);
        showToast('Order delivered successfully!', 'success');
      } else {
        current += 1;
        updateOrderStage(orderId, current);
        showToast(`Tracking status updated: Stage ${current + 1}/6`, 'info');
      }
    }, 3200);
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `bear-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      reviewsCount: 0,
      reviews: [],
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added ${newProduct.name} to the atelier inventory!`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`Updated product details for ${updated.name}`, 'success');
  };

  const adjustStock = (productId: string, amount: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const newStock = Math.max(0, p.stockCount + amount);
        return {
          ...p,
          stockCount: newStock,
          inStock: newStock > 0,
        };
      })
    );
    showToast('Stock quantity updated', 'info');
  };

  const deleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProduct?.id === productId) setSelectedProduct(null);
    showToast(`Deleted ${product?.name || 'product'} from catalog`, 'info');
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
      userVotedHelpful: false,
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const updatedReviews = [newReview, ...p.reviews];
        const newAvg = (
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        ).toFixed(2);
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: parseFloat(newAvg),
        };
      })
    );

    // Also update selected product if open
    setSelectedProduct(prev => {
      if (prev && prev.id === productId) {
        const updatedReviews = [newReview, ...prev.reviews];
        const newAvg = (
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        ).toFixed(2);
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: parseFloat(newAvg),
        };
      }
      return prev;
    });

    showToast('Thank you for sharing your review with the atelier!', 'success');
  };

  const voteHelpful = (productId: string, reviewId: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        return {
          ...p,
          reviews: p.reviews.map(r => {
            if (r.id !== reviewId) return r;
            const voted = r.userVotedHelpful;
            return {
              ...r,
              helpfulCount: voted ? r.helpfulCount - 1 : r.helpfulCount + 1,
              userVotedHelpful: !voted,
            };
          }),
        };
      })
    );
  };

  const redeemHoneyPoints = (points: number, rewardTitle: string) => {
    if (user.honeyPoints < points) {
      showToast('Not enough Honey Points for this reward', 'warning');
      return;
    }
    setUser(prev => ({
      ...prev,
      honeyPoints: prev.honeyPoints - points,
    }));
    showToast(`Redeemed "${rewardTitle}"! Applied to your account.`, 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        user,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPromptVaultOpen,
        setIsPromptVaultOpen,
        isSeoInspectorOpen,
        setIsSeoInspectorOpen,
        reviewModalProduct,
        setReviewModalProduct,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        toast,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStage,
        simulateOrderProgression,
        isSimulatingTracker,
        addProduct,
        updateProduct,
        adjustStock,
        deleteProduct,
        addReview,
        voteHelpful,
        redeemHoneyPoints,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
