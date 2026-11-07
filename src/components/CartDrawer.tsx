import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Scissors, Gift } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const estimatedHoneyPoints = Math.floor(cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl border-l border-[#E8DFC8] flex flex-col transform transition-transform duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9C5B16]" />
            <h2 className="text-lg font-display font-semibold text-[#2C241E]">
              Your Adoption Bag
            </h2>
            <span className="text-xs text-[#7A6C5F]">({cart.length} unique items)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#7A6C5F] hover:text-[#2C241E] rounded-md transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-b border-[#E8DFC8]/60 text-xs">
          <div className="flex justify-between items-center mb-1.5 font-medium text-[#5C4F44]">
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong className="text-[#9C5B16]">${remainingForFreeShipping.toFixed(2)}</strong> for free priority delivery</span>
            ) : (
              <span className="text-[#366B40] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Unlocked complimentary priority delivery!
              </span>
            )}
            <span className="tabular-nums font-semibold">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-[#E8DFC8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9C5B16] rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-[#7A6C5F]">
              <div className="text-4xl mb-3">🧸</div>
              <p className="text-sm font-semibold text-[#2C241E]">Your adoption bag is empty</p>
              <p className="text-xs text-[#7A6C5F] mt-1">Our handcrafted bears are waiting for a cozy home.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg transition-colors cursor-pointer"
              >
                Explore the Atelier
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const itemUnitPrice =
                item.product.price +
                (item.customEmbroidery ? 15 : 0) +
                (item.giftWrap ? 8 : 0);
              const itemTotal = itemUnitPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${index}`}
                  className="p-3.5 bg-white rounded-xl border border-[#E8DFC8] flex gap-3.5 shadow-xs"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-[#F4EFEA] border border-[#E8DFC8]/60 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#2C241E] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#A39688] hover:text-[#B91C1C] transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-[#9C5B16] font-semibold tabular-nums mt-0.5">
                        ${itemUnitPrice.toFixed(2)}
                      </div>

                      {/* Custom Embroidery note */}
                      {item.customEmbroidery && (
                        <div className="flex items-center gap-1 text-[11px] text-[#7A6C5F] mt-1">
                          <Scissors className="w-3 h-3 text-[#9C5B16]" />
                          <span>Paw: "{item.customEmbroidery}" (+$15)</span>
                        </div>
                      )}

                      {/* Gift Wrap note */}
                      {item.giftWrap && (
                        <div className="flex items-center gap-1 text-[11px] text-[#7A6C5F] mt-0.5">
                          <Gift className="w-3 h-3 text-[#9C5B16]" />
                          <span>Ribbon box wrapped (+$8)</span>
                        </div>
                      )}
                    </div>

                    {/* Stepper & Total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF8F5]">
                      <div className="flex items-center border border-[#E8DFC8] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-[#2C241E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#2C241E] tabular-nums">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFC8] bg-[#F4EFEA]/80 space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C4F44]">
              <div className="flex justify-between">
                <span>Adoption Subtotal</span>
                <span className="font-semibold tabular-nums text-[#2C241E]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#7A6C5F]">
                <span>Estimated Honey Points earned</span>
                <span className="text-[#9C5B16] font-semibold tabular-nums">+{estimatedHoneyPoints} pts</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#7A6C5F]">
                <span>Shipping &amp; Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <span>Secure Adoption Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6C5F]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#366B40]" />
              <span>256-Bit SSL Encrypted Checkout · 30-Day Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
