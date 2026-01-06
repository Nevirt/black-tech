'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Paper, Link } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';

export default function SupportPage() {
  const { t, company } = useI18n();
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
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{t('support.contactTitle')}</Typography>
                <Typography>{t('support.email')}: <Link href={`mailto:${company.contact.email}`}>{company.contact.email}</Link></Typography>
                <Typography>{t('support.phone')}: <Link href={`tel:${company.contact.phone}`}>{company.contact.phone}</Link></Typography>
                <Typography>{t('support.location')}: {company.contact.address}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{t('support.faqTitle')}</Typography>
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


