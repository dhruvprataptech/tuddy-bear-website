import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { OrderTracker } from './components/OrderTracker';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewModal } from './components/ReviewModal';
import { PromptVaultModal } from './components/PromptVaultModal';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const StoreContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C241E]">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'shop' && (
          <>
            <Hero />
            <ProductGrid />
          </>
        )}

        {activeTab === 'tracker' && <OrderTracker />}

        {activeTab === 'dashboard' && <UserDashboard />}

        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <ReviewModal />
      <PromptVaultModal />
      <SeoInspectorModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
