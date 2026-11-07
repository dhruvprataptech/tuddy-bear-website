import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
  'All Collections',
  'Heirloom Bears',
  'Polar & Arctic',
  'Giant Plush',
  'Accessories & Care',
  'Limited Editions',
] as const;

export const ProductGrid: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory =
          selectedCategory === 'All Collections' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStock = !inStockOnly || p.inStock;
        return matchesCategory && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default order
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  return (
    <section id="featured-collection" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#9C5B16]">
            The Master Catalogue
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] mt-1">
            Artisanal Bears &amp; Companions
          </h2>
          <p className="text-sm text-[#7A6C5F] mt-1">
            Hand-stitched in limited editions. Each piece comes with an adoption certificate and serial ring.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6C5F]" />
          <input
            type="text"
            placeholder="Search mohair, alpaca, outfits..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9C5B16] focus:border-[#9C5B16] text-[#2C241E]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6C5F] hover:text-[#2C241E] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar: Segmented buttons + Sort options */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8DFC8]">
        {/* Segmented Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#2C241E] text-white shadow-xs'
                  : 'bg-[#F2ECE4] text-[#5C4F44] hover:bg-[#EADBCC] hover:text-[#2C241E]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Secondary Filters: In stock toggle & Sort */}
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#5C4F44]">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="rounded border-[#E8DFC8] text-[#9C5B16] focus:ring-[#9C5B16]"
            />
            <span>In-stock only</span>
          </label>

          <div className="flex items-center gap-2 text-[#5C4F44]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-md px-2 py-1 text-xs text-[#2C241E] focus:outline-none focus:border-[#9C5B16] cursor-pointer"
            >
              <option value="featured">Artisan Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid: 3 columns desktop, 2 columns tablet */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FAF8F5] border border-dashed border-[#E8DFC8] rounded-2xl p-8">
          <div className="text-3xl mb-2">🧸</div>
          <h3 className="text-lg font-semibold text-[#2C241E]">No bears matched your search</h3>
          <p className="text-xs text-[#7A6C5F] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or resetting the category filter to explore all available creations.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Collections');
              setInStockOnly(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-[#2C241E] bg-[#F2ECE4] hover:bg-[#EADBCC] rounded-lg transition-colors border border-[#E8DFC8] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
