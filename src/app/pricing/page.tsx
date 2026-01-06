'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';
import MinimalButton from '@/components/ui/NeonButton';

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <GlassCard className="text-center py-12">
              <Typography variant="h2" sx={{ mb: 3, fontWeight: 800 }}>
                {t('pricing.title')}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                {t('pricing.comingSoon')}
              </Typography>
              <Typography sx={{ mb: 6, opacity: 0.6, fontSize: '1.1rem' }}>
                {t('pricing.contact')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MinimalButton href="/support" variant="primary">
                  {t('actions.contactNow')}
                </MinimalButton>
              </Box>
            </GlassCard>
          </Container>
        </Box>
      </Layout>
    </Box>
  );
}
