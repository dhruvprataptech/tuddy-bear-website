import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  Package,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Layers,
  ArrowUpDown,
  Search,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    adjustStock,
    deleteProduct,
    updateOrderStage,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    category: 'Heirloom Bears' as Product['category'],
    price: 120,
    compareAtPrice: 145,
    stockCount: 10,
    lowStockThreshold: 4,
    inStock: true,
    badge: 'Artisan Batch',
    description: '',
    story: '',
    dimensions: '14" Tall (35 cm)',
    weight: '1.2 lbs (540 g)',
    materialsText: 'Mohair, Pure Wool, Brass Joints',
    careInstructions: 'Spot clean with wool sponge.',
    imageUrl: '/src/assets/images/bear_classic_heritage_1794059744878.jpg',
    customizable: true,
  });

  // KPI calculations
  const totalSKUs = products.length;
  const lowStockProducts = products.filter(p => p.stockCount <= p.lowStockThreshold);
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.stockCount, 0);
  const totalRevenue = orders.reduce((acc, o) => acc + o.payment.total, 0);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      subtitle: '',
      category: 'Heirloom Bears',
      price: 135,
      compareAtPrice: 160,
      stockCount: 8,
      lowStockThreshold: 3,
      inStock: true,
      badge: 'New Release',
      description: 'Handcrafted heirloom plush tailored from organic wool and brass joint discs.',
      story: 'Stitched with love in our Maine workshop.',
      dimensions: '15" Tall (38 cm)',
      weight: '1.3 lbs',
      materialsText: 'German Mohair, Alpaca Wool, Glass Eyes',
      careInstructions: 'Gentle spot cleaning only.',
      imageUrl: '/src/assets/images/bear_classic_heritage_1794059744878.jpg',
      customizable: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      subtitle: product.subtitle,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice || product.price * 1.15,
      stockCount: product.stockCount,
      lowStockThreshold: product.lowStockThreshold,
      inStock: product.inStock,
      badge: product.badge || '',
      description: product.description,
      story: product.story,
      dimensions: product.dimensions,
      weight: product.weight,
      materialsText: product.materials.join(', '),
      careInstructions: product.careInstructions,
      imageUrl: product.imageUrl,
      customizable: product.customizable,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const materialsArray = formData.materialsText
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formData.name,
        subtitle: formData.subtitle,
        category: formData.category,
        price: Number(formData.price),
        compareAtPrice: Number(formData.compareAtPrice),
        stockCount: Number(formData.stockCount),
        lowStockThreshold: Number(formData.lowStockThreshold),
        inStock: Number(formData.stockCount) > 0,
        badge: formData.badge || undefined,
        description: formData.description,
        story: formData.story,
        dimensions: formData.dimensions,
        weight: formData.weight,
        materials: materialsArray,
        careInstructions: formData.careInstructions,
        imageUrl: formData.imageUrl,
        customizable: formData.customizable,
      });
    } else {
      addProduct({
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: formData.name,
        subtitle: formData.subtitle,
        category: formData.category,
        price: Number(formData.price),
        compareAtPrice: Number(formData.compareAtPrice),
        stockCount: Number(formData.stockCount),
        lowStockThreshold: Number(formData.lowStockThreshold),
        inStock: Number(formData.stockCount) > 0,
        badge: formData.badge || undefined,
        description: formData.description,
        story: formData.story,
        dimensions: formData.dimensions,
        weight: formData.weight,
        materials: materialsArray,
        careInstructions: formData.careInstructions,
        imageUrl: formData.imageUrl,
        customizable: formData.customizable,
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#9C5B16]">
            Atelier Backoffice
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] mt-0.5">
            Inventory &amp; Operations Management
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6C5F]">
            Real-time catalog stock control, fulfillment tracking, and low-inventory alerts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2C241E] hover:bg-[#3D332B] rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Listing</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center justify-between text-[#7A6C5F] text-xs">
            <span>Total Catalog SKUs</span>
            <Layers className="w-4 h-4 text-[#9C5B16]" />
          </div>
          <div className="text-2xl font-bold text-[#2C241E] tabular-nums mt-2">
            {totalSKUs}
          </div>
          <div className="text-[11px] text-[#366B40] mt-1 font-medium">All categories active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center justify-between text-[#7A6C5F] text-xs">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
          </div>
          <div className="text-2xl font-bold text-[#B91C1C] tabular-nums mt-2">
            {lowStockProducts.length}
          </div>
          <div className="text-[11px] text-[#7A6C5F] mt-1">
            {lowStockProducts.length > 0 ? 'Restock recommended' : 'Healthy inventory level'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center justify-between text-[#7A6C5F] text-xs">
            <span>Inventory Value</span>
            <DollarSign className="w-4 h-4 text-[#9C5B16]" />
          </div>
          <div className="text-2xl font-bold text-[#2C241E] tabular-nums mt-2">
            ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-[#7A6C5F] mt-1">Based on retail pricing</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center justify-between text-[#7A6C5F] text-xs">
            <span>Total Sales Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#366B40]" />
          </div>
          <div className="text-2xl font-bold text-[#366B40] tabular-nums mt-2">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#7A6C5F] mt-1">{orders.length} orders recorded</div>
        </div>
      </div>

      {/* Tabs: Inventory Table vs Orders Fulfillment */}
      <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-3 mb-6">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Product Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#2C241E] text-white shadow-xs'
              : 'text-[#5C4F44] hover:bg-[#F2ECE4]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Fulfillment &amp; Orders ({orders.length})</span>
        </button>
      </div>

      {/* View 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
          {/* Table Filters */}
          <div className="p-4 border-b border-[#E8DFC8] flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#FAF8F5]">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6C5F]" />
              <input
                type="text"
                placeholder="Search products or category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-[#E8DFC8] rounded-md focus:outline-none focus:border-[#9C5B16]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5C4F44]">
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="bg-white border border-[#E8DFC8] rounded-md px-2 py-1 text-xs focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Heirloom Bears">Heirloom Bears</option>
                <option value="Polar & Arctic">Polar &amp; Arctic</option>
                <option value="Giant Plush">Giant Plush</option>
                <option value="Accessories & Care">Accessories &amp; Care</option>
                <option value="Limited Editions">Limited Editions</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#5C4F44] border-b border-[#E8DFC8] uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock Units</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF8F5]">
                {filteredProducts.map(product => {
                  const isLow = product.stockCount <= product.lowStockThreshold;

                  return (
                    <tr key={product.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-[#F4EFEA] border border-[#E8DFC8]/60 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-[#2C241E] truncate">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-[#7A6C5F] truncate max-w-xs">
                              {product.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 text-[#5C4F44]">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5 font-bold text-[#2C241E] tabular-nums">
                        ${product.price.toFixed(2)}
                      </td>

                      {/* Stock Adjustment Stepper */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#E8DFC8] rounded-md bg-[#FAF8F5]">
                            <button
                              onClick={() => adjustStock(product.id, -1)}
                              className="px-2 py-0.5 hover:bg-[#F2ECE4] text-[#5C4F44] cursor-pointer"
                              title="Decrease 1"
                            >
                              -
                            </button>
                            <span
                              className={`px-2 py-0.5 font-bold tabular-nums min-w-[2rem] text-center ${
                                isLow ? 'text-[#B91C1C]' : 'text-[#2C241E]'
                              }`}
                            >
                              {product.stockCount}
                            </span>
                            <button
                              onClick={() => adjustStock(product.id, 1)}
                              className="px-2 py-0.5 hover:bg-[#F2ECE4] text-[#5C4F44] cursor-pointer"
                              title="Increase 1"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => adjustStock(product.id, 5)}
                            className="px-2 py-0.5 bg-[#F2ECE4] hover:bg-[#EADBCC] rounded text-[10px] font-semibold text-[#7C4812] cursor-pointer"
                            title="Restock 5 units"
                          >
                            +5 Restock
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        {product.stockCount === 0 ? (
                          <span className="text-[#B91C1C] font-semibold">Out of Stock</span>
                        ) : isLow ? (
                          <span className="text-[#B91C1C] font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Low ({product.stockCount} left)
                          </span>
                        ) : (
                          <span className="text-[#366B40] font-medium">Optimal</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right space-x-1">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-[#5C4F44] hover:text-[#9C5B16] rounded transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete ${product.name} from catalog?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-[#A39688] hover:text-[#B91C1C] rounded transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Orders Fulfillment */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF8F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#2C241E]">Order #{order.id}</span>
                    <span className="text-xs text-[#7A6C5F]">· {order.customer.fullName} ({order.customer.email})</span>
                  </div>
                  <div className="text-xs text-[#7A6C5F] mt-0.5">
                    Destination: {order.customer.address}, {order.customer.city}, {order.customer.state}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-[#2C241E] tabular-nums">
                    ${order.payment.total.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-[#366B40] font-medium">
                    Paid via {order.payment.cardBrand}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-wrap gap-2 text-xs">
                {order.items.map((i, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E8DFC8] text-[#5C4F44]"
                  >
                    {i.quantity}x {i.product.name} {i.customEmbroidery && `(Paw: "${i.customEmbroidery}")`}
                  </span>
                ))}
              </div>

              {/* Fulfillment Stage Control */}
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-[#7A6C5F]">Current Stage: </span>
                  <strong className="text-[#9C5B16]">
                    {order.tracking.stages[order.tracking.currentStageIndex]?.title} (Stage {order.tracking.currentStageIndex + 1}/6)
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#7A6C5F]">Update stage:</span>
                  <select
                    value={order.tracking.currentStageIndex}
                    onChange={e => updateOrderStage(order.id, Number(e.target.value))}
                    className="bg-white border border-[#E8DFC8] rounded-md px-2 py-1 text-xs text-[#2C241E] focus:outline-none focus:border-[#9C5B16] cursor-pointer"
                  >
                    {order.tracking.stages.map((stage, sIdx) => (
                      <option key={sIdx} value={sIdx}>
                        {sIdx + 1}. {stage.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-6 max-h-[92vh] flex flex-col">
            <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]">
              <h3 className="text-base font-bold text-[#2C241E] font-display">
                {editingProduct ? 'Edit Bear Details' : 'Add New Handcrafted Creation'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#7A6C5F] hover:text-[#2C241E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                    placeholder="e.g. Hearthside Timber Grizzly"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Subtitle / Key Hook</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                    placeholder="e.g. Deep cedar-brown dense boucle plush with velvet collar"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  >
                    <option value="Heirloom Bears">Heirloom Bears</option>
                    <option value="Polar & Arctic">Polar &amp; Arctic</option>
                    <option value="Giant Plush">Giant Plush</option>
                    <option value="Accessories & Care">Accessories &amp; Care</option>
                    <option value="Limited Editions">Limited Editions</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                    placeholder="e.g. Limited Run, Artisan Favorite"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Compare At Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={e => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Inventory Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formData.stockCount}
                    onChange={e => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Low Stock Alert Threshold</label>
                  <input
                    type="number"
                    required
                    value={formData.lowStockThreshold}
                    onChange={e => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Image Asset</label>
                  <select
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  >
                    <option value="/src/assets/images/bear_classic_heritage_1794059744878.jpg">
                      Classic Golden Mohair Bear (Heritage)
                    </option>
                    <option value="/src/assets/images/bear_polar_artisan_1794059745389.jpg">
                      Snowy White Polar Bear with Muffler
                    </option>
                    <option value="/src/assets/images/bear_honey_accessories_1794059746441.jpg">
                      Artisan Cardigan, Comb &amp; Honey Jar
                    </option>
                    <option value="/src/assets/images/hero_bear_workshop_1794059743173.jpg">
                      Master Workshop Woodbench Scene
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Full Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Artisan Workshop Story</label>
                  <textarea
                    rows={2}
                    value={formData.story}
                    onChange={e => setFormData({ ...formData, story: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#5C4F44] mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#5C4F44] mb-1">Materials (comma separated)</label>
                  <input
                    type="text"
                    value={formData.materialsText}
                    onChange={e => setFormData({ ...formData, materialsText: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2C241E]">
                    <input
                      type="checkbox"
                      checked={formData.customizable}
                      onChange={e => setFormData({ ...formData, customizable: e.target.checked })}
                      className="rounded border-[#E8DFC8] text-[#9C5B16]"
                    />
                    <span>Allow Gold Paw Embroidery Customization</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFC8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#E8DFC8] text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2C241E] text-white hover:bg-[#3D332B] font-semibold cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
