import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isWishlisted, addToCart, setSelectedProduct } = useStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#D8CEBE]">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-[#F4EFEA] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle subtle single tag if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[11px] font-semibold text-[#7C4812] px-2.5 py-1 rounded border border-[#E8DFC8]/60 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist toggle button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
            wishlisted
              ? 'bg-[#9C5B16] text-white'
              : 'bg-white/80 text-[#5C4F44] hover:bg-white hover:text-[#9C5B16]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#2C241E] bg-white/95 backdrop-blur-md hover:bg-white rounded-lg shadow-sm border border-[#E8DFC8] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body & Unboxed Metadata */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category & Stock Unboxed Text */}
        <div className="flex items-center justify-between text-xs text-[#7A6C5F] mb-1.5">
          <span className="uppercase tracking-wider font-medium text-[11px] text-[#9C5B16]">
            {product.category}
          </span>
          <span className="tabular-nums">
            {product.stockCount <= 5 && product.stockCount > 0 ? (
              <span className="text-[#B91C1C] font-semibold">{product.stockCount} left</span>
            ) : product.inStock ? (
              <span className="text-[#366B40]">In Stock</span>
            ) : (
              <span className="text-[#7A6C5F]">Sold Out</span>
            )}
          </span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="text-base font-semibold text-[#2C241E] hover:text-[#9C5B16] transition-colors cursor-pointer line-clamp-1 mb-1 font-display"
        >
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#5C4F44] line-clamp-2 mb-3 leading-relaxed">
          {product.subtitle}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-[#5C4F44] mb-4">
          <div className="flex items-center text-[#D4AF37]">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-[#2C241E] tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="text-[#A39688]">·</span>
          <span className="text-[#7A6C5F] tabular-nums">({product.reviewsCount} reviews)</span>
        </div>

        {/* Price Baseline & Add to Bag CTA */}
        <div className="mt-auto pt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#2C241E] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#A39688] line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              product.inStock
                ? 'bg-[#2C241E] text-white hover:bg-[#3D332B]'
                : 'bg-[#E8DFC8] text-[#7A6C5F] cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Adopt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
