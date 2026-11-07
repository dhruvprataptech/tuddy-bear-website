import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Copy, Check, FileText, Download, Sparkles, Terminal } from 'lucide-react';

export const PromptVaultModal: React.FC = () => {
  const { isPromptVaultOpen, setIsPromptVaultOpen, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'prompts_chat' | 'detailed_spec' | 'system_instruction'>('prompts_chat');

  if (!isPromptVaultOpen) return null;

  const promptChatFormat = `## Act as an E-Commerce Lead Architect & Brand Director

I want you to act as a principal full-stack software architect, UI/UX brand designer, and e-commerce specialist. Design and build a production-grade, mobile-responsive, and SEO-optimized E-Commerce web application for an artisanal boutique Bear Shop ("Ursus & Co. / The Bear Atelier").

### Core Requirements & Architecture:
1. **Artisanal Storefront & Catalog**:
   - Curate handcrafted heirloom teddy bears (German mohair, Peruvian alpaca fleece, giant fireside plushies, miniature pocket companions, and knitted bear clothing/care kits).
   - Implement bespoke paw embroidery personalization (custom gold thread stitching on suede paw pads).
   - Dynamic search, multi-category tab filtration, sorting (price, popularity, rating), and in-stock toggles.

2. **Wishlist & Cart System**:
   - Wishlist toggle on every product card with dedicated user wishlist drawer.
   - Slide-over cart drawer with quantity steppers, embroidery details, gift wrap option, and dynamic free delivery progress bar.

3. **Secure Multi-Method Checkout Gateway**:
   - Multi-step / Accordion checkout flow with shipping address validation and courier notes.
   - Popular integrated payment methods: Credit/Debit Cards (Visa, Mastercard, Amex with card validation), Apple Pay (biometric UI simulation), Google Pay (1-click tokenized), PayPal Express, Klarna/Afterpay (Buy Now Pay Later: 4 interest-free installments), and Web3/Crypto (USDC).
   - Real-time order math: dynamic shipping rates, sales tax estimation, promo discount codes (e.g. BEARHUG10, HONEY20), and Honey Points loyalty deduction.

4. **Real-Time GPS Order Tracking Telemetry**:
   - Full post-purchase tracking dashboard accessible by Order ID or tracking number.
   - 6-stage fulfillment timeline: Order Placed -> Artisan Handcraft & Joint Check -> Fluffed, Groomed & Wax Sealed -> Dispatched with Courier Bear -> Out for Final Delivery -> Delivered.
   - Simulated interactive GPS route map with moving courier vehicle, driver notes ("Barnaby B."), live speed (mph), distance (miles), and ETA countdown.
   - Interactive webhook simulator to step through fulfillment stages in real time.

5. **Robust User Dashboard & Loyalty Program**:
   - Customer profile with membership tiers (Little Cub, Brown Bear, Honey Grizzly VIP).
   - Order history with 1-click re-ordering and live tracking access.
   - Saved shipping addresses and tokenized payment methods.
   - "Honey Points" rewards vault with redeemable discount perks and accessories.

6. **Inventory Management System & Custom Admin Panel**:
   - Executive KPI cards: Total active SKUs, low-stock threshold alerts, total inventory retail value, and gross revenue.
   - Live inventory management table with inline stock increment/decrement steppers, quick +5 restock buttons, search, and category filters.
   - "Add New Product" and "Edit Product" modal dialogs with specifications, image asset selection, materials, and price controls.
   - Order fulfillment manager allowing atelier staff to advance order stages and view customer dispatch instructions.

7. **User Reviews & Social Proof**:
   - Verified buyer reviews with 5-star rating distribution breakdown.
   - "Write an Atelier Review" modal with star rating picker, headline, detailed experience, and helpfulness upvoting.

8. **Design & SEO Discipline**:
   - Responsive mobile-first layout with touch targets >= 44px.
   - Zero-pill metadata discipline, warm natural boutique palette (warm paper, timber brown, honey amber), and editorial typography (Playfair Display + Plus Jakarta Sans).
   - Complete OpenGraph, Twitter Cards, and Schema.org JSON-LD structured data for OnlineStore and Product catalogs.`;

  const detailedSpecFormat = `### Comprehensive System Specification: Artisanal Bear Shop E-Commerce Platform

**Domain**: Luxury Artisanal Goods / Direct-to-Consumer Plushies
**Palette**: Canvas: #FAF8F5, Surface: #F4EFEA, Border: #E8DFC8, Primary Text: #2C241E, Accent: #9C5B16 (Honey Amber)
**Typography**: Display: Playfair Display / Fraunces (Serif), UI/Body: Plus Jakarta Sans, Numerals: Tabular Monospace

#### Functional Matrix:
- Storefront: 6+ handcrafted bears with 5-way jointed mechanisms, materials certification, and paw embroidery.
- Cart & Checkout: Real-time calculation, coupons (BEARHUG10, HONEY20), Apple Pay, Google Pay, Klarna BNPL, Card, Crypto.
- Tracking: Interactive map simulation with driver telemetry (Barnaby B.), distance countdown, and 6-stage timeline.
- Dashboard: Orders ledger, saved cards, saved addresses, Honey Points loyalty tier.
- Admin Panel: Inventory stock adjustment steppers, low stock alerts, Add/Edit modal, order stage dispatcher.
- Reviews: Verified buyer badges, star breakdown, and helpfulness voting.
- SEO: Schema.org OnlineStore JSON-LD, OpenGraph tags, semantic HTML.`;

  const systemInstructionFormat = `You are an expert full-stack engineer and UI designer. Generate a fully-functional Bear Shop E-Commerce web application in React + TypeScript + Tailwind CSS.
Include:
1. Product catalog with categories, search, sorting, and paw embroidery customization.
2. Cart drawer with free shipping progress bar.
3. Multi-gateway checkout (Card, Apple Pay, Google Pay, PayPal, Klarna, Crypto).
4. Real-time GPS order tracker with interactive map and 6-stage milestones.
5. User dashboard with order history, addresses, and Honey Rewards loyalty club.
6. Custom Admin inventory management panel with inline stock steppers and Add/Edit product modal.
7. Customer reviews with star ratings and verified buyer badges.
8. SEO metadata and Schema.org JSON-LD structured data.`;

  const activeContent =
    selectedFormat === 'prompts_chat'
      ? promptChatFormat
      : selectedFormat === 'detailed_spec'
      ? detailedSpecFormat
      : systemInstructionFormat;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    showToast('Prompt copied to clipboard! Ready to use.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bear-shop-prompt-${selectedFormat}.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded prompt markdown file', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#2C241E] text-white rounded-lg">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C241E] font-display">
                Prompts.chat Blueprint Vault
              </h3>
              <p className="text-xs text-[#7A6C5F]">
                Copy-pasteable production prompts formatted for prompts.chat &amp; LLM agents
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPromptVaultOpen(false)}
            className="text-[#7A6C5F] hover:text-[#2C241E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="p-4 bg-white border-b border-[#E8DFC8] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedFormat('prompts_chat')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'prompts_chat'
                  ? 'bg-[#2C241E] text-white'
                  : 'bg-[#F2ECE4] text-[#5C4F44] hover:bg-[#EADBCC]'
              }`}
            >
              Prompts.chat "Act as" Format
            </button>
            <button
              onClick={() => setSelectedFormat('detailed_spec')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'detailed_spec'
                  ? 'bg-[#2C241E] text-white'
                  : 'bg-[#F2ECE4] text-[#5C4F44] hover:bg-[#EADBCC]'
              }`}
            >
              Architecture Spec
            </button>
            <button
              onClick={() => setSelectedFormat('system_instruction')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedFormat === 'system_instruction'
                  ? 'bg-[#2C241E] text-white'
                  : 'bg-[#F2ECE4] text-[#5C4F44] hover:bg-[#EADBCC]'
              }`}
            >
              Quick System Prompt
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-1.5 text-[#5C4F44] hover:text-[#2C241E] border border-[#E8DFC8] rounded-md hover:bg-[#FAF8F5] cursor-pointer"
              title="Download .md file"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9C5B16] hover:bg-[#7C4812] text-white font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Prompt Content */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs leading-relaxed text-[#2C241E] bg-[#FAF8F5]">
          <pre className="whitespace-pre-wrap select-all bg-white p-4 rounded-xl border border-[#E8DFC8] shadow-inner">
            {activeContent}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-3.5 border-t border-[#E8DFC8] bg-[#F4EFEA] flex items-center justify-between text-[11px] text-[#7A6C5F]">
          <span>Inspired by f/prompts.chat repository format</span>
          <span className="font-sans text-[#9C5B16] font-medium">Ready for ChatGPT, Claude, and Gemini</span>
        </div>
      </div>
    </div>
  );
};
