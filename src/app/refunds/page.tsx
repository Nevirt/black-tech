'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';

export default function RefundsPage() {
  const { t } = useI18n();
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('refunds.title')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {t('refunds.subtitle')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - {t('refunds.point.cancellation')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - {t('refunds.point.eligible')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - {t('refunds.point.process')}
          </Typography>
          <Typography color="text.secondary">
            {t('refunds.contact')}
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}


