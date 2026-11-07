import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useStore();

  const scrollToCollection = () => {
    const el = document.getElementById('featured-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        {/* 2-column split with balanced height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#9C5B16] mb-3">
              Maine Master Atelier · Est. 1984
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#2C241E] leading-[1.15] text-balance mb-5">
              Heirloom bears, lovingly hand-stitched for a lifetime of hugs.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4F44] leading-relaxed mb-8 max-w-xl">
              Each bear is born on our Maine woodbenches from German mohair, Peruvian alpaca, and hand-blown glass eyes. Calibrated with five-way rotating joints and custom gold-embroidered paw initials.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToCollection}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Adopt a Bear</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('tracker')}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#2C241E] bg-[#F2ECE4] hover:bg-[#EADBCC] border border-[#E8DFC8] rounded-lg transition-colors cursor-pointer"
              >
                <Truck className="w-4 h-4 text-[#9C5B16]" />
                <span>Track Live Order</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8DFC8]/70 flex items-center gap-6 text-xs text-[#7A6C5F]">
              <div>
                <span className="font-semibold text-[#2C241E]">12,400+</span> Bears Adopted Worldwide
              </div>
              <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
              <div>
                <span className="font-semibold text-[#2C241E]">4.95 / 5</span> Artisan Rating
              </div>
            </div>
          </div>

          {/* Right Showcase Image Column */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-md border border-[#E8DFC8]/80 group">
              <img
                src="/src/assets/images/hero_bear_workshop_1794059743173.jpg"
                alt="Artisanal teddy bear workshop with handcrafted mohair bears on oak workbench"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9C5B16] font-semibold">Artisan Spotlight</div>
                  <div className="text-sm font-semibold text-[#2C241E]">The Classic Mohair Atelier Series</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#7A6C5F]">Starting from</div>
                  <div className="text-sm font-bold text-[#2C241E] tabular-nums">$148.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column trust strip below the hero split */}
        <div className="mt-12 pt-8 border-t border-[#E8DFC8] grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F2ECE4] rounded-lg text-[#9C5B16] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#2C241E]">100% Handcrafted</div>
              <div className="text-xs text-[#7A6C5F] mt-0.5">German mohair &amp; pure wool</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F2ECE4] rounded-lg text-[#9C5B16] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#2C241E]">Real-Time GPS Tracking</div>
              <div className="text-xs text-[#7A6C5F] mt-0.5">Live courier map &amp; ETA telemetry</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F2ECE4] rounded-lg text-[#9C5B16] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#2C241E]">Secure Multi-Gateway</div>
              <div className="text-xs text-[#7A6C5F] mt-0.5">Cards, Apple Pay, PayPal &amp; Klarna</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F2ECE4] rounded-lg text-[#9C5B16] shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#2C241E]">Lifetime Snuggle Care</div>
              <div className="text-xs text-[#7A6C5F] mt-0.5">Free seam repairs &amp; fluffing hospital</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
