import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Package,
  Sparkles,
  PhoneCall,
  Navigation,
  Play,
  Scissors,
  Check,
} from 'lucide-react';

export const OrderTracker: React.FC = () => {
  const {
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    updateOrderStage,
    simulateOrderProgression,
    isSimulatingTracker,
    showToast,
  } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [deliveryNoteInput, setDeliveryNoteInput] = useState('');

  const currentOrder =
    orders.find(o => o.id === activeTrackingOrderId) ||
    orders[0] ||
    null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = orders.find(
      o => o.id.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );
    if (found) {
      setActiveTrackingOrderId(found.id);
      showToast(`Loaded tracking telemetry for #${found.id}`, 'success');
      setSearchInput('');
    } else {
      showToast('No matching order or tracking number found. Try demo URS-849201', 'warning');
    }
  };

  const handleUpdateNotes = () => {
    if (!deliveryNoteInput.trim()) return;
    showToast('Delivery courier instructions transmitted to driver dispatch!', 'success');
    setDeliveryNoteInput('');
  };

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-display font-semibold text-[#2C241E]">No Orders Available</h2>
        <p className="text-xs text-[#7A6C5F] mt-1">Adopt a bear to activate live real-time GPS tracking.</p>
      </div>
    );
  }

  const { tracking } = currentOrder;
  const currentStage = tracking.stages[tracking.currentStageIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#9C5B16]">
            Real-Time Logistics Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] mt-0.5">
            Artisan Order &amp; Courier Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6C5F]">
            Direct satellite dispatch telemetry from the Maine workshop to your doorstep.
          </p>
        </div>

        {/* Tracking Lookup Input */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-96">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6C5F]" />
            <input
              type="text"
              placeholder="Search Order ID (e.g. URS-849201)..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Track
          </button>
        </form>
      </div>

      {/* Quick demo switcher pills */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 text-xs">
        <span className="text-[#7A6C5F] shrink-0 font-medium">Quick switch active order:</span>
        {orders.map(o => (
          <button
            key={o.id}
            onClick={() => setActiveTrackingOrderId(o.id)}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              currentOrder.id === o.id
                ? 'bg-[#2C241E] text-white font-semibold'
                : 'bg-[#F2ECE4] text-[#5C4F44] hover:bg-[#EADBCC]'
            }`}
          >
            {o.id} ({o.items[0]?.product.name})
          </button>
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real-Time Map & Telemetry HUD */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulated Interactive GPS Map Frame */}
          <div className="relative bg-[#EDE6DC] rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-sm">
            {/* Map Canvas Simulation */}
            <div className="relative h-72 sm:h-84 w-full bg-[#EFE9DF] overflow-hidden">
              {/* SVG Styled Map Vectors: roads, green belts, river */}
              <svg className="w-full h-full object-cover opacity-80" viewBox="0 0 600 350">
                {/* Background Land */}
                <rect width="600" height="350" fill="#E8E2D5" />

                {/* Ocean / Bay */}
                <path
                  d="M 450,0 Q 420,100 480,200 T 440,350 L 600,350 L 600,0 Z"
                  fill="#CFDEE8"
                />

                {/* Park greenery */}
                <path
                  d="M 50,40 Q 120,60 140,120 T 60,180 Z"
                  fill="#D8E2D1"
                />
                <path
                  d="M 280,220 Q 340,230 360,290 T 260,330 Z"
                  fill="#D8E2D1"
                />

                {/* Grid Street Lines */}
                <g stroke="#D4CCBC" strokeWidth="2" strokeDasharray="none">
                  <line x1="0" y1="80" x2="450" y2="80" />
                  <line x1="0" y1="160" x2="480" y2="160" />
                  <line x1="0" y1="240" x2="440" y2="240" />
                  <line x1="120" y1="0" x2="120" y2="350" />
                  <line x1="220" y1="0" x2="220" y2="350" />
                  <line x1="340" y1="0" x2="340" y2="350" />
                </g>

                {/* Primary Route Highway Arterial */}
                <path
                  d="M 60,280 C 140,240 220,200 280,140 S 380,100 420,110"
                  fill="none"
                  stroke="#FAF8F5"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 60,280 C 140,240 220,200 280,140 S 380,100 420,110"
                  fill="none"
                  stroke="#9C5B16"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />

                {/* Origin Atelier Pin */}
                <circle cx="60" cy="280" r="8" fill="#2C241E" />
                <circle cx="60" cy="280" r="3" fill="#FFFFFF" />
                <text x="50" y="305" fontSize="10" fontWeight="bold" fill="#2C241E">
                  Maine Atelier
                </text>

                {/* Destination Customer Pin */}
                <circle cx="420" cy="110" r="10" fill="#B91C1C" />
                <circle cx="420" cy="110" r="4" fill="#FFFFFF" />
                <text x="390" y="90" fontSize="11" fontWeight="bold" fill="#2C241E">
                  Your Home
                </text>

                {/* Moving Courier Bear Van Icon based on stage */}
                {tracking.currentStageIndex >= 3 && tracking.currentStageIndex < 5 && (
                  <g
                    transform={`translate(${
                      tracking.currentStageIndex === 3 ? 180 : 330
                    }, ${
                      tracking.currentStageIndex === 3 ? 200 : 125
                    })`}
                    className="transition-transform duration-1000"
                  >
                    <circle cx="0" cy="0" r="18" fill="#2C241E" />
                    <circle cx="0" cy="0" r="23" fill="#9C5B16" opacity="0.3" className="animate-ping" />
                    <text x="-9" y="5" fontSize="14" fill="#FFFFFF">
                      🧸
                    </text>
                  </g>
                )}

                {tracking.currentStageIndex === 5 && (
                  <g transform="translate(420, 110)">
                    <circle cx="0" cy="0" r="16" fill="#366B40" />
                    <text x="-7" y="5" fontSize="12" fill="#FFFFFF">
                      ✓
                    </text>
                  </g>
                )}
              </svg>

              {/* Map Floating HUD Overlay */}
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E8DFC8] shadow-xs text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#2C241E]">
                  <Navigation className="w-3.5 h-3.5 text-[#9C5B16]" />
                  <span>{tracking.carrier}</span>
                </div>
                <div className="text-[11px] text-[#7A6C5F]">
                  Vehicle: {tracking.courier.vehicle}
                </div>
              </div>

              {/* ETA Badge */}
              <div className="absolute top-3 right-3 bg-[#2C241E] text-white px-3.5 py-2 rounded-xl shadow-md text-xs text-right">
                <div className="text-[10px] text-[#C4B7A5] uppercase tracking-wider">Estimated Arrival</div>
                <div className="font-bold text-sm tabular-nums">
                  {tracking.currentStageIndex === 5 ? 'Delivered' : tracking.estimatedDelivery}
                </div>
              </div>

              {/* Driver note strip */}
              <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E8DFC8] shadow-xs flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#F4EFEA] border border-[#E8DFC8] flex items-center justify-center font-bold text-sm shrink-0">
                    👨‍✈️
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#2C241E] truncate">{tracking.courier.name}</div>
                    <div className="text-[11px] text-[#7A6C5F] truncate">{tracking.courier.statusNote}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase text-[#7A6C5F] block">Live Telemetry</span>
                  <span className="font-bold text-[#2C241E] tabular-nums">
                    {tracking.courier.currentDistanceMiles > 0
                      ? `${tracking.courier.currentDistanceMiles} mi away`
                      : 'Arrived'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#E8DFC8]">
              <span className="text-[#7A6C5F] block">Transit Speed</span>
              <span className="text-sm font-bold text-[#2C241E] tabular-nums">
                {tracking.currentStageIndex === 5 ? '0 mph' : `${tracking.courier.speedMph} mph`}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8DFC8]">
              <span className="text-[#7A6C5F] block">Cargo Climate</span>
              <span className="text-sm font-bold text-[#366B40] tabular-nums">68°F (Gentle)</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8DFC8]">
              <span className="text-[#7A6C5F] block">Tracking Code</span>
              <span className="text-xs font-bold text-[#2C241E] font-mono truncate block">
                {currentOrder.trackingNumber}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8DFC8]">
              <span className="text-[#7A6C5F] block">Order State</span>
              <span className="text-xs font-bold text-[#9C5B16]">
                {tracking.currentStageIndex === 5 ? 'Delivered' : `Stage ${tracking.currentStageIndex + 1} of 6`}
              </span>
            </div>
          </div>

          {/* Real-time Simulator Action Strip */}
          <div className="p-4 bg-[#F2ECE4] rounded-xl border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#2C241E]">Interactive Dispatch Simulator</div>
              <div className="text-[11px] text-[#7A6C5F]">
                Test real-time webhook transitions through crafting, packaging, courier dispatch, and delivery.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => simulateOrderProgression(currentOrder.id)}
                disabled={isSimulatingTracker || tracking.currentStageIndex >= 5}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#9C5B16] hover:bg-[#7C4812] rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulatingTracker ? 'Simulating Live...' : 'Simulate Progression'}</span>
              </button>

              <button
                onClick={() => updateOrderStage(currentOrder.id, (tracking.currentStageIndex + 1) % 6)}
                className="px-3 py-2 text-xs font-semibold text-[#2C241E] bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg transition-colors cursor-pointer"
              >
                Next Stage
              </button>
            </div>
          </div>

          {/* Delivery Instructions Update */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
            <label className="text-xs font-semibold text-[#2C241E] block">
              Driver Instructions for Barnaby
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={currentOrder.customer.deliveryNotes || 'e.g. Leave under front porch table...'}
                value={deliveryNoteInput}
                onChange={e => setDeliveryNoteInput(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
              />
              <button
                onClick={handleUpdateNotes}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg transition-colors cursor-pointer"
              >
                Transmit
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 6-Stage Timeline & Order Items */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Details Header Card */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8DFC8] shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-semibold text-[#9C5B16] uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="text-lg font-bold text-[#2C241E] font-display">
                  Order #{currentOrder.id}
                </h3>
                <div className="text-xs text-[#7A6C5F]">Placed {currentOrder.date}</div>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#F4EFEA] text-[#9C5B16] border border-[#E8DFC8]">
                {currentOrder.payment.cardBrand}
              </span>
            </div>

            <div className="text-xs text-[#5C4F44] pt-2 border-t border-[#FAF8F5] space-y-1">
              <div><strong>Recipient:</strong> {currentOrder.customer.fullName}</div>
              <div><strong>Destination:</strong> {currentOrder.customer.address}, {currentOrder.customer.city}, {currentOrder.customer.state}</div>
              <div><strong>Method:</strong> {currentOrder.shippingMethod.name}</div>
            </div>
          </div>

          {/* 6-Stage Timeline */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8DFC8] shadow-xs space-y-5">
            <h4 className="text-sm font-semibold text-[#2C241E] font-display">
              Fulfillment &amp; Courier Milestones
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFC8]">
              {tracking.stages.map((stage, idx) => {
                const isPassed = idx < tracking.currentStageIndex;
                const isCurrent = idx === tracking.currentStageIndex;

                return (
                  <div key={idx} className="relative group">
                    {/* Circle icon on timeline */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                        isPassed
                          ? 'bg-[#366B40] text-white border-[#366B40]'
                          : isCurrent
                          ? 'bg-[#9C5B16] text-white border-[#9C5B16] ring-4 ring-[#9C5B16]/20'
                          : 'bg-[#FAF8F5] text-[#A39688] border-[#D8CEBE]'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? 'text-[#9C5B16]'
                              : isPassed
                              ? 'text-[#2C241E]'
                              : 'text-[#A39688]'
                          }`}
                        >
                          {stage.title}
                        </span>
                        <span className="text-[11px] text-[#A39688] tabular-nums whitespace-nowrap">
                          {stage.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C4F44] mt-0.5 leading-relaxed">
                        {stage.description}
                      </p>

                      <div className="text-[11px] text-[#7A6C5F] mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A39688]" />
                        <span>{stage.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Contents */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8DFC8] shadow-xs space-y-3">
            <h4 className="text-sm font-semibold text-[#2C241E] font-display">
              Bears Inside This Shipment ({currentOrder.items.length})
            </h4>

            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center text-xs">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#F4EFEA] border border-[#E8DFC8]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#2C241E] truncate">{item.product.name}</div>
                    <div className="text-[11px] text-[#7A6C5F]">Qty: {item.quantity} · ${item.product.price}</div>
                    {item.customEmbroidery && (
                      <div className="text-[11px] text-[#9C5B16]">Paw: "{item.customEmbroidery}"</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#FAF8F5] flex justify-between text-xs font-semibold text-[#2C241E]">
              <span>Total Paid</span>
              <span className="tabular-nums text-sm font-bold">${currentOrder.payment.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
