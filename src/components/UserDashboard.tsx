import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Package,
  Heart,
  Sparkles,
  MapPin,
  CreditCard,
  Truck,
  RotateCcw,
  Check,
  Gift,
  ExternalLink,
  ShoppingBag,
  Trash2,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setActiveTab,
    setActiveTrackingOrderId,
    redeemHoneyPoints,
  } = useStore();

  const [currentSection, setCurrentSection] = useState<'orders' | 'wishlist' | 'rewards' | 'addresses'>('orders');

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const rewards = [
    {
      id: 'rw-1',
      title: '$15 Atelier Gift Voucher',
      points: 200,
      description: 'Deduct $15 off your next heirloom bear adoption.',
    },
    {
      id: 'rw-2',
      title: 'Free Hand-Knit Wool Muffler',
      points: 350,
      description: 'Forest green or mustard yellow cable knit scarf shipped complimentary.',
    },
    {
      id: 'rw-3',
      title: 'Priority Master Bench Stitching',
      points: 500,
      description: 'Your bear jumps to bench slot #1 with certified head-artisan signature.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* User Header Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-16 h-16 rounded-full border-2 border-[#9C5B16] bg-[#FAF8F5] p-1 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-[#2C241E]">
                {user.fullName}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#F4EFEA] text-[#9C5B16] border border-[#E8DFC8]">
                {user.honeyTier}
              </span>
            </div>
            <div className="text-xs text-[#7A6C5F] mt-1 flex flex-wrap items-center gap-3">
              <span>{user.email}</span>
              <span aria-hidden="true">·</span>
              <span>Member since 2024</span>
              <span aria-hidden="true">·</span>
              <span>{orders.length} Heirloom Adoptions</span>
            </div>
          </div>
        </div>

        {/* Honey Points Widget */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFC8] min-w-[240px]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs text-[#7A6C5F] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#9C5B16]" />
              Honey Rewards Club
            </span>
            <span className="text-sm font-bold text-[#9C5B16] tabular-nums">
              {user.honeyPoints} pts
            </span>
          </div>

          <div className="w-full bg-[#E8DFC8] h-2 rounded-full overflow-hidden my-1.5">
            <div
              className="bg-[#9C5B16] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (user.honeyPoints / user.nextTierPoints) * 100)}%` }}
            />
          </div>

          <div className="text-[11px] text-[#7A6C5F] flex justify-between">
            <span>Next: Grizzly Master</span>
            <span className="tabular-nums">{user.nextTierPoints - user.honeyPoints} pts to unlock</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-3 mb-8 overflow-x-auto">
        <button
          onClick={() => setCurrentSection('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            currentSection === 'orders'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Adoption History ({orders.length})</span>
        </button>

        <button
          onClick={() => setCurrentSection('wishlist')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            currentSection === 'wishlist'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setCurrentSection('rewards')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            currentSection === 'rewards'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Redeem Perks</span>
        </button>

        <button
          onClick={() => setCurrentSection('addresses')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            currentSection === 'addresses'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Addresses &amp; Wallet</span>
        </button>
      </div>

      {/* Section 1: Orders History */}
      {currentSection === 'orders' && (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF8F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#2C241E]">Order #{order.id}</span>
                    <span className="text-xs text-[#7A6C5F]">· {order.date}</span>
                  </div>
                  <div className="text-xs text-[#7A6C5F] mt-0.5">
                    Tracking: <span className="font-mono text-[#2C241E]">{order.trackingNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold ${
                      order.tracking.currentStageIndex === 5
                        ? 'bg-[#EAF5EC] text-[#366B40]'
                        : 'bg-[#FDF4E7] text-[#9C5B16]'
                    }`}
                  >
                    {order.tracking.currentStageIndex === 5 ? 'Delivered' : 'In Transit (Live)'}
                  </span>

                  <button
                    onClick={() => {
                      setActiveTrackingOrderId(order.id);
                      setActiveTab('tracker');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg transition-colors cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Live</span>
                  </button>
                </div>
              </div>

              {/* Order Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8]/60">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-semibold text-[#2C241E] truncate">{item.product.name}</div>
                      <div className="text-[11px] text-[#7A6C5F]">Qty: {item.quantity} · ${item.product.price}</div>
                      {item.customEmbroidery && (
                        <div className="text-[11px] text-[#9C5B16]">Paw: "{item.customEmbroidery}"</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5C4F44] gap-2 border-t border-[#FAF8F5]">
                <div>
                  Shipped to: <strong>{order.customer.address}, {order.customer.city}</strong> via {order.shippingMethod.name}
                </div>
                <div className="flex items-center gap-3">
                  <span>Paid: <strong className="text-sm font-bold text-[#2C241E] tabular-nums">${order.payment.total.toFixed(2)}</strong></span>
                  <button
                    onClick={() => {
                      order.items.forEach(i => addToCart(i.product, i.quantity));
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#9C5B16] hover:underline font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Adopt Again</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Wishlist */}
      {currentSection === 'wishlist' && (
        <div>
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFC8] p-8">
              <Heart className="w-8 h-8 mx-auto text-[#D8CEBE] mb-2" />
              <h3 className="text-base font-semibold text-[#2C241E]">Your wishlist is waiting</h3>
              <p className="text-xs text-[#7A6C5F] mt-1">Tap the heart on any bear to save it to your wishlist.</p>
              <button
                onClick={() => setActiveTab('shop')}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#2C241E] rounded-lg cursor-pointer"
              >
                Browse Atelier
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E8DFC8] p-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFEA] mb-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#9C5B16] hover:bg-white cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#9C5B16] font-semibold">
                      {product.category}
                    </div>
                    <h4 className="text-sm font-semibold text-[#2C241E] font-display">{product.name}</h4>
                    <div className="text-xs text-[#7A6C5F] line-clamp-1 mt-0.5">{product.subtitle}</div>
                    <div className="text-sm font-bold text-[#2C241E] tabular-nums mt-2">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#FAF8F5] flex gap-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section 3: Honey Rewards */}
      {currentSection === 'rewards' && (
        <div className="space-y-4 max-w-3xl">
          <div className="p-4 bg-[#F4EFEA] rounded-xl border border-[#E8DFC8] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#2C241E]">Your Honey Points Vault</h3>
              <p className="text-xs text-[#7A6C5F]">Earn 1 point per $1 spent on every handcrafted item.</p>
            </div>
            <div className="text-xl font-bold text-[#9C5B16] tabular-nums font-display">
              {user.honeyPoints} Points
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rewards.map(rw => {
              const canRedeem = user.honeyPoints >= rw.points;
              return (
                <div
                  key={rw.id}
                  className="bg-white p-4 rounded-xl border border-[#E8DFC8] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#9C5B16] tabular-nums mb-1">
                      {rw.points} Points
                    </div>
                    <h4 className="text-sm font-bold text-[#2C241E] font-display">{rw.title}</h4>
                    <p className="text-xs text-[#7A6C5F] mt-1 leading-relaxed">{rw.description}</p>
                  </div>

                  <button
                    onClick={() => redeemHoneyPoints(rw.points, rw.title)}
                    disabled={!canRedeem}
                    className={`mt-4 w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      canRedeem
                        ? 'bg-[#2C241E] text-white hover:bg-[#3D332B]'
                        : 'bg-[#E8DFC8] text-[#7A6C5F] cursor-not-allowed'
                    }`}
                  >
                    {canRedeem ? 'Redeem Perk' : 'Insufficient Points'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 4: Addresses & Wallet */}
      {currentSection === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] space-y-3">
            <h3 className="text-sm font-bold text-[#2C241E] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9C5B16]" />
              <span>Saved Shipping Addresses</span>
            </h3>

            {user.savedAddresses.map(addr => (
              <div key={addr.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] text-xs space-y-1">
                <div className="flex justify-between font-semibold text-[#2C241E]">
                  <span>{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] text-[#366B40] bg-[#EAF5EC] px-1.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-[#5C4F44]">{addr.fullName}</div>
                <div className="text-[#7A6C5F]">{addr.address}, {addr.city}, {addr.state} {addr.zipCode}</div>
              </div>
            ))}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] space-y-3">
            <h3 className="text-sm font-bold text-[#2C241E] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#9C5B16]" />
              <span>Saved Payment Methods</span>
            </h3>

            {user.savedPaymentMethods.map(pm => (
              <div key={pm.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] text-xs space-y-1">
                <div className="flex justify-between font-semibold text-[#2C241E]">
                  <span className="uppercase">{pm.type} ending in {pm.last4}</span>
                  {pm.isDefault && (
                    <span className="text-[10px] text-[#366B40] bg-[#EAF5EC] px-1.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-[#7A6C5F]">Expires: {pm.expiry}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
