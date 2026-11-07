import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShieldCheck, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsPromptVaultOpen, setIsSeoInspectorOpen } = useStore();

  return (
    <footer className="bg-[#2C241E] text-[#D4C7BA] text-xs border-t border-[#3D332B] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#3D332B]">
          {/* Brand & Story */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xl font-display font-semibold text-[#FAF8F5]">
              Ursus &amp; Co. Atelier
            </h3>
            <p className="text-[#A39688] leading-relaxed max-w-md text-xs">
              Handcrafting heirloom teddy bears in Maine since 1984. Every bear is created with natural German mohair, traditional cotter-pin joints, and certified organic fillings for generations of comforting hugs.
            </p>
            <div className="text-[11px] text-[#A39688] pt-1">
              Atelier: 742 Honeycomb Lane, Kennebunk, Maine 04101
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Boutique &amp; Services
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A39688]">
              <li>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Adopt a Bear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tracker')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Real-Time GPS Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  My Honey Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Inventory Management
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Architecture Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Developer Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A39688]">
              <li>
                <button
                  onClick={() => setIsPromptVaultOpen(true)}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Prompts.chat Template</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSeoInspectorOpen(true)}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>SEO Health Inspector</span>
                </button>
              </li>
              <li>
                <span className="text-[#8C7D6F]">Payment: Stripe / 256-Bit SSL</span>
              </li>
              <li>
                <span className="text-[#8C7D6F]">Carrier: BearPost Express GPS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7D6F]">
          <div>
            &copy; {new Date().getFullYear()} Ursus &amp; Co. Bear Atelier. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Terms of Snuggle</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Stitched with <Heart className="w-3 h-3 text-[#B91C1C] fill-current" /> in Maine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
