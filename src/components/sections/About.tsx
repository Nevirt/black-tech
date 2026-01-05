'use client';

import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import IconRenderer from '@/components/ui/IconRenderer';
import { useI18n } from '@/i18n/I18nProvider';
import GlassCard from '@/components/ui/GlassCard';

const About = () => {
  const { company, t } = useI18n();
  return (
    <section id="about" className="relative z-10 py-24 md:py-32 bg-black text-white">
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {company.about.title}
            </h2>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">
              {company.about.description}
            </p>
          </div>
        </motion.div>

        {/* Features Grid - CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {company.about.features.map((feature, index) => (
            <div key={feature.title} className="flex h-full">
              <GlassCard className="w-full h-full text-center items-center !bg-white/5 !border-white/10 p-10" delay={index * 0.2}>
                <div className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center mb-6 text-white border border-white/20">
                  <IconRenderer iconName={feature.icon} fontSize="large" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-base">
                  {feature.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32"
        >
          <div className="glass-panel p-12 md:p-20 rounded-2xl text-center border-t border-white/10 bg-white/5">
            <h4 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              {t('about.visionTitle')}
            </h4>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              {company.heroDescription.split('\n\n')[2]}
            </p>

            <p className="text-2xl font-medium text-white tracking-wide border-b border-white inline-block pb-1">
              {company.heroDescription.split('\n\n')[3]}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;