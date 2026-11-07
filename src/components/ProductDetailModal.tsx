import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Scissors,
  Check,
  ThumbsUp,
  MessageSquare,
  Gift,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    voteHelpful,
    setReviewModalProduct,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [embroideryText, setEmbroideryText] = useState('');
  const [wantEmbroidery, setWantEmbroidery] = useState(false);
  const [wantGiftWrap, setWantGiftWrap] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'specifications' | 'reviews'>('story');

  if (!selectedProduct) return null;

  const wishlisted = isWishlisted(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(
      selectedProduct,
      quantity,
      wantEmbroidery && embroideryText.trim() ? embroideryText.trim() : undefined,
      wantGiftWrap
    );
    setSelectedProduct(null);
  };

  // Review star counts
  const starCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = selectedProduct.reviews.filter(r => Math.round(r.rating) === stars).length;
    const percentage = selectedProduct.reviews.length > 0 ? (count / selectedProduct.reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#5C4F44] hover:text-[#2C241E] shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image showcase & details */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFEA] border border-[#E8DFC8]/70 shadow-inner">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedProduct.badge && (
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-xs font-semibold text-[#7C4812] px-3 py-1 rounded border border-[#E8DFC8]/60 shadow-xs">
                    {selectedProduct.badge}
                  </div>
                )}
              </div>

              {/* Quick Trust Pillars */}
              <div className="p-4 bg-[#F2ECE4]/70 rounded-xl border border-[#E8DFC8] text-xs text-[#5C4F44] space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#9C5B16] shrink-0" />
                  <span>Lifetime Snuggle Guarantee &amp; Atelier Seam Repairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9C5B16] shrink-0" />
                  <span>Includes Wax-Sealed Adoption Certificate &amp; Serial Tag</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#9C5B16] shrink-0" />
                  <span>Ships in Cedar-Aromatherapy Wooden Gift Box</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col">
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#7A6C5F] mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#9C5B16]">
                  {selectedProduct.category}
                </span>
                <span className="tabular-nums">
                  {selectedProduct.inStock ? (
                    <span className="text-[#366B40] font-medium">In Stock ({selectedProduct.stockCount} available)</span>
                  ) : (
                    <span className="text-[#B91C1C] font-semibold">Sold Out</span>
                  )}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6C5F] mb-3">
                {selectedProduct.subtitle}
              </p>

              {/* Reviews Summary */}
              <div className="flex items-center gap-2 text-xs text-[#5C4F44] mb-4">
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-[#D8CEBE]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#2C241E] tabular-nums">
                  {selectedProduct.rating.toFixed(2)}
                </span>
                <span className="text-[#A39688]">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="hover:underline text-[#9C5B16] font-medium cursor-pointer"
                >
                  {selectedProduct.reviewsCount} verified reviews
                </button>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-[#E8DFC8]">
                <span className="text-2xl sm:text-3xl font-bold text-[#2C241E] tabular-nums">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span className="text-sm text-[#A39688] line-through tabular-nums">
                    ${selectedProduct.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#7A6C5F]">USD · Tax calculated at checkout</span>
              </div>

              {/* Custom Paw Embroidery Option */}
              {selectedProduct.customizable && (
                <div className="p-3.5 bg-[#F4EFEA] rounded-xl border border-[#E8DFC8] mb-4">
                  <label className="flex items-center justify-between text-xs font-semibold text-[#2C241E] cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#9C5B16]" />
                      <span>Custom Gold Paw Embroidery (+$15.00)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={wantEmbroidery}
                      onChange={e => setWantEmbroidery(e.target.checked)}
                      className="rounded border-[#E8DFC8] text-[#9C5B16] focus:ring-[#9C5B16]"
                    />
                  </label>
                  {wantEmbroidery && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        maxLength={20}
                        placeholder="e.g. Theodor · 2026 or Baby Oliver"
                        value={embroideryText}
                        onChange={e => setEmbroideryText(e.target.value)}
                        className="w-full text-xs px-3 py-1.5 bg-white border border-[#E8DFC8] rounded-md focus:outline-none focus:border-[#9C5B16]"
                      />
                      <div className="text-[10px] text-[#7A6C5F] mt-1">
                        Hand-stitched on the suede left paw pad with spun gold metallic thread.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Gift Wrap Option */}
              <div className="p-3 bg-[#F4EFEA] rounded-xl border border-[#E8DFC8] mb-5">
                <label className="flex items-center justify-between text-xs font-semibold text-[#2C241E] cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#9C5B16]" />
                    <span>Artisan Ribbon &amp; Honeycomb Gift Wrap (+$8.00)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={wantGiftWrap}
                    onChange={e => setWantGiftWrap(e.target.checked)}
                    className="rounded border-[#E8DFC8] text-[#9C5B16] focus:ring-[#9C5B16]"
                  />
                </label>
              </div>

              {/* Quantity Stepper & Buy Button */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#E8DFC8] rounded-lg bg-[#FAF8F5] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold text-[#2C241E] tabular-nums min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stockCount, quantity + 1))}
                    className="px-3 py-2 text-sm text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer ${
                    selectedProduct.inStock
                      ? 'bg-[#2C241E] text-white hover:bg-[#3D332B]'
                      : 'bg-[#E8DFC8] text-[#7A6C5F] cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Adopt for ${(
                      selectedProduct.price * quantity +
                      (wantEmbroidery && embroideryText ? 15 : 0) +
                      (wantGiftWrap ? 8 : 0)
                    ).toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 rounded-lg border border-[#E8DFC8] transition-colors cursor-pointer ${
                    wishlisted ? 'bg-[#9C5B16] text-white' : 'bg-[#FAF8F5] text-[#5C4F44] hover:bg-[#F2ECE4]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabbed Section Below: Story, Specs, Reviews */}
          <div className="mt-8 pt-6 border-t border-[#E8DFC8]">
            <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-3 mb-6">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'story'
                    ? 'bg-[#2C241E] text-white'
                    : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
                }`}
              >
                Atelier Story &amp; Details
              </button>

              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'specifications'
                    ? 'bg-[#2C241E] text-white'
                    : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
                }`}
              >
                Materials &amp; Dimensions
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#2C241E] text-white'
                    : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
                }`}
              >
                Customer Reviews ({selectedProduct.reviews.length})
              </button>
            </div>

            {/* Content: Story */}
            {activeTab === 'story' && (
              <div className="space-y-4 text-sm text-[#5C4F44] leading-relaxed max-w-2xl">
                <p>{selectedProduct.description}</p>
                <div className="p-4 bg-[#F2ECE4]/60 rounded-xl border border-[#E8DFC8] italic font-display text-[#2C241E]">
                  "{selectedProduct.story}"
                </div>
              </div>
            )}

            {/* Content: Specifications */}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C4F44]">
                <div className="p-3 bg-[#F4EFEA] rounded-lg border border-[#E8DFC8]/60">
                  <span className="font-semibold text-[#2C241E] block mb-1">Dimensions &amp; Weight</span>
                  <div>Height: {selectedProduct.dimensions}</div>
                  <div>Weight: {selectedProduct.weight}</div>
                </div>

                <div className="p-3 bg-[#F4EFEA] rounded-lg border border-[#E8DFC8]/60">
                  <span className="font-semibold text-[#2C241E] block mb-1">Care &amp; Cleaning</span>
                  <div>{selectedProduct.careInstructions}</div>
                </div>

                <div className="sm:col-span-2 p-3 bg-[#F4EFEA] rounded-lg border border-[#E8DFC8]/60">
                  <span className="font-semibold text-[#2C241E] block mb-1">Certified Materials</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.materials.map((mat, i) => (
                      <span key={i} className="bg-white px-2.5 py-1 rounded border border-[#E8DFC8] text-[11px]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating Breakdown Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 bg-[#F2ECE4]/60 rounded-xl border border-[#E8DFC8]">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-[#2C241E] tabular-nums font-display">
                      {selectedProduct.rating.toFixed(1)}
                    </div>
                    <div>
                      <div className="flex items-center text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-[#D8CEBE]'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-[#7A6C5F] mt-0.5">
                        Based on {selectedProduct.reviewsCount} verified adoptions
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setReviewModalProduct(selectedProduct);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#9C5B16] hover:bg-[#7C4812] rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Write an Atelier Review</span>
                  </button>
                </div>

                {/* Rating Bar Distribution */}
                <div className="space-y-1.5 max-w-md">
                  {starCounts.map(({ stars, count, percentage }) => (
                    <div key={stars} className="flex items-center gap-3 text-xs text-[#5C4F44]">
                      <span className="w-12 tabular-nums">{stars} Stars</span>
                      <div className="flex-1 h-2 bg-[#E8DFC8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#9C5B16] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-[#7A6C5F] tabular-nums">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-4 pt-2">
                  {selectedProduct.reviews.map(review => (
                    <div
                      key={review.id}
                      className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#2C241E]">{review.author}</span>
                          {review.verifiedPurchase && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#366B40] font-medium">
                              <Check className="w-3 h-3" />
                              <span>Verified Adopter</span>
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#A39688]">{review.date}</span>
                      </div>

                      <div className="flex items-center text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-[#D8CEBE]'}`}
                          />
                        ))}
                      </div>

                      <h4 className="text-sm font-semibold text-[#2C241E]">{review.title}</h4>
                      <p className="text-xs text-[#5C4F44] leading-relaxed">{review.comment}</p>

                      <div className="pt-2 flex items-center justify-between text-xs text-[#7A6C5F] border-t border-[#FAF8F5]">
                        <span className="text-[11px] text-[#A39688]">Adopted: {review.bearAdopted}</span>
                        <button
                          onClick={() => voteHelpful(selectedProduct.id, review.id)}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors cursor-pointer ${
                            review.userVotedHelpful
                              ? 'text-[#9C5B16] font-semibold bg-[#F4EFEA]'
                              : 'text-[#7A6C5F] hover:text-[#2C241E]'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({review.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
