import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, FileText, Search, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsPromptVaultOpen,
    setIsSeoInspectorOpen,
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]/70">
      {/* Promotional Top Bar - slim and quiet */}
      <div className="bg-[#2C241E] text-[#EADBCC] text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3">
        <span>Handcrafted in our Maine workshop · Complimentary delivery on orders over $150 · Use code <strong>BEARHUG10</strong> for 10% off</span>
        <button
          onClick={() => setIsSeoInspectorOpen(true)}
          className="hidden md:inline-flex items-center gap-1 text-[#D4AF37] hover:underline text-[11px] font-medium"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          SEO Audit
        </button>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (Single text element wordmark in display face) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('shop')}
            className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-[#2C241E] hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer text-left"
          >
            Ursus &amp; Co.
          </button>
        </div>

        {/* Zone 2: 4-5 Nav Links (Single-line, 1-2 words, hover underline) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4F44]">
          <button
            onClick={() => setActiveTab('shop')}
            className={`whitespace-nowrap transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'shop'
                ? 'text-[#2C241E] font-semibold border-b-2 border-[#9C5B16]'
                : 'hover:text-[#2C241E]'
            }`}
          >
            Boutique
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'tracker'
                ? 'text-[#2C241E] font-semibold border-b-2 border-[#9C5B16]'
                : 'hover:text-[#2C241E]'
            }`}
          >
            Live Tracking
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#2C241E] font-semibold border-b-2 border-[#9C5B16]'
                : 'hover:text-[#2C241E]'
            }`}
          >
            My Account
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'admin'
                ? 'text-[#2C241E] font-semibold border-b-2 border-[#9C5B16]'
                : 'hover:text-[#2C241E]'
            }`}
          >
            Inventory Admin
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Prompts.chat Blueprint Generator Modal Trigger */}
          <button
            onClick={() => setIsPromptVaultOpen(true)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7C4812] bg-[#F2ECE4] hover:bg-[#EADBCC] rounded-lg transition-colors border border-[#E8DFC8] whitespace-nowrap cursor-pointer"
            title="View Prompt Template inspired by prompts.chat"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Prompt Vault</span>
          </button>

          {/* Wishlist quick toggle / indicator */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="relative p-2 text-[#5C4F44] hover:text-[#2C241E] transition-colors rounded-lg hover:bg-[#F2ECE4] cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-[#9C5B16] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Adoption Bag (Cart Drawer Trigger) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#FAF8F5] bg-[#2C241E] hover:bg-[#3D332B] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Adoption Bag</span>
            <span className="bg-[#9C5B16] text-white text-xs px-1.5 py-0.2 rounded-full font-semibold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E8DFC8]/60 bg-[#FAF8F5] py-2 text-xs font-medium text-[#5C4F44]">
        <button
          onClick={() => setActiveTab('shop')}
          className={`py-1 px-2 ${activeTab === 'shop' ? 'text-[#9C5B16] font-bold' : ''}`}
        >
          Boutique
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`py-1 px-2 ${activeTab === 'tracker' ? 'text-[#9C5B16] font-bold' : ''}`}
        >
          Tracker
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-1 px-2 ${activeTab === 'dashboard' ? 'text-[#9C5B16] font-bold' : ''}`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`py-1 px-2 ${activeTab === 'admin' ? 'text-[#9C5B16] font-bold' : ''}`}
        >
          Inventory
        </button>
        <button
          onClick={() => setIsPromptVaultOpen(true)}
          className="py-1 px-2 text-[#7C4812]"
        >
          Prompts
        </button>
      </div>
    </header>
  );
};
