'use client';

import React, { useState } from 'react';
import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import IconRenderer from '../ui/IconRenderer';
import { useI18n } from '@/i18n/I18nProvider';
import UseCases from '../products/UseCases';
import DemoModal from '../products/DemoModal';
import GlassCard from '../ui/GlassCard';
import MinimalButton from '../ui/NeonButton';
import { ArrowRight, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

type ViewMode = 'products' | 'use-cases';

const Products = () => {
  const { t, products } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>('products');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const featuredProducts = products.filter(product => product.featured);
  const allProducts = products;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'available': return 'bg-white text-black border-white';
      case 'beta': return 'bg-transparent text-gray-300 border-gray-500';
      case 'coming-soon': return 'bg-transparent text-gray-500 border-gray-700 dashed border';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return t('products.status.available');
      case 'beta': return t('products.status.beta');
      case 'coming-soon': return t('products.status.coming-soon');
      default: return t('products.status.unknown');
    }
  };

  const handleShowUseCases = () => setViewMode('use-cases');
  const handleBackToProducts = () => setViewMode('products');
  const handleOpenDemo = () => setDemoModalOpen(true);
  const handleCloseDemo = () => setDemoModalOpen(false);

  return (
    <>
      <DemoModal open={demoModalOpen} onClose={handleCloseDemo} />

      {viewMode === 'use-cases' ? (
        <UseCases onBack={handleBackToProducts} onOpenDemo={handleOpenDemo} />
      ) : (
        <section id="products" className="relative z-10 py-24 md:py-32 bg-black text-white">
          <Container maxWidth="lg">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20 md:mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                {t('products.title')}
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                {t('products.subtitle')}
              </p>
            </motion.div>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <div className="mb-24">
                <h3 className="text-2xl font-bold text-white mb-10 border-l-4 border-white pl-6 uppercase tracking-wider">
                  {t('products.featured')}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {featuredProducts.map((product, index) => (
                    <div key={product.id} className="flex h-full">
                      <GlassCard className="w-full h-full flex flex-col border border-white/20 hover:border-white/60 transition-colors !bg-white/5 p-10" delay={index * 0.2}>

                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                            <span className="text-gray-400 text-sm font-mono uppercase tracking-wider">{product.category}</span>
                          </div>
                          <div className={clsx("px-4 py-1.5 rounded text-xs font-bold border self-start", getStatusStyle(product.status))}>
                            {getStatusText(product.status)}
                          </div>
                        </div>

                        <p className="text-gray-300 mb-10 leading-relaxed text-lg font-light">
                          {product.description}
                        </p>

                        <div className="mb-8 mt-auto">
                          <div className="space-y-4">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex gap-4 p-4 rounded bg-white/5">
                                <div className="mt-1 text-white">
                                  <IconRenderer iconName={feature.icon} fontSize="small" />
                                </div>
                                <div>
                                  <p className="text-white font-bold text-sm">{feature.title}</p>
                                  <p className="text-xs text-gray-400">{feature.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 flex gap-4 mt-4 border-t border-white/10">
                          <MinimalButton
                            variant="primary"
                            disabled={product.status !== 'available'}
                            onClick={product.id === 'ai-chatbot' ? handleShowUseCases : undefined}
                            className={clsx(product.status !== 'available' && "opacity-50 cursor-not-allowed", "flex-1")}
                          >
                            {product.status === 'available' ? (
                              <span className="flex items-center gap-2">{t('products.viewUseCases')} <ArrowRight className="w-4 h-4" /></span>
                            ) : t('products.status.coming-soon')}
                          </MinimalButton>

                          {product.status === 'available' && (
                            <MinimalButton variant="outline" onClick={product.id === 'ai-chatbot' ? handleOpenDemo : undefined} className="flex-1">
                              <span className="flex items-center gap-2">Demo <ExternalLink className="w-4 h-4" /></span>
                            </MinimalButton>
                          )}
                        </div>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Products Grid */}
            {allProducts.length > featuredProducts.length && (
              <>
                <div className="h-px bg-white/20 my-20" />

                <h3 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-wider">
                  {t('products.all')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {allProducts.map((product, index) => (
                    <div key={product.id} className="flex h-full">
                      <GlassCard className="w-full h-full flex flex-col !bg-white/5 p-8" delay={index * 0.1}>
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="text-xl font-bold text-white">{product.name}</h4>
                          <div className={clsx("px-2 py-0.5 rounded text-[10px] font-bold border uppercase self-start", getStatusStyle(product.status))}>
                            {getStatusText(product.status)}
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed">
                          {product.shortDescription}
                        </p>

                        <MinimalButton
                          variant={product.featured ? 'primary' : 'outline'}
                          className="w-full text-sm py-3 mt-auto"
                          disabled={product.status !== 'available'}
                          onClick={product.id === 'ai-chatbot' ? handleShowUseCases : undefined}
                        >
                          {product.status === 'available' ? t('actions.viewMore') : t('products.status.coming-soon')}
                        </MinimalButton>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default Products;