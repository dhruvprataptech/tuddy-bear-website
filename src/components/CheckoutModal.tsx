import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, CartItem } from '../types';
import { PROMO_CODES } from '../data/bearStoreData';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  Sparkles,
  Gift,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    placeOrder,
    user,
    showToast,
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user.fullName || 'Dhruv Pratap Singh',
    email: user.email || 'dhruvpratapsingh159@gmail.com',
    phone: user.phone || '+1 (555) 382-9014',
    address: '742 Honeycomb Lane, Suite 4B',
    city: 'Portland',
    state: 'ME',
    zipCode: '04101',
    country: 'United States',
    deliveryNotes: 'Please leave on covered front porch behind the flower pot!',
    giftMessage: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority' | 'white-glove'>('priority');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna' | 'crypto'>('card');

  // Card details
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardName: user.fullName || 'Dhruv Pratap Singh',
    expiry: '09/28',
    cvv: '842',
  });

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('BEARHUG10');
  const [useHoneyPoints, setUseHoneyPoints] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  // Shipping calculation
  let shippingCost = 0;
  if (shippingMethod === 'standard') {
    shippingCost = cartTotal >= 150 || appliedPromo === 'FREESHIP' ? 0 : 9.0;
  } else if (shippingMethod === 'priority') {
    shippingCost = appliedPromo === 'FREESHIP' ? 0 : 15.0;
  } else if (shippingMethod === 'white-glove') {
    shippingCost = 28.0;
  }

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const rate = PROMO_CODES[appliedPromo].discountPercent / 100;
    discountAmount += cartTotal * rate;
  }

  // Honey Points discount: 200 points = $10 discount
  const honeyDiscount = useHoneyPoints ? Math.min(cartTotal * 0.5, (user.honeyPoints / 20) * 1) : 0;
  const totalDiscount = discountAmount + honeyDiscount;

  const taxableAmount = Math.max(0, cartTotal - totalDiscount);
  const estimatedTax = taxableAmount * 0.055; // 5.5% Maine rate
  const finalTotal = Math.max(0, cartTotal - totalDiscount + shippingCost + estimatedTax);

  const applyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoCodeInput('');
      showToast(`Promo code ${code} applied successfully!`, 'success');
    } else {
      showToast('Invalid promo code. Try BEARHUG10 or HONEY20', 'warning');
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.email) {
      showToast('Please fill in your shipping details', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `URS-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TRK-BEAR-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: orderId,
        trackingNumber: trackingNumber,
        date: 'Just now',
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          deliveryNotes: formData.deliveryNotes,
        },
        items: [...cart],
        shippingMethod: {
          id: shippingMethod,
          name:
            shippingMethod === 'standard'
              ? 'Standard Honeycomb Ground'
              : shippingMethod === 'priority'
              ? 'Stitched Priority Air Courier'
              : 'White-Glove Hand Delivery',
          estimatedDays:
            shippingMethod === 'priority' ? '1-2 Days (Express)' : '3-5 Business Days',
          price: shippingCost,
        },
        payment: {
          method: paymentMethod,
          cardBrand:
            paymentMethod === 'apple_pay'
              ? 'Apple Pay (Mastercard)'
              : paymentMethod === 'google_pay'
              ? 'Google Pay (Visa)'
              : paymentMethod === 'paypal'
              ? 'PayPal Express'
              : paymentMethod === 'klarna'
              ? 'Klarna BNPL (4 installments)'
              : paymentMethod === 'crypto'
              ? 'USDC Web3'
              : 'Visa',
          cardLast4: paymentMethod === 'card' ? '4242' : '8812',
          transactionId: `TXN-${Date.now().toString()}`,
          status: 'paid',
          subtotal: cartTotal,
          discountAmount: totalDiscount,
          discountCode: appliedPromo || undefined,
          shippingFee: shippingCost,
          tax: estimatedTax,
          total: finalTotal,
        },
        tracking: {
          carrier: 'BearPost Stitched Express (Courier Van #09)',
          currentStageIndex: 1, // Artisan Handcraft
          estimatedDelivery: 'Tomorrow by 2:00 PM',
          stages: [
            {
              title: 'Order Placed & Cleared',
              description: `Payment authorized via ${paymentMethod.replace('_', ' ').toUpperCase()}. Order entered in the master stitcher ledger.`,
              timestamp: 'Just now',
              location: 'Kennebunk Atelier, ME',
              completed: true,
              current: false,
            },
            {
              title: 'Artisan Handcraft & Joint Check',
              description: 'Plush undergoing final joint assembly and snuggle tolerance inspection.',
              timestamp: 'In progress',
              location: 'Master Sewing Bench 3',
              completed: false,
              current: true,
            },
            {
              title: 'Fluffed, Groomed & Wax Sealed',
              description: 'Packaged into cedar aroma wooden box with wax seal & honeycomb pot.',
              timestamp: 'Upcoming',
              location: 'Ribbon Station',
              completed: false,
              current: false,
            },
            {
              title: 'Dispatched with Courier Bear',
              description: 'En route with temperature-controlled courier vehicle.',
              timestamp: 'Upcoming',
              location: 'Regional Sorting Depot',
              completed: false,
              current: false,
            },
            {
              title: 'Out for Final Delivery',
              description: 'Courier Barnaby B. out for doorstep delivery with live GPS.',
              timestamp: 'Upcoming',
              location: 'Local Neighborhood',
              completed: false,
              current: false,
            },
            {
              title: 'Delivered to Doorstep',
              description: 'Safely placed at destination.',
              timestamp: 'Upcoming',
              location: `${formData.city}, ${formData.state}`,
              completed: false,
              current: false,
            },
          ],
          courier: {
            name: 'Barnaby B. (Senior Bear Courier)',
            vehicle: 'Mercedes Sprinter Warm Van #09',
            currentDistanceMiles: 8.4,
            speedMph: 32,
            etaMinutes: 75,
            statusNote: 'Order cleared. Packaging team is warming up the cedar boxes for courier handover.',
          },
        },
      };

      setIsProcessing(false);
      setIsCheckoutOpen(false);
      placeOrder(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-6 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#2C241E] text-white rounded-lg">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-semibold text-[#2C241E]">
                Secure Bear Adoption Gateway
              </h2>
              <p className="text-xs text-[#7A6C5F]">
                256-Bit SSL Encrypted · Level-1 PCI Compliant Checkout
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#7A6C5F] hover:text-[#2C241E] rounded-md transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body: 2 Columns */}
        <form onSubmit={handlePay} className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details, Shipping, Payments */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Customer & Shipping Address */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2C241E] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2C241E] text-white text-[11px] flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Adoption &amp; Shipping Address</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        fullName: 'Dhruv Pratap Singh',
                        email: 'dhruvpratapsingh159@gmail.com',
                        phone: '+1 (555) 382-9014',
                        address: '742 Honeycomb Lane, Suite 4B',
                        city: 'Portland',
                        state: 'ME',
                        zipCode: '04101',
                        country: 'United States',
                        deliveryNotes: 'Leave by the porch door behind planter!',
                        giftMessage: 'To my dearest, a friend for life!',
                      });
                      showToast('Auto-filled test delivery profile', 'info');
                    }}
                    className="text-[11px] text-[#9C5B16] hover:underline cursor-pointer"
                  >
                    Quick Autofill
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Email for GPS Tracking</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">
                      Delivery Courier Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ring the bell, leave under covered porch"
                      value={formData.deliveryNotes}
                      onChange={e => setFormData({ ...formData, deliveryNotes: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Method */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2C241E] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2C241E] text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Delivery Speed &amp; Handling</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      shippingMethod === 'priority'
                        ? 'bg-white border-[#9C5B16] shadow-xs'
                        : 'bg-[#F4EFEA] border-[#E8DFC8] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'priority'}
                        onChange={() => setShippingMethod('priority')}
                        className="text-[#9C5B16] focus:ring-[#9C5B16]"
                      />
                      <div>
                        <div className="font-semibold text-[#2C241E]">Stitched Priority Air Courier (1-2 Days)</div>
                        <div className="text-[11px] text-[#7A6C5F]">Includes live GPS telemetry &amp; courier phone updates</div>
                      </div>
                    </div>
                    <span className="font-bold tabular-nums text-[#2C241E]">$15.00</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'bg-white border-[#9C5B16] shadow-xs'
                        : 'bg-[#F4EFEA] border-[#E8DFC8] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-[#9C5B16] focus:ring-[#9C5B16]"
                      />
                      <div>
                        <div className="font-semibold text-[#2C241E]">Standard Honeycomb Ground (3-5 Days)</div>
                        <div className="text-[11px] text-[#7A6C5F]">
                          {cartTotal >= 150 ? 'Complimentary on orders $150+' : 'Standard ground handling'}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold tabular-nums text-[#2C241E]">
                      {cartTotal >= 150 ? 'FREE' : '$9.00'}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      shippingMethod === 'white-glove'
                        ? 'bg-white border-[#9C5B16] shadow-xs'
                        : 'bg-[#F4EFEA] border-[#E8DFC8] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'white-glove'}
                        onChange={() => setShippingMethod('white-glove')}
                        className="text-[#9C5B16] focus:ring-[#9C5B16]"
                      />
                      <div>
                        <div className="font-semibold text-[#2C241E]">White-Glove Hand Unboxing Delivery</div>
                        <div className="text-[11px] text-[#7A6C5F]">Uniformed delivery, ribbons untied, certificate framed</div>
                      </div>
                    </div>
                    <span className="font-bold tabular-nums text-[#2C241E]">$28.00</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Gateways (All popular payment methods) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2C241E] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2C241E] text-white text-[11px] flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Payment Gateway</span>
                </h3>

                {/* Gateway Selector Tabs */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#2C241E] text-white border-[#2C241E]'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'google_pay'
                        ? 'bg-[#2C241E] text-white border-[#2C241E]'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    GPay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#003087] text-white border-[#003087]'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    PayPal
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'bg-[#FFB3C7] text-black border-[#FFB3C7]'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    Klarna
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'crypto'
                        ? 'bg-[#2775CA] text-white border-[#2775CA]'
                        : 'bg-white text-[#5C4F44] border-[#E8DFC8] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    Crypto
                  </button>
                </div>

                {/* Payment Fields Container */}
                <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-3">
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardData.cardNumber}
                            onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
                            className="w-full text-xs pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg font-mono"
                          />
                          <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6C5F]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">Expiration</label>
                          <input
                            type="text"
                            required
                            value={cardData.expiry}
                            onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#5C4F44] mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            required
                            value={cardData.cvv}
                            onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="text-center py-4 text-xs space-y-2">
                      <div className="text-2xl">Pay</div>
                      <p className="text-[#5C4F44]">
                        Instant biometrics enabled. Confirming will simulate Touch ID / Face ID payment authorization for <strong>${finalTotal.toFixed(2)}</strong>.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'google_pay' && (
                    <div className="text-center py-4 text-xs space-y-2">
                      <div className="font-bold text-sm text-[#2C241E]">Google Pay Instant Checkout</div>
                      <p className="text-[#5C4F44]">
                        Connected with user profile ({user.email}). 1-click tokenized payment.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-4 text-xs space-y-2">
                      <div className="font-bold text-sm text-[#003087]">PayPal Buyer Protection</div>
                      <p className="text-[#5C4F44]">
                        Simulated secure redirect with zero merchant card storage.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'klarna' && (
                    <div className="p-3 bg-[#FFF0F4] rounded-lg text-xs text-[#2C241E] space-y-1">
                      <div className="font-semibold">Pay in 4 interest-free installments:</div>
                      <div className="text-sm font-bold text-[#9C5B16]">
                        4 payments of ${(finalTotal / 4).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-[#7A6C5F]">Due every 2 weeks. No hidden interest or fees.</div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="p-3 bg-[#F0F7FF] rounded-lg text-xs text-[#2C241E] space-y-1">
                      <div className="font-semibold">Pay with USDC or Bitcoin (Base/Ethereum):</div>
                      <div className="text-sm font-bold text-[#2775CA] font-mono">
                        {(finalTotal * 1.0).toFixed(2)} USDC
                      </div>
                      <div className="text-[10px] text-[#7A6C5F]">Instant smart-contract zero confirmation delay.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Review */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E8DFC8] space-y-4">
              <h3 className="text-sm font-semibold text-[#2C241E] font-display">
                Adoption Summary ({cart.length} items)
              </h3>

              {/* Items mini list */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 divide-y divide-[#FAF8F5] pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center gap-2.5 text-xs">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-md object-cover bg-[#F4EFEA] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#2C241E] truncate">{item.product.name}</div>
                      <div className="text-[11px] text-[#7A6C5F]">
                        Qty: {item.quantity} {item.customEmbroidery && `· Paw: "${item.customEmbroidery}"`}
                      </div>
                    </div>
                    <div className="font-semibold tabular-nums text-[#2C241E]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-3 border-t border-[#E8DFC8]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. BEARHUG10)"
                    value={promoCodeInput}
                    onChange={e => setPromoCodeInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 uppercase bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="px-3 py-1.5 text-xs font-semibold text-[#2C241E] bg-[#F2ECE4] hover:bg-[#EADBCC] rounded-lg transition-colors border border-[#E8DFC8] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-[#366B40] font-medium mt-1.5">
                    <span>Code {appliedPromo} applied (-{PROMO_CODES[appliedPromo]?.discountPercent}%)</span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-[#B91C1C] hover:underline text-[10px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Honey Points Toggle */}
              {user.honeyPoints >= 100 && (
                <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E8DFC8] text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#9C5B16]" />
                      <span>Redeem Honey Points (Balance: {user.honeyPoints} pts)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={useHoneyPoints}
                      onChange={e => setUseHoneyPoints(e.target.checked)}
                      className="rounded border-[#E8DFC8] text-[#9C5B16] focus:ring-[#9C5B16]"
                    />
                  </label>
                  {useHoneyPoints && (
                    <div className="text-[11px] text-[#9C5B16] font-medium mt-1">
                      Applied ${honeyDiscount.toFixed(2)} point credit!
                    </div>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-[#E8DFC8] space-y-1.5 text-xs text-[#5C4F44]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#2C241E]">${cartTotal.toFixed(2)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#366B40] font-medium">
                    <span>Discount Savings</span>
                    <span className="tabular-nums">-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="tabular-nums font-medium text-[#2C241E]">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Sales Tax (ME 5.5%)</span>
                  <span className="tabular-nums font-medium text-[#2C241E]">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-[#E8DFC8] flex justify-between items-baseline text-base font-bold text-[#2C241E]">
                  <span>Total Amount</span>
                  <span className="text-xl tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Adoption CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Securing &amp; Authorizing...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Launch Order Tracking</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#7A6C5F] text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#366B40]" />
                  <span>30-Day Money Back Snuggle Guarantee</span>
                </div>
                <div>Your order enters artisan handcraft queue immediately upon completion.</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
