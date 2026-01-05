'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Button } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('pricing.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {t('pricing.comingSoon')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {t('pricing.contact')}
          </Typography>
          <Button href="#contact" variant="contained" color="primary">
            {t('actions.contactNow')}
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}


