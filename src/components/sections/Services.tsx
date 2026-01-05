'use client';

import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import IconRenderer from '@/components/ui/IconRenderer';
import { useI18n } from '@/i18n/I18nProvider';
import { useScrollTo } from '@/hooks/useScrollTo';
import GlassCard from '../ui/GlassCard';
import MinimalButton from '../ui/NeonButton';

const Services = () => {
  const { scrollToSection } = useScrollTo();
  const { t, company } = useI18n();

  return (
    <section id="services" className="relative z-10 py-24 md:py-32 bg-black text-white">
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
            {t('services.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid - CSS Grid for Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {company.services.map((service, index) => (
            <div key={service.title} className="flex h-full">
              <GlassCard className="w-full h-full flex flex-col items-center text-center !bg-white/5 !border-white/10 p-10" delay={index * 0.1}>
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8 text-white bg-transparent border border-white/20">
                  <IconRenderer iconName={service.icon} fontSize="large" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-base flex-grow">
                  {service.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative rounded-2xl bg-white/5 p-12 md:p-20 text-center border border-white/10">

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {t('services.ctaTitle')}
              </h3>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                {t('services.ctaSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <MinimalButton variant="primary" onClick={() => scrollToSection('#contact')}>
                  {t('actions.contactNow')}
                </MinimalButton>
                <MinimalButton variant="outline" onClick={() => scrollToSection('#products')}>
                  {t('actions.viewProducts')}
                </MinimalButton>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;