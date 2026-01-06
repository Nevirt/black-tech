'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useI18n } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function RefundsPage() {
  const { t } = useI18n();
  
  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
              {t('refunds.title')}
            </Typography>
            
            <GlassCard hoverEffect={false}>
              <Typography sx={{ mb: 4, opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6 }}>
                {t('refunds.subtitle')}
              </Typography>
              
              <List sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  t('refunds.point.cancellation'),
                  t('refunds.point.eligible'),
                  t('refunds.point.process')
                ].map((point, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32, color: 'white', opacity: 0.5 }}>
                      <CheckCircleOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={point} primaryTypographyProps={{ sx: { opacity: 0.8 } }} />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography sx={{ opacity: 0.7, fontStyle: 'italic' }}>
                  {t('refunds.contact')}
                </Typography>
              </Box>
            </GlassCard>
          </Container>
        </Box>
      </Layout>
    </Box>
  );
}
