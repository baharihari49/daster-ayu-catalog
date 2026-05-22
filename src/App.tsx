import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_PRODUCTS, Product, Tier, Model, Status } from './data';

function formatRupiah(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
}

type TabState = 'Semua' | Tier;

function BatikBackground() {
  return (
    <div className="fixed inset-0 opacity-5 pointer-events-none z-[-1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="batik" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="20" fill="none" stroke="#D4866B" strokeWidth="2" />
          <path d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50" stroke="#D4866B" strokeWidth="2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#batik)" />
      </svg>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabState>('Semua');
  const [activeModel, setActiveModel] = useState<Model | 'Semua'>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = DUMMY_PRODUCTS.filter(p => {
    const matchTier = activeTab === 'Semua' || p.tier === activeTab;
    const matchModel = activeModel === 'Semua' || p.model === activeModel;
    return matchTier && matchModel;
  });

  // Calculate some dummy stats using real data length
  const readyCount = DUMMY_PRODUCTS.filter(p => p.status === 'Ready').length;
  const soldCount = DUMMY_PRODUCTS.filter(p => p.status === 'Sold').length;

  return (
    <div className="min-h-screen pb-20 relative font-sans">
      <BatikBackground />
      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <Hero readyCount={readyCount} soldCount={soldCount} />
        
        <div className="sticky top-[56px] z-30 bg-brand-bg/90 backdrop-blur-md pb-4 pt-2 -mt-4 border-b border-brand-text/5">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <ModelFilters activeModel={activeModel} setActiveModel={setActiveModel} />
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => setSelectedProduct(product)} 
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>

        <Footer />

        <ProductDetailSheet 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm h-[56px] border-b border-brand-bg flex items-center justify-between px-4 max-w-7xl mx-auto w-full">
      <div className="font-serif font-bold text-lg text-primary tracking-tight">
        Daster Ayu
      </div>
      <a 
        href="https://wa.me/628123456789" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium bg-[#7FA77A] text-white p-2 rounded-full hover:bg-brand-sage/90 transition-colors shadow-sm"
      >
        <MessageCircle size={16} />
        <span className="hidden sm:inline pr-2">Hubungi Kami</span>
      </a>
    </header>
  );
}

function Hero({ readyCount, soldCount }: { readyCount: number, soldCount: number }) {
  return (
    <section className="bg-brand-bg px-4 py-6 text-center border-b border-brand-bg">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold leading-tight mb-2 text-brand-text">
          Stok daster ready<br/>hari ini
        </h2>
        <p className="text-xs opacity-60 mb-4 max-w-sm">
          Cek motif favoritmu, langsung order via WhatsApp
        </p>
        
        <div className="inline-flex items-center gap-4 py-2 px-4 bg-white rounded-full shadow-sm text-[10px] font-semibold uppercase tracking-wider">
          <span>🌸 {readyCount} MOTIF READY</span>
          <span className="opacity-20 text-[10px]">|</span>
          <span className="text-primary">{soldCount} SOLD WEEKLY</span>
        </div>
      </div>
    </section>
  );
}

function Tabs({ activeTab, setActiveTab }: { activeTab: TabState, setActiveTab: (t: TabState) => void }) {
  const tabs: TabState[] = ['Semua', 'Premium', 'Standard'];
  
  return (
    <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-1.5 text-xs rounded-full transition-all active:scale-95 whitespace-nowrap ${
            activeTab === tab 
              ? 'bg-primary text-white font-bold' 
              : 'border border-primary/20 text-brand-text/80 font-medium'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function ModelFilters({ activeModel, setActiveModel }: { activeModel: Model | 'Semua', setActiveModel: (m: Model | 'Semua') => void }) {
  const models: (Model | 'Semua')[] = ['Semua', 'Payung', 'Kimono', 'Kelelawar', 'Lengan Panjang'];
  
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {models.map(model => (
        <button
          key={model}
          onClick={() => setActiveModel(model)}
          className={`shrink-0 px-4 py-2 text-xs font-medium rounded-full transition-all active:scale-95 border ${
            activeModel === model
              ? 'border-brand-sage text-brand-sage bg-brand-sage/5'
              : 'border-brand-text/10 text-brand-text/60 bg-white/50 hover:bg-white'
          }`}
        >
          {model === 'Semua' ? 'Semua Model' : model}
        </button>
      ))}
    </div>
  );
}

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  const isSold = product.status === 'Sold';
  
  return (
    <motion.div 
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col gap-2 relative ${isSold ? 'opacity-60' : ''}`}
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EADCCB]">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSold ? 'grayscale' : ''}`}
        />
        
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg] z-10 pointer-events-none">
            <span className="border-2 border-brand-gray px-3 py-1 text-[10px] font-black uppercase text-brand-gray bg-white/50 backdrop-blur-sm">Habis</span>
          </div>
        )}

        <div className="absolute top-2 right-2 z-20">
          <Badge status={product.status} />
        </div>
      </div>
      
      <div className="flex flex-col gap-0.5">
        <p className="text-[11px] font-medium opacity-60">
          {product.tier} · {product.model}
        </p>
        <h3 className="text-sm font-bold text-brand-text leading-tight truncate">
          {product.name}
        </h3>
        <p className="text-xs font-bold text-primary mt-0.5">
          {formatRupiah(product.price)}
        </p>
      </div>
    </motion.div>
  );
};

function Badge({ status }: { status: Status }) {
  if (status === 'Ready') {
    return (
      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#7FA77A] text-white rounded-full shadow-sm w-fit">
        Ready
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#9C9690] text-white rounded-full shadow-sm w-fit">
      Sold
    </span>
  );
}

function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-brand-text/5 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">🌸</span>
      </div>
      <h3 className="text-brand-text font-bold text-lg mb-2">Belum ada motif</h3>
      <p className="text-brand-text/60 text-sm max-w-xs">
        Belum ada motif di kategori ini, cek lagi besok ya ✨
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-brand-text/5 text-center">
      <div className="font-bold text-lg text-primary tracking-tight mb-2">
        Daster Ayu
      </div>
      <p className="text-brand-text/60 text-sm mb-6">"Nyaman setiap hari, dari rumah ke rumah"</p>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        <a href="https://wa.me/628123456789" className="p-2 bg-brand-sage/10 text-brand-sage rounded-full hover:bg-brand-sage/20 transition-colors">
          <MessageCircle size={20} />
        </a>
      </div>
      
      <p className="text-brand-text/40 text-xs">© 2026 Daster Ayu. All rights reserved.</p>
    </footer>
  );
}

function ProductDetailSheet({ product, onClose }: { product: Product | null, onClose: () => void }) {
  if (!product) return null;

  const isSold = product.status === 'Sold';
  const whatsappMessage = `Halo kak, saya mau order Daster ${product.tier} - ${product.model} - Motif ${product.name}`;
  const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/40 backdrop-blur-sm sm:p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col relative shadow-[0_-20px_40px_rgba(0,0,0,0.1)]"
          onClick={e => e.stopPropagation()}
        >
          {/* Drag Handle (Mobile only) */}
          <div className="w-full flex justify-center pt-3 pb-2 sm:hidden absolute top-0 z-20">
            <div className="w-12 h-1.5 bg-brand-text/20 rounded-full" />
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/50 backdrop-blur-md text-brand-text rounded-full shadow-sm hover:bg-white active:scale-95 transition-all"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto flex-1 pb-24">
            {/* Header inside sheet */}
            <div className="h-14 flex items-center justify-center border-b border-[#FBF7F2] shrink-0 w-full mb-1">
               <span className="font-serif font-bold text-primary">Daster Ayu</span>
            </div>

            <div className="px-6 mb-4">
              <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden bg-[#EADCCB]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className={`w-full h-full object-cover ${isSold ? 'grayscale opacity-80' : ''}`}
                />
              </div>
            </div>
            
            <div className="px-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <span className="px-2 py-0.5 bg-[#7FA77A] text-white text-[10px] font-bold rounded-full mb-2 inline-block">
                    {product.tier} Edition
                  </span>
                  <h3 className="text-xl font-bold leading-tight">Daster {product.model} &mdash; {product.name}</h3>
                </div>
                <p className="text-lg font-bold text-primary shrink-0">
                  {formatRupiah(product.price)}
                </p>
              </div>

              <p className="text-xs text-brand-text/60 mt-1 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2">Pilih Ukuran:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, idx) => (
                    <div key={size} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs ${idx === 0 ? 'border-2 border-primary font-bold bg-white text-brand-text' : 'border border-brand-text/20 opacity-50 font-medium'}`}>
                      {size === 'All Size' ? 'All' : size}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#FBF7F2] bg-white">
            {isSold ? (
              <button disabled className="w-full py-4 rounded-full bg-brand-gray text-white font-bold text-sm shadow-lg flex justify-center items-center opacity-80">
                Ludes Terjual
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:bg-[#20BE5C] transition-colors active:scale-[0.98] flex justify-center items-center gap-2"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-.696 2.541 2.596-.681c.851.463 1.784.707 2.837.707 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.774-5.762-5.774zm3.377 8.272c-.14.393-.811.728-1.114.773-.279.041-.643.074-1.616-.324-1.24-.51-2.031-1.776-2.093-1.859-.062-.083-.51-.678-.51-1.293s.322-.918.437-1.042c.114-.124.25-.156.333-.156s.167 0 .24.005c.078.005.182-.031.286.224.104.255.354.865.385.927.031.062.052.135.01.219s-.062.156-.125.229c-.062.073-.131.161-.188.219-.057.057-.114.12-.047.234.068.114.301.498.647.806.446.396.822.52 1.042.614.22.094.349.078.479-.068.13-.146.557-.651.708-.875.151-.224.302-.187.51-.114s1.323.625 1.552.74c.229.115.38.172.437.266.058.094.058.542-.083.935z"></path></svg>
                Order via WhatsApp
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
