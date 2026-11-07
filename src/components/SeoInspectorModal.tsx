import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, Share2, Code2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SeoInspectorModal: React.FC = () => {
  const { isSeoInspectorOpen, setIsSeoInspectorOpen } = useStore();

  if (!isSeoInspectorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#2C241E] text-white rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C241E] font-display">
                SEO &amp; Structured Data Health Audit
              </h3>
              <p className="text-xs text-[#7A6C5F]">
                Inspection of meta tags, search snippets, OpenGraph, and Schema.org JSON-LD
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSeoInspectorOpen(false)}
            className="text-[#7A6C5F] hover:text-[#2C241E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#5C4F44]">
          {/* Audit Checklist */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
            <h4 className="font-semibold text-sm text-[#2C241E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#366B40]" />
              <span>SEO Audit Checks Passed (5 / 5)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#5C4F44]">
              <div>✓ Title Tag: 61 characters (Optimal)</div>
              <div>✓ Meta Description: 154 characters (Optimal)</div>
              <div>✓ Viewport: width=device-width, initial-scale=1.0</div>
              <div>✓ OpenGraph &amp; Twitter card tags active</div>
              <div className="sm:col-span-2">✓ Schema.org OnlineStore JSON-LD schema injected</div>
            </div>
          </div>

          {/* Google Search Snippet Simulation */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C241E]">
              <Search className="w-3.5 h-3.5 text-[#9C5B16]" />
              <span>Google SERP Search Result Preview</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8DFC8]/60 space-y-1 font-sans">
              <div className="text-[11px] text-[#202124] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#9C5B16] text-white text-[10px] flex items-center justify-center font-bold">
                  U
                </span>
                <span>https://ursusandco.com › shop › bears</span>
              </div>
              <div className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer">
                Ursus &amp; Co. | Handcrafted Heirloom Bears &amp; Artisanal Plushies
              </div>
              <p className="text-xs text-[#4d5156] leading-relaxed">
                Discover heirloom handcrafted teddy bears, organic alpaca plushies, and custom bespoke bear accessories. Enjoy secure checkout, real-time order tracking...
              </p>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C241E]">
              <Share2 className="w-3.5 h-3.5 text-[#9C5B16]" />
              <span>OpenGraph &amp; Twitter Card Preview</span>
            </div>
            <div className="border border-[#E8DFC8] rounded-xl overflow-hidden bg-[#FAF8F5]">
              <div className="h-32 bg-[#2C241E] text-white flex items-center justify-center text-center p-4">
                <div>
                  <div className="font-display text-lg font-bold">Ursus &amp; Co. Atelier</div>
                  <div className="text-xs text-[#EADBCC] mt-1">Maine Heirloom Bears &amp; Handcrafted Companions</div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <div className="text-[10px] uppercase text-[#7A6C5F]">ursusandco.com</div>
                <div className="font-semibold text-xs text-[#2C241E]">
                  Handcrafted Heirloom Bears &amp; Artisanal Plushies
                </div>
              </div>
            </div>
          </div>

          {/* Schema.org Preview */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C241E]">
              <Code2 className="w-3.5 h-3.5 text-[#9C5B16]" />
              <span>Injected Schema.org Structured Data (JSON-LD)</span>
            </div>
            <pre className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8DFC8] font-mono text-[11px] overflow-x-auto text-[#2C241E]">
{`{
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "name": "Ursus & Co. Bear Atelier",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Credit Card, Apple Pay, Google Pay, PayPal, Klarna",
  "priceRange": "$$$"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
