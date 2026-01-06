'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';
import IconRenderer from '@/components/ui/IconRenderer';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function AboutPage() {
  const { company } = useI18n();
  
  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, textAlign: 'center' }}>
              {company.about.title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.7, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
              {company.tagline}
            </Typography>
            <Typography variant="body1" sx={{ mb: 10, textAlign: 'center', maxWidth: '900px', mx: 'auto', lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.8 }}>
              {company.about.description}
            </Typography>

            <Grid container spacing={4}>
              {company.about.features.map((feature, idx) => (
                <Grid item xs={12} md={4} key={feature.title}>
                  <GlassCard delay={idx * 0.1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{ p: 1, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
                        <IconRenderer iconName={feature.icon} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>{feature.title}</Typography>
                    </Box>
                    <Typography sx={{ opacity: 0.7, lineHeight: 1.6 }}>{feature.description}</Typography>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Layout>
    </Box>
  );
}
