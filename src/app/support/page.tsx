'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Paper, Link } from '@mui/material';
import { COMPANY_CONFIG } from '@/config/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function SupportPage() {
  const { t } = useI18n();
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('support.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            {t('support.subtitle')}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Contacto</Typography>
                <Typography>Email: <Link href={`mailto:${COMPANY_CONFIG.contact.email}`}>{COMPANY_CONFIG.contact.email}</Link></Typography>
                <Typography>Teléfono: <Link href={`tel:${COMPANY_CONFIG.contact.phone}`}>{COMPANY_CONFIG.contact.phone}</Link></Typography>
                <Typography>Ubicación: {COMPANY_CONFIG.contact.address}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>FAQ</Typography>
                <Typography variant="subtitle1" fontWeight={600}>{t('support.faq.payments.q')}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>{t('support.faq.payments.a')}</Typography>
                <Typography variant="subtitle1" fontWeight={600}>{t('support.faq.cancel.q')}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>{t('support.faq.cancel.a')}</Typography>
                <Typography variant="subtitle1" fontWeight={600}>{t('support.faq.support.q')}</Typography>
                <Typography color="text.secondary">{t('support.faq.support.a')}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}


