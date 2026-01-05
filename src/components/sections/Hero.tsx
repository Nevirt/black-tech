'use client';

import { Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { useScrollTo } from '@/hooks/useScrollTo';
import MinimalButton from '../ui/NeonButton';

const Hero = () => {
  const { scrollToSection } = useScrollTo();
  const { t, company } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20"
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col items-center text-center">

          {/* Main Title - Clean Minimalist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-white">
              INZAIQ LLC
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-1 bg-white mb-10"
          />

          {/* Subtitle / Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                color: 'grey.400',
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              {company.heroDescription.split('\n\n')[0]}
            </Typography>
          </motion.div>

          {/* Usage Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <MinimalButton onClick={() => scrollToSection('#products')} variant="primary">
              {t('actions.exploreProducts')} <ArrowRight className="w-5 h-5 ml-1" />
            </MinimalButton>

            <MinimalButton onClick={() => scrollToSection('#contact')} variant="outline">
              {t('actions.contactUs')}
            </MinimalButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/30" />
          </motion.div>
        </motion.div>

      </Container>
    </section>
  );
};

export default Hero;